const Exam = require("../models/Exam");
const ExamQuestion = require("../models/ExamQuestion");
const Session = require("../models/Session");
const StudentAnswer = require("../models/StudentAnswer");
const ExamResult = require("../models/ExamResult");
const { createExamQuestions } = require("./questionService");

const addExam = async (examData) => {
  try {
    if (!examData.exam_questions && examData.type === "Offline") {
      const exam = new Exam(examData);
      await exam.save();
      return exam;
    }
    const questionIds = await createExamQuestions(examData.exam_questions);
    const exam = new Exam({
      ...examData,
      exam_questions: questionIds,
    });
    await exam.save();
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchExams = async () => {
  try {
    const exams = await Exam.find()
      .populate("subject_id grade_id class_id academic_year_id semester_id")
      .populate("created_by", "_id fullName")
      .select("-__v -createdAt -updatedAt");
    return exams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchExamsByAttributes = async (
  class_id,
  semester_id,
  grade_id,
  subject_id,
  academic_year_id
) => {
  try {
    const exams = await Exam.find({
      class_id,
      semester_id,
      grade_id,
      subject_id,
      academic_year_id,
    })
      .populate(
        "subject_id grade_id class_id academic_year_id semester_id exam_questions"
      )
      .populate("created_by", "_id fullName")
      .select("-__v -createdAt -updatedAt");
    return exams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const fetchExamById = async (id) => {
  try {
    const exam = await Exam.findById(id)
      .populate(
        "subject_id grade_id class_id academic_year_id semester_id created_by exam_questions"
      )
      .select("-__v -createdAt -updatedAt");
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const checkExamStatus = async (id) => {
  try {
    const exam = await Exam.findById(id);
    return exam.exam_status;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const updateExam = async (id, updateData) => {
  try {
    // Check if exam exists first
    const existingExam = await Exam.findById(id);
    if (!existingExam) {
      throw new Error("Exam not found");
    }

    // Fixed: Check for active sessions (not submitted ones)
    const activeSessionsForTheExam = await Session.find({
      exam_id: id,
      status: { $nin: ["Submitted", "Completed"] }, // Exclude submitted/completed sessions
    });

    if (activeSessionsForTheExam.length > 0) {
      throw new Error("Cannot update exam while there are active sessions");
    }

    const { exam_questions, ...examUpdateData } = updateData;

    // Handle exam questions updates
    if (exam_questions && exam_questions.length > 0) {
      await Promise.all(
        exam_questions.map(async (question) => {
          if (question._id) {
            // Update existing question
            await ExamQuestion.findByIdAndUpdate(
              question._id,
              { $set: question },
              { new: true }
            );
          } else {
            // Create new question and add to exam
            const newQuestion = await ExamQuestion.create({
              ...question,
              exam_id: id, // Ensure exam_id is set
            });
            await Exam.findByIdAndUpdate(id, {
              $push: { exam_questions: newQuestion._id },
            });
          }
        })
      );
    }

    // Calculate total marks based on exam type and update data
    let finalUpdateData = { ...examUpdateData };

    // Get updated exam with questions to calculate total marks
    const examWithQuestions = await Exam.findById(id).populate(
      "exam_questions"
    );

    // If total_marks is provided in updateData and exam is offline, use it
    // Otherwise, calculate from questions
    if (
      examUpdateData.total_marks !== undefined &&
      (examWithQuestions.exam_type === "offline" ||
        examUpdateData.exam_type === "offline")
    ) {
      // For offline exams, allow manual total marks update
      finalUpdateData.total_marks = examUpdateData.total_marks;
    } else if (
      examWithQuestions.exam_questions &&
      examWithQuestions.exam_questions.length > 0
    ) {
      // Calculate total marks from questions for online exams or when not manually specified
      const calculatedTotalMarks = examWithQuestions.exam_questions.reduce(
        (sum, question) => sum + (question.marks || 0),
        0
      );
      finalUpdateData.total_marks = calculatedTotalMarks;
    }

    // Update the exam
    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      finalUpdateData,
      { new: true, runValidators: true } // Added runValidators for data validation
    )
      .populate("subject_id grade_id class_id academic_year_id semester_id")
      .populate("created_by", "_id fullName")
      .populate("exam_questions")
      .select("-__v -createdAt -updatedAt");

    return updatedExam;
  } catch (error) {
    console.error("Error in updateExam:", error);
    throw new Error(error.message);
  }
};

const deleteExam = async (id) => {
  try {
    const exam = await Exam.findById(id);
    if (!exam) throw new Error("Exam not found");

    await ExamQuestion.deleteMany({ _id: { $in: exam.exam_questions } });

    const sessions = await Session.find({ exam_id: id });

    for (const session of sessions) {
      await StudentAnswer.deleteMany({ session_id: session._id });
      await ExamResult.deleteMany({
        exam_id: id,
        student_id: session.student_id,
      });
    }

    await Session.deleteMany({ exam_id: id });

    await Exam.findByIdAndDelete(id);
    return exam;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
//
const getExamsByTeacherId = async (teacher_id) => {
  try {
    const exams = await Exam.find({ created_by: teacher_id })
      .populate(
        "subject_id grade_id class_id academic_year_id semester_id exam_questions"
      )
      .select("-__v -createdAt -updatedAt");
    return exams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
const fetchExamsByTeacherIdAndSubjectAttributes = async (
  teacher_id,
  subject_id,
  grade_id,
  academic_year_id,
  semester_id
) => {
  try {
    const exams = await Exam.find({
      created_by: teacher_id,
      subject_id,
      grade_id,
      academic_year_id,
      semester_id,
    })
      .populate(
        "subject_id grade_id class_id academic_year_id semester_id exam_questions"
      )
      .select("-__v -createdAt -updatedAt");
    return exams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
const getStudentResults = async (student_id) => {
  try {
    const results = await ExamResult.find({ student_id })
      .populate("exam_id", "title")
      .select("-__v");
    return results;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const getMissedExams = async (
  student_id,
  subject_id,
  grade_id,
  academic_year_id,
  semester_id,
  class_id
) => {
  try {
    const exams = await Exam.find({
      subject_id,
      grade_id,
      academic_year_id,
      semester_id,
      class_id,
    })
      .populate("subject_id grade_id class_id academic_year_id semester_id")
      .populate("created_by", "_id fullName")
      .select("-__v -createdAt -updatedAt");

    const missedExams = [];
    for (const exam of exams) {
      if (exam.exam_status === "Expired") {
        const session = await Session.findOne({
          student_id,
          exam_id: exam._id,
        });
        if (!session) {
          missedExams.push(exam);
        }
      }
    }

    return missedExams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const getCompletedExams = async (
  student_id,
  subject_id,
  grade_id,
  academic_year_id,
  semester_id,
  class_id
) => {
  try {
    const exams = await Exam.find({
      subject_id,
      grade_id,
      academic_year_id,
      semester_id,
      class_id,
    })
      .populate("subject_id grade_id class_id academic_year_id semester_id")
      .populate("created_by", "_id fullName")
      .select("-__v -createdAt -updatedAt");
    const completedExams = [];
    for (const exam of exams) {
      const session = await Session.findOne({
        student_id,
        exam_id: exam._id,
      });
      if (session && session.status === "Submitted") {
        completedExams.push(exam);
      }
    }
    return completedExams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const getCompletedExamsForAllSubjects = async (student_id) => {
  try {
    const examsResults = await ExamResult.find({ student_id })
      .populate({
        path: "exam_id",
        populate: {
          path: "subject_id",
          select: "subjectName",
        },
      })
      .select("-__v -createdAt -updatedAt");

    const result = {};

    examsResults.forEach((examResult) => {
      const exam = examResult.exam_id;
      const subjectId = exam.subject_id._id;
      const subjectName = exam.subject_id.subjectName;

      if (!result[subjectId]) {
        result[subjectId] = {
          subjectName: subjectName,
          exams: [],
        };
      }

      result[subjectId].exams.push({
        examTitle: exam.title,
        examDescription: exam.description,
        examType: exam.type,
        examTotalMarks: exam.total_marks,
        studentScore: examResult.total_marks,
        percentage: examResult.percentage,
        status: examResult.status,
        examDate: exam.start_time,
      });
    });

    return Object.values(result);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const missedExamsForAllSubjects = async (student_id) => {
  try {
    const exams = await Exam.find({})
      .populate("subject_id grade_id class_id academic_year_id semester_id")
      .select("-__v -createdAt -updatedAt");

    const missedExams = [];

    for (const exam of exams) {
      if (exam.exam_status === "Expired") {
        const session = await Session.findOne({
          student_id,
          exam_id: exam._id,
        });
        if (!session) {
          missedExams.push(exam);
        }
      }
    }

    return missedExams;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = {
  addExam,
  fetchExams,
  fetchExamById,
  fetchExamsByAttributes,
  checkExamStatus,
  updateExam,
  deleteExam,
  getExamsByTeacherId,
  fetchExamsByTeacherIdAndSubjectAttributes,
  getStudentResults,
  getMissedExams,
  getCompletedExams,
  getCompletedExamsForAllSubjects,
  missedExamsForAllSubjects,
};
