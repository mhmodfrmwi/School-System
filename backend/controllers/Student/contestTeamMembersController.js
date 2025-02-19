const contestValidationSchema = require("../../validations/contestValidation");
const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const teamValidationSchema = require("../../validations/contestTeamValidationSchema");
const Contest = require("../../DB/contestModel");
const Student = require("../../DB/student");
const Semester = require("../../DB/semesterModel");
const ContestTeam = require("../../DB/contestTeamModel");

const createTeam = expressAsyncHandler(async (req, res) => {
    const { teamName, teammates } = req.body;
    const { contestId } = req.params;
    const studentId = req.user.id;

    const { error } = teamValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({
        status: 404,
        message: "Contest not found.",
      });
    }
  
    const existingTeamWithLoggedInStudent = await ContestTeam.findOne({
      contestId,
      teamMembers: studentId,
    });
  
    if (existingTeamWithLoggedInStudent) {
      return res.status(400).json({
        status: 400,
        message: "You are already part of another team for this contest.",
      });
    }

    const existingTeamWithName = await ContestTeam.findOne({ teamName, contestId });
    if (existingTeamWithName) {
      return res.status(400).json({
        status: 400,
        message: "Team name already exists for this contest. Please choose a different name.",
      });
    }

    const teamMembers = [studentId];
    for (const teammate of teammates) {
      const { fullName, academic_number } = teammate;

      const teammateStudent = await Student.findOne({ fullName, academic_number });
      if (!teammateStudent) {
        return res.status(404).json({
          status: 404,
          message: `Teammate with name ${fullName} and academic number ${academic_number} not found.`,
        });
      }
  
      const existingTeamWithTeammate = await ContestTeam.findOne({
        contestId,
        teamMembers: teammateStudent._id,
      });
  
      if (existingTeamWithTeammate) {
        return res.status(400).json({
          status: 400,
          message: `Teammate ${fullName} (${academic_number}) is already part of another team for this contest.`,
        });
      }

      teamMembers.push(teammateStudent._id);
    }

    const totalTeamMembers = teamMembers.length;
    if (totalTeamMembers > contest.numberOfTeamMembers) {
      return res.status(400).json({
        status: 400,
        message: `The team cannot have more than ${contest.numberOfTeamMembers} members. You are trying to add ${totalTeamMembers} members.`,
      });
    }

    const team = new ContestTeam({
      teamName,
      contestId,
      teamMembers,
      leaderId: studentId,
    });
  
    await team.save();
  
    res.status(201).json({
      status: 201,
      message: "Team created successfully.",
      team,
    });
  });


  /*const addTeamMember = expressAsyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const { fullName, academic_number } = req.body;
    const studentId = req.user.id;
  
    if (!teamId || !fullName || !academic_number) {
      return res.status(400).json({
        status: 400,
        message: "Team ID, full name, and academic number are required.",
      });
    }
  
    // Check if the team exists
    const team = await ContestTeam.findById(teamId).populate("contestId");
    if (!team) {
      return res.status(404).json({
        status: 404,
        message: "Team not found.",
      });
    }
  
    // Check if the logged-in student is the team leader
    if (team.leaderId.toString() !== studentId.toString()) {
      return res.status(403).json({
        status: 403,
        message: "Only the team leader can add teammates.",
      });
    }
  
    // Find the teammate by fullName and academic_number
    const teammateStudent = await Student.findOne({ fullName, academic_number });
    if (!teammateStudent) {
      return res.status(404).json({
        status: 404,
        message: `Teammate with name ${fullName} and academic number ${academic_number} not found.`,
      });
    }
  
    // Check if the teammate is already part of another team for this contest
    const existingTeamWithTeammate = await ContestTeam.findOne({
      contestId: team.contestId._id,
      teamMembers: teammateStudent._id,
    });
  
    if (existingTeamWithTeammate) {
      return res.status(400).json({
        status: 400,
        message: `Teammate ${fullName} (${academic_number}) is already part of another team for this contest.`,
      });
    }
  
    // Check if adding this teammate would exceed the team size limit
    if (team.teamMembers.length >= team.contestId.numberOfTeamMembers) {
      return res.status(400).json({
        status: 400,
        message: `The team cannot have more than ${team.contestId.numberOfTeamMembers} members.`,
      });
    }
  
    // Add the teammate to the team
    team.teamMembers.push(teammateStudent._id);
    await team.save();
  
    res.status(200).json({
      status: 200,
      message: "Team member added successfully.",
      team,
    });
  });*/

module.exports = {
    createTeam,
   // addTeamMember,
};