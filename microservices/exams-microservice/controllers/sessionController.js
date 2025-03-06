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

    const exam = await Exam.findOne({ _id: exam_id });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const start_time = moment().utc().toDate();
    const end_time = moment(start_time).add(exam.duration, "minutes").toDate();

    const exam_end_time = moment(exam.end_time).utc();
    if (exam_end_time.isBefore(moment().utc())) {
      return res.status(403).json({ message: "Exam is closed" });
    }

    const existingSession = await Session.findOne({
      exam_id,
      student_id,
      end_time: { $gt: moment().utc().toDate() },
    });

    if (existingSession) {
      return res.status(403).json({
        message: "You already have an active session for this exam",
      });
    }

    const session = await addSession(student_id, exam_id, start_time, end_time);

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
