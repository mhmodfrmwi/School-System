const Session = require("../models/Session");

const addSession = async (student_id, exam_id, start_time, end_time) => {
  try {
    const existingSession = await Session.findOne({ student_id, exam_id });
    if (existingSession) {
      return existingSession;
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

const endSession = async (session_id) => {
  try {
    const session = await Session.findByIdAndUpdate(
      session_id,
      { status: "Submitted" },
      { new: true }
    );
    if (!session) {
      throw new Error("Session not found");
    }
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchSession = async (exam_id, student_id) => {
  const existingSession = await Session.findOne({ student_id, exam_id });
  return existingSession;
};

module.exports = {
  addSession,
  getSessionsForStudent,
  endSession,
  fetchSession,
};
