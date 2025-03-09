const StudentAnswer = require("../models/StudentAnswer");

const autoGradeMCQ = async (session_id, session_db) => {
  try {
    const answers = await StudentAnswer.find(
      { session_id },
      null,
      session_db ? { session: session_db } : undefined
    ).populate("question_id");

    for (const answer of answers) {
      if (answer.question_id.question_type === "MCQ") {
        const isCorrect =
          answer.selected_answer === answer.question_id.correct_answer;
        answer.marks_awarded = isCorrect ? answer.question_id.marks : 0;
        await answer.save();
      }
    }
  } catch (error) {
    console.error("Error in autoGradeMCQ: ", error.message);
    throw error;
  }
};

module.exports = autoGradeMCQ;
