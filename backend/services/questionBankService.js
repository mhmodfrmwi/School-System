const GradeSubjectSemester = require("../DB/GradeSubjectSemesterModel");
const GradeSubject = require("../DB/GradeSubjectModel");
const Question = require("../DB/questionBankModel");
const BookMarkForQuestion = require("../DB/BookMarkForQuestionModel");
const QuestionView = require("../DB/QuestionViewModel");

async function getQuestionsBySubjectForStudent(
  studentId,
  gradeSubjectSemesterId
) {
  const gradeSubjectSemester = await GradeSubjectSemester.findById(
    gradeSubjectSemesterId
  )
    .populate({
      path: "grade_subject_id",
      populate: [
        { path: "subjectId" },
        { path: "gradeId" },
        { path: "academicYear_id" },
      ],
    })
    .populate("semester_id");

  if (!gradeSubjectSemester) {
    const error = new Error("GradeSubjectSemester not found.");
    error.statusCode = 404;
    throw error;
  }

  const gradeSubject = await GradeSubject.findById(
    gradeSubjectSemester.grade_subject_id
  );
  if (!gradeSubject) {
    const error = new Error("GradeSubject not found.");
    error.statusCode = 404;
    throw error;
  }

  const questions = await Question.find({
    subjectId: gradeSubjectSemester.grade_subject_id.subjectId,
    gradeId: gradeSubjectSemester.grade_subject_id.gradeId,
    semesterId: gradeSubjectSemester.semester_id,
  })
    .populate("subjectId", "subjectName")
    .populate("gradeId", "gradeName")
    .populate("semesterId", "semesterName")
    .populate("teacherId", "fullName");

  return addStatusToQuestions(questions, studentId);
}

async function getQuestionsByGradeAndSemester(gradeId, semesterId) {
  return Question.find({
    gradeId: gradeId,
    semesterId: semesterId,
  })
    .populate("subjectId", "subjectName")
    .populate("gradeId", "gradeName")
    .populate("semesterId", "semesterName")
    .populate("teacherId", "fullName");
}
async function getQuestionsByGradeAndSemesterWithStatus(
  gradeId,
  semesterId,
  studentId
) {
  const questions = await getQuestionsByGradeAndSemester(gradeId, semesterId);
  return addStatusToQuestions(questions, studentId);
}
async function addStatusToQuestions(questions, studentId) {
  return Promise.all(
    questions.map(async (question) => {
      const [isBookmarked, isViewed] = await Promise.all([
        BookMarkForQuestion.findOne({
          student_id: studentId,
          question_id: question._id,
        }),
        QuestionView.findOne({
          student_id: studentId,
          question_id: question._id,
        }),
      ]);

      return {
        ...question.toObject(),
        isBookmarked: !!isBookmarked,
        isViewed: !!isViewed,
      };
    })
  );
}

module.exports = {
  getQuestionsBySubjectForStudent,
  getQuestionsByGradeAndSemester,
  getQuestionsByGradeAndSemesterWithStatus,
};
