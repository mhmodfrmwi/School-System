const {
  addExam,
  fetchExams,
  fetchExamById,
} = require("../services/examService");

const createExam = async (req, res) => {
  try {
    const exam = await addExam(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create exam", err: err.message });
  }
};

const getExams = async (req, res) => {
  try {
    const exams = await fetchExams();
    res.status(200).json(exams);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch exams", err: err.message });
  }
};

const getExam = async (req, res) => {
  try {
    const exam = await fetchExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to fetch exam", err: err.message });
  }
};

module.exports = { createExam, getExams, getExam };
