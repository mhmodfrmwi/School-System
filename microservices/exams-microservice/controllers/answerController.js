const Session = require("../models/Session");
const StudentAnswer = require("../models/StudentAnswer");
const autoGradeMCQ = require("../services/gradingService");
const { calculateResults } = require("../services/resultsService");

const submitAnswers = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { answers } = req.body;

    const session = await Session.findById(session_id);
    if (!session || session.status === "Submitted") {
      return res.status(400).json({ message: "Invalid session" });
    }

    const savedAnswers = await StudentAnswer.insertMany(
      answers.map((answer) => ({
        ...answer,
        session_id,
        student_id: req.user.id,
      }))
    );
    await autoGradeMCQ(session_id);
    const result = await calculateResults(session_id);
    res.status(201).json({ savedAnswers, result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to submit answers" });
  }
};

module.exports = {
  submitAnswers,
};
