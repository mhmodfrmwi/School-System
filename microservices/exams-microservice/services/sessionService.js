const Exam = require("../models/Exam");
const Session = require("../models/Session");

const addSession = async (student_id, exam_id, start_time, end_time) => {
  try {
    const existingSession = await Session.findOne({ student_id, exam_id });
    if (existingSession) {
      throw new Error("Session already exists");
    }
    const session = new Session({
      exam_id,
      student_id,
      start_time,
      end_time,
    });
    await session.save();
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
const getSessionsForStudent = async (student_id) => {
  try {
    const sessions = await Session.find({ student_id })
      .populate("student_id", "fullName")
      .populate("exam_id", "title")
      .select("-__v");
    return sessions;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
module.exports = { addSession, getSessionsForStudent };
