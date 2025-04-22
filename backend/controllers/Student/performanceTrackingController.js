const { get } = require("mongoose");
const student = require("../../DB/student");
const { getNumberOfAbsentDays } = require("../../services/attendaceService");

const modelData = async (req, res) => {
  try {
    const student_id = req.user.id;

    const getSubjectsWithScore = await getExamsWithScores(req);
    const numberOfAbsentDays = await getNumberOfAbsentDays(student_id);

    const subjectAverages = {};

    getSubjectsWithScore.forEach((subject) => {
      if (subject.exams && subject.exams.length > 0) {
        const totalPercentage = subject.exams.reduce(
          (sum, exam) => sum + exam.percentage,
          0
        );
        const averagePercentage = totalPercentage / subject.exams.length;
        subjectAverages[subject.subjectName.toLowerCase()] =
          Math.round(averagePercentage);
      }
    });

    const response = {
      ...subjectAverages,
      absent_days: numberOfAbsentDays,
    };
    const modelResponse = await getModelResponse(response);
    res.status(200).json(modelResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getExamsWithScores = async (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  const response = await fetch(
    `http://localhost:3000/exams/student/completed/all`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

const getModelResponse = async (response) => {
  const modelResponse = await fetch(`http://127.0.0.1:5000/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  });
  const data = await modelResponse.json();
  return data;
};
module.exports = {
  modelData,
};
