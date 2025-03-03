const Exam = require("../models/Exam");
const moment = require("moment");

const {
  addSession,
  getSessionsForStudent,
} = require("../services/sessionService");
const Session = require("../models/Session");

const startSession = async (req, res) => {
  try {
    const exam_id = req.params.exam_id;
    if (!exam_id) {
      return res.status(400).json({ message: "Exam ID is required" });
    }

    const student_id = req.user.id;

    // Fetch the exam
    const exam = await Exam.findOne({ _id: exam_id });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Get current time and calculate session end time
    const start_time = moment().utc().toDate();
    const end_time = moment(start_time).add(exam.duration, "minutes").toDate();

    // Check if the exam is closed
    const exam_end_time = moment(exam.end_time).utc();
    if (exam_end_time.isBefore(moment().utc())) {
      return res.status(403).json({ message: "Exam is closed" });
    }

    // Check if the session end time exceeds the exam end time
    if (moment(end_time).isAfter(exam_end_time)) {
      return res.status(403).json({
        message:
          "Session cannot be started because it exceeds the exam end time",
      });
    }

    // Check if the student already has an active session for this exam
    const existingSession = await Session.findOne({
      exam_id,
      student_id,
      end_time: { $gt: moment().utc().toDate() }, // Active session
    });

    if (existingSession) {
      return res.status(403).json({
        message: "You already have an active session for this exam",
      });
    }

    // Create a new session
    const session = await addSession(student_id, exam_id, start_time, end_time);

    // Format response
    const formattedStartTime = moment(session.start_time)
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
    const formattedEndTime = moment(session.end_time)
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");

    const response = {
      ...session.toObject(),
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      status: session.session_status,
    };

    res.status(201).json({ session: response });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to start session", error: err.message });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const sessions = await getSessionsForStudent(req.user.id);
    const formattedSessions = sessions.map((session) => ({
      ...session.toObject(),
      start_time: moment(session.start_time).format("YYYY-MM-DD HH:mm:ss"),
      end_time: moment(session.end_time).format("YYYY-MM-DD HH:mm:ss"),
      status: session.status,
      isExpired: session.session_status === "Expired" ? true : false,
    }));
    res.json(formattedSessions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get sessions", err: err.message });
  }
};

module.exports = { startSession, getAllSessions };
