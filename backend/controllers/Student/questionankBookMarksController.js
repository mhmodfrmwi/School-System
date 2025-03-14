const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const student = require("../../DB/student");
const Question = require("../../DB/questionBankModel");
const BookMarkForQuestion = require("../../DB/bookMarkForQuestion");

const addQuestionToBookmarks = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  if (!validateObjectId(studentId)) {
    return res.status(400).json({ status: 400, message: "Invalid Student ID" });
  }

  const existingStudent = await student.findById(studentId);
  if (!existingStudent) {
    return res.status(404).json({ status: 404, message: "Student not found" });
  }

  const questionId = req.params.questionId;
  if (!validateObjectId(questionId)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Question ID" });
  }

  const existingQuestion = await Question.findById(questionId);
  if (!existingQuestion) {
    return res.status(404).json({ status: 404, message: "Question not found" });
  }

  const existingBookmark = await BookMarkForQuestion.findOne({
    student_id: existingStudent._id,
    question_id: existingQuestion._id,
  });

  if (existingBookmark) {
    return res
      .status(400)
      .json({ status: 400, message: "Question already added to bookmarks" });
  }

  const bookmark = new BookMarkForQuestion({
    student_id: existingStudent._id,
    question_id: existingQuestion._id,
  });

  await bookmark.save();

  res.status(201).json({ status: 201, message: "Question added to bookmarks" });
});

const getAllBookmarkedQuestions = expressAsyncHandler(async (req, res) => {
  try {
    const studentId = req.user.id;
    if (!validateObjectId(studentId)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Student ID" });
    }

    const existingStudent = await student.findById(studentId);
    if (!existingStudent) {
      return res
        .status(404)
        .json({ status: 404, message: "Student not found" });
    }

    const bookmarks = await BookMarkForQuestion.find(
      { student_id: existingStudent._id },
      ["-__v", "-createdAt", "-updatedAt"]
    )
      .populate("question_id", ["-__v", "-createdAt", "-updatedAt"])
      .populate("student_id", ["-__v", "-createdAt", "-updatedAt"]);

    res.status(200).json({ status: 200, bookmarks });
  } catch (error) {
    console.log(`Failed ${error.message}`);
    res.json({ message: `Failed ${error.message}` });
  }
});

const deleteQuestionFromBookmarks = expressAsyncHandler(async (req, res) => {
  const studentId = req.user.id;
  if (!validateObjectId(studentId)) {
    return res.status(400).json({ status: 400, message: "Invalid Student ID" });
  }

  const existingStudent = await student.findById(studentId);
  if (!existingStudent) {
    return res.status(404).json({ status: 404, message: "Student not found" });
  }

  const questionId = req.params.questionId;
  if (!validateObjectId(questionId)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Question ID" });
  }

  const deletedBookmark = await BookMarkForQuestion.findOneAndDelete({
    student_id: existingStudent._id,
    question_id: questionId,
  });

  if (!deletedBookmark) {
    return res
      .status(404)
      .json({ status: 404, message: "Question not found in bookmarks" });
  }

  res
    .status(200)
    .json({ status: 200, message: "Question deleted from bookmarks" });
});

module.exports = {
  addQuestionToBookmarks,
  getAllBookmarkedQuestions,
  deleteQuestionFromBookmarks,
};
