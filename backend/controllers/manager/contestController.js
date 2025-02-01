const Contest = require("../../DB/contestModel");
const contestValidationSchema = require("../../validations/contestValidation");
const expressAsyncHandler = require("express-async-handler");

const createContest = expressAsyncHandler(async (req, res) => {
    const { error } = contestValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).json({
        status: 201,
        message: "contest created successfully",
        contest,
      });
 });

const getAllContests = expressAsyncHandler(async (req, res) => {
    const contests = await Contest.find();
    res.status(200).json(contests);
  });
const getContest = expressAsyncHandler(async (req, res) => {});
const updateContest = expressAsyncHandler(async (req, res) => {});
const deleteContest = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createContest,
  getAllContests,
  getContest,
  updateContest,
  deleteContest,
};
