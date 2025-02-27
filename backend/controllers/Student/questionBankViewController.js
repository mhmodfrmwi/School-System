const expressAsyncHandler = require("express-async-handler");
const validateObjectId = require("../../utils/validateObjectId");
const addRewardClaimAndUpdatePoints = require("../../utils/updatingRewards");
const QuestionView = require("../../DB/QuestionViewModel");
const moment = require("moment");
const Question = require("../../DB/questionBankModel");

const updateQuestionView = expressAsyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const student_id = req.user.id;

  if (!validateObjectId(questionId)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Question ID" });
  }

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ status: 404, message: "Question not found" });
    }
    let questionView = await QuestionView.findOne({
      question_id: questionId,
      student_id,
    });

    if (!questionView || !questionView.is_viewed) {
      await addRewardClaimAndUpdatePoints(student_id, "Student", "View Question");
    }
    questionView = await QuestionView.findOneAndUpdate(
      { question_id: questionId, student_id },
      {
        is_viewed: true,
        last_view_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      status: 200,
      message: "Question view status updated",
      questionView,
    });
  } catch (error) {
    console.error("Error updating question view:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const getQuestionViewByQuestionId = expressAsyncHandler(async (req, res) => {
  const { questionId } = req.params;
  const student_id = req.user.id;

  if (!validateObjectId(questionId)) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid Question ID" });
  }

  try {
    const questionView = await QuestionView.findOne({
      question_id: questionId,
      student_id,
    });

    if (!questionView) {
      return res.status(404).json({
        status: 404,
        message: "Question view record not found",
        isViewed: false,
        lastViewedAt: null,
      });
    }

    res.status(200).json({
      status: 200,
      isViewed: questionView.is_viewed,
      lastViewedAt: questionView.last_view_at,
    });
  } catch (error) {
    console.error("Error fetching question view:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = {
  updateQuestionView,
  getQuestionViewByQuestionId,
};
