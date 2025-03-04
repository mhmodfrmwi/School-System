const Session = require("../models/Session");
const StudentAnswer = require("../models/StudentAnswer");

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

const fetchSession = async (exam_id, student_id) => {
  try {
    const existingSession = await Session.findOne({ student_id, exam_id });
    return existingSession;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
const deleteSession = async (id) => {
  try {
    const session = await Session.findByIdAndDelete(id);
    if (!session) throw new Error("Session not found");

    await StudentAnswer.deleteMany({ session_id: id });
    await ExamResult.deleteOne({
      exam_id: session.exam_id,
      student_id: session.student_id,
    });

    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
module.exports = {
  addSession,
  getSessionsForStudent,
  fetchSession,
  deleteSession,
};
