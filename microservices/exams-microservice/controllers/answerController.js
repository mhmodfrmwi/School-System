const Exam = require("../models/Exam");
const Session = require("../models/Session");
const StudentAnswer = require("../models/StudentAnswer");
const autoGradeMCQ = require("../services/gradingService");
const { calculateResults } = require("../services/resultsService");

const submitAnswers = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { answers } = req.body;

    const session = await Session.findById(session_id);

    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }
    if (session.status === "Submitted") {
      return res.status(403).json({ message: "Session already submitted" });
    }
    if (session.session_status === "Expired") {
      return res.status(403).json({ message: "Session Expired" });
    }
    await StudentAnswer.insertMany(
      answers.map((answer) => ({
        ...answer,
        session_id,
        student_id: req.user.id,
      }))
    );
    const savedAnswers = await StudentAnswer.find({
      session_id,
      student_id: req.user.id,
    })
      .populate("question_id")
      .populate("student_id", "fullName")
      .select("-__v -updatedAt -createdAt");

    await autoGradeMCQ(session_id);
    const result = await calculateResults(session_id);
    session.status = "Submitted";
    await session.save();
    console.log(session);

    res.status(201).json({ savedAnswers, result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to submit answers" });
  }
};

const getAnswersOfStudent = async (req, res) => {
  const { exam_id } = req.params;
  const session = await Session.findOne({
    exam_id: exam_id,
    student_id: req.user.id,
  });

  if (session) {
    const savedAnswers = await StudentAnswer.find({
      session_id: session._id,
      student_id: req.user.id,
    })
      .populate("question_id")
      .populate("student_id", "fullName")
      .select("-__v -updatedAt -createdAt");
    const result = await calculateResults(session._id);

    return res.status(200).json({ savedAnswers, result });
  } else {
    const exam = await Exam.findById(exam_id)
      .populate("exam_questions", "-__v -updatedAt -createdAt")
      .select("-__v -updatedAt -createdAt");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    const formattedExam = {
      ...exam.toObject(),
      status: "Missing",
    };
    return res.status(200).json(formattedExam);
  }
};
module.exports = {
  submitAnswers,
  getAnswersOfStudent,
};
