const Attendance = require("../../DB/attendanceModel");
const student = require("../../DB/student");
const axios = require("axios");
const { getNumberOfAbsentDays } = require("../../services/attendaceService");
const nowSemesterId = require("../../utils/nowSemester");
const {
  getStudentGradesReport,
} = require("../../services/studentGradeService");

const getDashboardData = async (req, res) => {
  try {
    const { id } = req.query;
    const authToken = req.authToken;
    const studentId = id;
    if (!studentId) {
      return res.status(400).json({
        status: 400,
        message: "Student ID is required",
      });
    }

    const studentData = await student.findById(studentId);

    if (!studentData) {
      return res.status(404).json({
        status: 404,
        message: "Student not found",
      });
    }
    const numberOfAbsentDays = await getNumberOfAbsentDays(studentId);
    const completedExams = await getCompletedExams(studentId, authToken);
    const missedExams = await getMissedExams(studentId, authToken);
    const missedAssignments = await getMissedAssignments(studentId, authToken);
    const grades = await getStudentGradesReport(studentId);
    res.status(200).json({
      status: 200,
      message: "Dashboard data fetched successfully",
      data: {
        studentData,
        numberOfAbsentDays,
        completedExams,
        missedExams,
        missedAssignments,
        grades,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const getCompletedExams = async (student_id, authToken) => {
  try {
    console.log("Fetching completed exams for student:", student_id);
    const response = await axios.post(
      `${process.env.EXAMS_SERVICE_URL}/exams/student/allCompletedExams`,
      { student_id: student_id },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch completed exams");
    }
  } catch (error) {
    console.error("Error fetching completed exams:", error.message);
    throw new Error("Failed to fetch completed exams");
  }
};

const getMissedExams = async (student_id, authToken) => {
  try {
    const response = await axios.post(
      `${process.env.EXAMS_SERVICE_URL}/exams/student/allMissedExams`,
      { student_id: student_id },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch missed exams");
    }
  } catch (error) {
    console.error("Error fetching missed exams:", error.message);
    throw new Error("Failed to fetch missed exams");
  }
};
const getMissedAssignments = async (student_id, authToken) => {
  try {
    const studentData = await student.findById(student_id);
    if (!studentData) {
      throw new Error("Student not found");
    }

    const semester_id = await nowSemesterId(studentData.academicYear_id);
    if (!semester_id) {
      throw new Error("Could not determine current semester");
    }
    console.log(authToken);

    const response = await axios.post(
      `${process.env.EXAMS_SERVICE_URL}/assignments/missedAssignments`,
      {
        student_id: student_id,
        class_id: studentData.classId,
        semester_id,
        academic_year_id: studentData.academicYear_id,
        grade_id: studentData.gradeId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching missed assignments:", error.message);

    if (error.response) {
      throw new Error(
        `Assignment service error: ${
          error.response.data.message || error.response.status
        }`
      );
    } else if (error.request) {
      throw new Error("No response from assignments service");
    } else {
      throw new Error(`Failed to fetch missed assignments: ${error.message}`);
    }
  }
};

module.exports = {
  getDashboardData,
};
