const Exam = require("../models/Exam");
const ExamResult = require("../models/ExamResult");
const Session = require("../models/Session");
const StudentAnswer = require("../models/StudentAnswer");
const autoGradeMCQ = require("../services/gradingService");
const { calculateResults } = require("../services/resultsService");

const submitAnswers = async (req, res) => {
  try {
    const { session_id } = req.params;
    const { answers } = req.body;

    // First, check if a result already exists for this session's exam
    const session = await Session.findById(session_id);
    if (!session) {
      return res.status(400).json({ message: "Invalid session" });
    }

    // Check if session is already submitted
    if (session.status === "Submitted") {
      return res.status(409).json({
        message: "This exam has already been submitted",
        alreadySubmitted: true,
      });
    }

    // Check if session is expired
    if (session.session_status === "Expired") {
      return res.status(403).json({ message: "Session Expired" });
    }

    // Use a transaction to ensure atomicity of the submission process
    const mongoose = require("mongoose");
    const session_db = await mongoose.startSession();
    session_db.startTransaction();

    try {
      // Lock the session to prevent concurrent modifications
      const lockedSession = await Session.findOneAndUpdate(
        { _id: session_id, status: { $ne: "Submitted" } },
        { $set: { processing: true } },
        { new: true, session: session_db }
      );

      if (!lockedSession) {
        // Session was already submitted or doesn't exist
        await session_db.abortTransaction();
        session_db.endSession();
        return res.status(409).json({
          message: "This exam has already been submitted or is being processed",
          alreadySubmitted: true,
        });
      }

      // Check again for existing result inside transaction
      const existingResult = await ExamResult.findOne(
        { exam_id: session.exam_id, student_id: req.user.id },
        null,
        { session: session_db }
      );

      if (existingResult) {
        await session_db.abortTransaction();
        session_db.endSession();
        return res.status(409).json({
          message: "This exam has already been submitted",
          alreadySubmitted: true,
          result: existingResult,
        });
      }

      // Insert answers
      await StudentAnswer.insertMany(
        answers.map((answer) => ({
          ...answer,
          session_id,
          student_id: req.user.id,
        })),
        { session: session_db }
      );

      // Grade the answers
      await autoGradeMCQ(session_id, session_db);

      // Calculate results
      const result = await calculateResults(session_id, session_db);

      // Mark session as submitted
      lockedSession.status = "Submitted";
      lockedSession.processing = false;
      await lockedSession.save({ session: session_db });

      // Commit the transaction
      await session_db.commitTransaction();
      session_db.endSession();

      // Get the saved answers for response
      const savedAnswers = await StudentAnswer.find({
        session_id,
        student_id: req.user.id,
      })
        .populate("question_id")
        .populate("student_id", "fullName")
        .select("-__v -updatedAt -createdAt");

      res.status(201).json({ savedAnswers, result });
    } catch (txError) {
      // If anything fails, abort the transaction
      await session_db.abortTransaction();
      session_db.endSession();
      throw txError;
    }
  } catch (err) {
    console.error("Submit answers error:", err.message);
    res.status(500).json({ message: err.message });
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
