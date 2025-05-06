const contestValidationSchema = require("../../validations/contestValidation");
const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const addRewardClaimAndUpdatePoints = require("../../utils/updatingRewards");
const moment = require("moment");
const teamValidationSchema = require("../../validations/contestTeamValidationSchema");
const Contest = require("../../DB/contestModel");
const Student = require("../../DB/StudentModel");
const Semester = require("../../DB/semesterModel");
const ContestTeam = require("../../DB/contestTeamModel");

const getStudentsInSameClassAndGrade = expressAsyncHandler(async (req, res) => {
  try {
    const studentId = req.user.id;

    const loggedInStudent = await Student.findById(studentId);
    if (!loggedInStudent) {
      return res.status(404).json({
        status: 404,
        message: "Logged-in student not found.",
      });
    }

    const students = await Student.find({
      classId: loggedInStudent.classId,
      gradeId: loggedInStudent.gradeId,
      academicYear_id: loggedInStudent.academicYear_id,
      _id: { $ne: studentId },
    })
      .select("fullName academic_number")
      .lean();

    res.status(200).json({
      status: 200,
      message:
        "Students in the same class, grade, academic year, and semester retrieved successfully.",
      data: students,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const createTeam = expressAsyncHandler(async (req, res) => {
  try {
    const { teamName, teammates } = req.body;
    const { contestId } = req.params;
    const studentId = req.user.id;

    const { error } = teamValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
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

    const existingTeamWithName = await ContestTeam.findOne({
      teamName,
      contestId,
    });
    if (existingTeamWithName) {
      return res.status(400).json({
        status: 400,
        message:
          "Team name already exists for this contest. Please choose a different name.",
      });
    }

    const teamMembers = [studentId];
    for (const teammate of teammates) {
      const { fullName, academic_number } = teammate;

      const teammateStudent = await Student.findOne({
        fullName,
        academic_number,
      });
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
    for (const teammate of teamMembers) {
      await addRewardClaimAndUpdatePoints(teammate, "Student", "Contest");
    }

    res.status(201).json({
      status: 201,
      message: "Team created successfully.",
      team,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const getTeamsForStudentInContest = expressAsyncHandler(async (req, res) => {
  try {
    const { contestId } = req.params;
    const studentId = req.user.id;

    if (!validateObjectId(contestId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid contest ID.",
      });
    }

    const teams = await ContestTeam.find({
      contestId,
      teamMembers: studentId,
    })
      .populate("contestId", "title")
      .populate("teamMembers", "fullName academic_number")
      .populate("leaderId", "fullName academic_number")
      .lean();

    if (teams.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "You haven't join a team yet.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Teams retrieved successfully.",
      data: teams,
    });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});
const editTeam = expressAsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const { teamName, teammates } = req.body;
  const studentId = req.user.id;

  const { error } = teamValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: 400, message: error.details[0].message });
  }

  const team = await ContestTeam.findById(teamId).populate("contestId");
  if (!team) {
    return res.status(404).json({
      status: 404,
      message: "Team not found.",
    });
  }

  if (team.leaderId.toString() !== studentId.toString()) {
    return res.status(403).json({
      status: 403,
      message: "Only the team leader can edit the team.",
    });
  }

  if (teamName && teamName !== team.teamName) {
    const existingTeamWithName = await ContestTeam.findOne({
      teamName,
      contestId: team.contestId._id,
    });
    if (existingTeamWithName) {
      return res.status(400).json({
        status: 400,
        message:
          "Team name already exists for this contest. Please choose a different name.",
      });
    }
  }

  if (teammates && Array.isArray(teammates)) {
    const teamMembers = [studentId];

    for (const teammate of teammates) {
      const { fullName, academic_number } = teammate;

      const teammateStudent = await Student.findOne({
        fullName,
        academic_number,
      });
      if (!teammateStudent) {
        return res.status(404).json({
          status: 404,
          message: `Teammate with name ${fullName} and academic number ${academic_number} not found.`,
        });
      }

      const existingTeamWithTeammate = await ContestTeam.findOne({
        contestId: team.contestId._id,
        teamMembers: teammateStudent._id,
      });

      if (
        existingTeamWithTeammate &&
        existingTeamWithTeammate._id.toString() !== teamId
      ) {
        return res.status(400).json({
          status: 400,
          message: `Teammate ${fullName} (${academic_number}) is already part of another team for this contest.`,
        });
      }

      teamMembers.push(teammateStudent._id);
    }

    if (teamMembers.length > team.contestId.numberOfTeamMembers) {
      return res.status(400).json({
        status: 400,
        message: `The team cannot have more than ${team.contestId.numberOfTeamMembers} members.`,
      });
    }

    team.teamMembers = teamMembers;
  }

  if (teamName) {
    team.teamName = teamName;
  }

  await team.save();

  res.status(200).json({
    status: 200,
    message: "Team updated successfully.",
    team,
  });
});
const deleteTeam = expressAsyncHandler(async (req, res) => {
  const { teamId } = req.params;
  const studentId = req.user.id;

  if (!validateObjectId(teamId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid team ID.",
    });
  }

  const team = await ContestTeam.findById(teamId);
  if (!team) {
    return res.status(404).json({
      status: 404,
      message: "Team not found.",
    });
  }

  if (team.leaderId.toString() !== studentId.toString()) {
    return res.status(403).json({
      status: 403,
      message: "Only the team leader can delete the team.",
    });
  }

  await ContestTeam.findByIdAndDelete(teamId);
  for (const teammate of team.teamMembers) {
    console.log("teammmmmmmmmmmtes " + teammate.toString());
    await addRewardClaimAndUpdatePoints(
      teammate,
      "Student",
      "Contest",
      "subtract"
    );
  }
  res.status(200).json({
    status: 200,
    message: "Team deleted successfully.",
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
  getStudentsInSameClassAndGrade,
  createTeam,
  getTeamsForStudentInContest,
  editTeam,
  deleteTeam,
  // addTeamMember,
};
