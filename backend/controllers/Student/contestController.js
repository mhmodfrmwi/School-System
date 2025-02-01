const Contest = require("../../DB/contestModel");
const contestValidationSchema = require("../../validations/contestValidation");
const expressAsyncHandler = require("express-async-handler");

const getAllContests = expressAsyncHandler(async (req, res) => {
    const contests = await Contest.find();
    res.status(200).json(contests);
  });

module.exports = {
  getAllContests,
};
