const Exam = require("../models/Exam");
const moment = require("moment");

const {
  addSession,
  getSessionsForStudent,
  endSession,
} = require("../services/sessionService");

const startSession = async (req, res) => {
  try {
    const exam_id = req.params.exam_id;
    if (!exam_id) {
      return res.status(400).json({ message: "Exam ID is required" });
    }
    const student_id = req.user.id;
    const exam = await Exam.findOne({ _id: exam_id });
    if (!exam) {
      throw new Error("Exam not found");
    }
    const start_time = moment().utc().toDate();
    const end_time = moment().utc().add(exam.duration, "minutes").toDate();
    const session = await addSession(student_id, exam_id, start_time, end_time);

    res.status(201).json({ session });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to start session", err: err.message });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const sessions = await getSessionsForStudent(req.user.id);
    const formattedSessions = sessions.map((session) => ({
      ...session.toObject(),
      start_time: moment(session.start_time).format("YYYY-MM-DD HH:mm:ss"),
      end_time: moment(session.end_time).format("YYYY-MM-DD HH:mm:ss"),
    }));
    res.json(formattedSessions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get sessions", err: err.message });
  }
};

const endSessionById = async (req, res) => {
  try {
    const session_id = req.params.session_id;
    if (!session_id) {
      return res.status(400).json({ message: "Session ID is required" });
    }
    await endSession(session_id);
    res.status(204).json({});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to end session", err: err.message });
  }
};

module.exports = { startSession, getAllSessions, endSessionById };
