const Exam = require("../models/Exam");

const createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: "Failed to create exam" });
  }
};

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate(
      "subject_id grade_id class_id academic_year_id semester_id created_by"
    );
    res.json(exams);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: "Failed to get exams" });
  }
};

module.exports = { createExam, getExams };
