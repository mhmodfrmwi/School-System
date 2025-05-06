const Attendance = require("../../DB/attendanceModel");
const student = require("../../DB/StudentModel");
const axios = require("axios");
const { getNumberOfAbsentDays } = require("../../services/attendaceService");
const nowSemesterId = require("../../utils/nowSemester");
const {
  getStudentGradesReport,
} = require("../../services/studentGradeService");
const { getMaterialsForGrade } = require("../../services/materialService");
const {
  getAllCompletedVirtualRoomsForAllSubjects,
} = require("../../services/virtualRoomService");

const getDashboardData = async (req, res) => {
  try {
    const id = req.query.id || req.user.id;
    const authToken = req.authToken;
    const studentId = id;
    if (!studentId) {
      return res.status(400).json({
        status: 400,
        message: "Student ID is required",
      });
    }

    const studentData = await student
      .findById(studentId)
      .select("-__v -createdAt -updatedAt");

    if (!studentData) {
      return res.status(404).json({
        status: 404,
        message: "Student not found",
      });
    }

    // Get base data
    const numberOfAbsentDays = await getNumberOfAbsentDays(studentId);
    const completedExams = await getCompletedExams(studentId, authToken);
    const missedExams = await getMissedExams(studentId, authToken);
    const missedAssignments = await getMissedAssignments(studentId, authToken);
    const grades = await getStudentGradesReport(studentId);
    const materialsStates = (await getMaterialsForGrade(studentId))
      .studentStats;
    const virtualRoomsStates = await getAllCompletedVirtualRoomsForAllSubjects(
      studentId
    );
    // ENHANCED: Calculate additional metrics
    const attendanceMetrics = await calculateAttendanceMetrics(
      studentId,
      numberOfAbsentDays
    );
    const examMetrics = calculateExamMetrics(completedExams, missedExams);
    const assignmentMetrics = calculateAssignmentMetrics(missedAssignments);
    const enhancedGradeMetrics = calculateEnhancedGradeMetrics(grades);
    const performanceTrends = calculatePerformanceTrends(
      grades,
      completedExams
    );
    const academicStanding = calculateAcademicStanding(
      enhancedGradeMetrics,
      examMetrics
    );

    res.status(200).json({
      status: 200,
      message: "Dashboard data fetched successfully",
      data: {
        studentData,
        materialsStates,
        numberOfAbsentDays,
        completedExams,
        missedExams,
        missedAssignments,
        grades,
        virtualRoomsStates,
        dashboardMetrics: {
          attendance: attendanceMetrics,
          exams: examMetrics,
          assignments: assignmentMetrics,
          grades: enhancedGradeMetrics,
          performanceTrends,
          academicStanding,
        },
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

/**
 * Calculate detailed attendance metrics
 */
const calculateAttendanceMetrics = async (studentId, absentDays) => {
  try {
    // You would need to add a function or query to get total school days
    // For this example, I'll estimate based on typical school days
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 8, 1); // Sept 1

    // Calculate school days (approx 20 days per month since start of semester)
    const monthsDiff =
      currentDate.getMonth() -
      startDate.getMonth() +
      12 * (currentDate.getFullYear() - startDate.getFullYear());
    const totalSchoolDays = monthsDiff * 20;

    // If school hasn't started yet or invalid calculation, use a reasonable default
    const effectiveSchoolDays = totalSchoolDays > 0 ? totalSchoolDays : 100;

    return {
      absentDays,
      presentDays: effectiveSchoolDays - absentDays,
      totalSchoolDays: effectiveSchoolDays,
      attendanceRate: (
        ((effectiveSchoolDays - absentDays) / effectiveSchoolDays) *
        100
      ).toFixed(2),
      absenceRate: ((absentDays / effectiveSchoolDays) * 100).toFixed(2),
      attendanceStatus: determineAttendanceStatus(
        absentDays,
        effectiveSchoolDays
      ),
    };
  } catch (error) {
    console.error("Error calculating attendance metrics:", error);
    return {
      absentDays,
      attendanceRate: "N/A",
      absenceRate: "N/A",
      attendanceStatus: "Unknown",
    };
  }
};

/**
 * Determine attendance status based on absence rate
 */
const determineAttendanceStatus = (absentDays, totalDays) => {
  const absenceRate = (absentDays / totalDays) * 100;

  if (absenceRate < 5) return "Excellent";
  if (absenceRate < 10) return "Good";
  if (absenceRate < 15) return "Average";
  if (absenceRate < 20) return "Below Average";
  return "Poor";
};

/**
 * Calculate detailed exam metrics
 */
const calculateExamMetrics = (completedExams, missedExams) => {
  try {
    // Initialize counters
    let totalExamsTaken = 0;
    let totalExamsMissed = missedExams.length;
    let totalExamsPassed = 0;
    let totalExamsFailed = 0;
    let totalScoreSum = 0;
    let totalMaxScore = 0;
    let examsBySubject = {};
    let examPerformanceByType = {
      Online: { taken: 0, passed: 0, totalScore: 0, totalPossible: 0 },
      Offline: { taken: 0, passed: 0, totalScore: 0, totalPossible: 0 },
    };

    // Process completed exams
    completedExams.forEach((subjectExams) => {
      const subject = subjectExams.subjectName;

      if (!examsBySubject[subject]) {
        examsBySubject[subject] = {
          taken: 0,
          missed: 0,
          passed: 0,
          failed: 0,
          averageScore: 0,
          totalScore: 0,
          totalPossible: 0,
        };
      }

      subjectExams.exams.forEach((exam) => {
        totalExamsTaken++;
        examsBySubject[subject].taken++;

        if (exam.status === "Pass") {
          totalExamsPassed++;
          examsBySubject[subject].passed++;
        } else {
          totalExamsFailed++;
          examsBySubject[subject].failed++;
        }

        totalScoreSum += exam.studentScore;
        totalMaxScore += exam.examTotalMarks;

        examsBySubject[subject].totalScore += exam.studentScore;
        examsBySubject[subject].totalPossible += exam.examTotalMarks;

        // Track by exam type
        const examType = exam.examType;
        if (examPerformanceByType[examType]) {
          examPerformanceByType[examType].taken++;
          if (exam.status === "Pass") examPerformanceByType[examType].passed++;
          examPerformanceByType[examType].totalScore += exam.studentScore;
          examPerformanceByType[examType].totalPossible += exam.examTotalMarks;
        }
      });

      // Calculate average score for subject
      if (examsBySubject[subject].taken > 0) {
        examsBySubject[subject].averageScore = (
          (examsBySubject[subject].totalScore /
            examsBySubject[subject].totalPossible) *
          100
        ).toFixed(2);
      }
    });

    // Process missed exams to add to subject statistics
    missedExams.forEach((exam) => {
      const subject = exam.subject_id?.subjectName;
      if (subject) {
        if (!examsBySubject[subject]) {
          examsBySubject[subject] = {
            taken: 0,
            missed: 0,
            passed: 0,
            failed: 0,
            averageScore: 0,
            totalScore: 0,
            totalPossible: 0,
          };
        }
        examsBySubject[subject].missed++;
      }
    });

    // Calculate overall percentages
    const totalExams = totalExamsTaken + totalExamsMissed;
    const examCompletionRate =
      totalExams > 0 ? ((totalExamsTaken / totalExams) * 100).toFixed(2) : 0;
    const examPassRate =
      totalExamsTaken > 0
        ? ((totalExamsPassed / totalExamsTaken) * 100).toFixed(2)
        : 0;
    const overallScore =
      totalMaxScore > 0
        ? ((totalScoreSum / totalMaxScore) * 100).toFixed(2)
        : 0;

    // Calculate performance by exam type
    Object.keys(examPerformanceByType).forEach((type) => {
      const typeData = examPerformanceByType[type];
      typeData.passRate =
        typeData.taken > 0
          ? ((typeData.passed / typeData.taken) * 100).toFixed(2)
          : 0;
      typeData.averageScore =
        typeData.totalPossible > 0
          ? ((typeData.totalScore / typeData.totalPossible) * 100).toFixed(2)
          : 0;
    });

    return {
      summary: {
        totalExams,
        examsTaken: totalExamsTaken,
        examsMissed: totalExamsMissed,
        examsPassed: totalExamsPassed,
        examsFailed: totalExamsFailed,
        examCompletionRate,
        examPassRate,
        overallScore,
      },
      bySubject: examsBySubject,
      byType: examPerformanceByType,
    };
  } catch (error) {
    console.error("Error calculating exam metrics:", error);
    return {
      summary: {
        totalExams: 0,
        examsTaken: 0,
        examsMissed: 0,
        examCompletionRate: 0,
        examPassRate: 0,
        overallScore: 0,
      },
      bySubject: {},
      byType: {},
    };
  }
};

/**
 * Calculate assignment metrics
 */
const calculateAssignmentMetrics = (missedAssignments) => {
  try {
    const totalMissed = missedAssignments.length;

    // Group by subject
    const bySubject = {};
    missedAssignments.forEach((assignment) => {
      const subject = assignment.subject_id?.subjectName;
      if (!subject) return;

      if (!bySubject[subject]) {
        bySubject[subject] = {
          missed: 0,
          totalMarks: 0,
        };
      }

      bySubject[subject].missed++;
      bySubject[subject].totalMarks += assignment.total_marks || 0;
    });

    // Calculate urgency - assignments by due date proximity
    const now = new Date();
    const urgencyCategories = {
      past: 0, // Already past due
      urgent: 0, // Due within 2 days
      upcoming: 0, // Due within 7 days
      planned: 0, // Due beyond 7 days
    };

    missedAssignments.forEach((assignment) => {
      const dueDate = new Date(assignment.due_date);
      const daysUntilDue = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24));

      if (daysUntilDue < 0) {
        urgencyCategories.past++;
      } else if (daysUntilDue <= 2) {
        urgencyCategories.urgent++;
      } else if (daysUntilDue <= 7) {
        urgencyCategories.upcoming++;
      } else {
        urgencyCategories.planned++;
      }
    });

    return {
      totalMissed,
      bySubject,
      urgency: urgencyCategories,
      impactOnGrades:
        totalMissed > 5 ? "High" : totalMissed > 2 ? "Medium" : "Low",
    };
  } catch (error) {
    console.error("Error calculating assignment metrics:", error);
    return {
      totalMissed: missedAssignments.length,
      bySubject: {},
      urgency: { past: 0, urgent: 0, upcoming: 0, planned: 0 },
      impactOnGrades: "Unknown",
    };
  }
};

/**
 * Calculate enhanced grade metrics
 */
const calculateEnhancedGradeMetrics = (grades) => {
  try {
    if (!grades || !grades.semesterGrades) {
      return {
        gradeDistribution: {},
        predictedFinalGrade: "N/A",
        improvementAreas: [],
        gpa: "N/A",
      };
    }

    // Extract all grades
    const allGrades = [];
    const gradesBySubject = {};
    const gradeDistribution = {
      "90-100": 0,
      "80-89": 0,
      "70-79": 0,
      "60-69": 0,
      "Below 60": 0,
    };

    grades.semesterGrades.forEach((semester) => {
      semester.grades.forEach((subject) => {
        // Process midterm grades
        if (subject.midterm && subject.midterm.examGrade !== null) {
          const grade = subject.midterm.examGrade;
          const maxGrade = subject.midterm.finalDegree || 100;
          const percentage = (grade / maxGrade) * 100;

          allGrades.push({
            subject: subject.subjectName,
            exam: "Midterm",
            semester: semester.semester,
            grade: percentage,
          });

          if (!gradesBySubject[subject.subjectName]) {
            gradesBySubject[subject.subjectName] = [];
          }
          gradesBySubject[subject.subjectName].push({
            exam: "Midterm",
            semester: semester.semester,
            grade: percentage,
          });

          // Update grade distribution
          updateGradeDistribution(gradeDistribution, percentage);
        }

        // Process final grades
        if (subject.final && subject.final.examGrade !== null) {
          const grade = subject.final.examGrade;
          const maxGrade = subject.final.finalDegree || 100;
          const percentage = (grade / maxGrade) * 100;

          allGrades.push({
            subject: subject.subjectName,
            exam: "Final",
            semester: semester.semester,
            grade: percentage,
          });

          if (!gradesBySubject[subject.subjectName]) {
            gradesBySubject[subject.subjectName] = [];
          }
          gradesBySubject[subject.subjectName].push({
            exam: "Final",
            semester: semester.semester,
            grade: percentage,
          });

          // Update grade distribution
          updateGradeDistribution(gradeDistribution, percentage);
        }
      });
    });

    // Identify subjects needing improvement (below 70%)
    const improvementAreas = [];
    Object.entries(gradesBySubject).forEach(([subject, grades]) => {
      const latestGrade = grades[grades.length - 1];
      if (latestGrade && latestGrade.grade < 70) {
        improvementAreas.push({
          subject,
          currentGrade: latestGrade.grade.toFixed(2),
          recommendedAction:
            latestGrade.grade < 60
              ? "Urgent tutoring needed"
              : "Additional practice recommended",
        });
      }
    });

    // Calculate predicted final grade based on current performance
    const predictedFinalGrade = calculatePredictedGrade(allGrades);

    // Calculate approximate GPA (4.0 scale)
    const gpa = calculateApproximateGPA(allGrades);

    return {
      gradeDistribution,
      predictedFinalGrade,
      improvementAreas,
      gpa,
    };
  } catch (error) {
    console.error("Error calculating enhanced grade metrics:", error);
    return {
      gradeDistribution: {},
      predictedFinalGrade: "N/A",
      improvementAreas: [],
      gpa: "N/A",
    };
  }
};

/**
 * Update grade distribution counters
 */
const updateGradeDistribution = (distribution, grade) => {
  if (grade >= 90) {
    distribution["90-100"]++;
  } else if (grade >= 80) {
    distribution["80-89"]++;
  } else if (grade >= 70) {
    distribution["70-79"]++;
  } else if (grade >= 60) {
    distribution["60-69"]++;
  } else {
    distribution["Below 60"]++;
  }
};

/**
 * Calculate predicted final grade
 */
const calculatePredictedGrade = (grades) => {
  if (!grades || grades.length === 0) return "N/A";

  // Weight recent grades more heavily
  const weightedTotal = grades.reduce((sum, grade, index) => {
    const weight = index + 1; // Gives more weight to later grades
    return sum + grade.grade * weight;
  }, 0);

  const weightSum = grades.reduce((sum, _, index) => sum + (index + 1), 0);
  const predictedGrade = weightedTotal / weightSum;

  return predictedGrade.toFixed(2);
};

/**
 * Calculate approximate GPA on a 4.0 scale
 */
const calculateApproximateGPA = (grades) => {
  if (!grades || grades.length === 0) return "N/A";

  const gpaPoints = grades.map((grade) => {
    const percentage = grade.grade;
    if (percentage >= 90) return 4.0;
    if (percentage >= 80) return 3.0;
    if (percentage >= 70) return 2.0;
    if (percentage >= 60) return 1.0;
    return 0.0;
  });

  const gpaSum = gpaPoints.reduce((sum, points) => sum + points, 0);
  return (gpaSum / gpaPoints.length).toFixed(2);
};

/**
 * Calculate performance trends
 */
const calculatePerformanceTrends = (grades, completedExams) => {
  try {
    // Extract chronological exam performance data
    const examData = [];

    // Process completed exams
    completedExams.forEach((subjectExams) => {
      subjectExams.exams.forEach((exam) => {
        // Create timestamp for sorting
        const examDate = new Date(exam.examDate);
        examData.push({
          subject: subjectExams.subjectName,
          title: exam.examTitle,
          date: exam.examDate,
          timestamp: examDate.getTime(),
          percentage: exam.percentage,
          type: "exam",
        });
      });
    });

    // Process grade data
    grades.semesterGrades.forEach((semester) => {
      semester.grades.forEach((subject) => {
        if (subject.midterm && subject.midterm.examGrade !== null) {
          const percentage =
            (subject.midterm.examGrade / (subject.midterm.finalDegree || 100)) *
            100;
          examData.push({
            subject: subject.subjectName,
            title: `${semester.semester} Midterm`,
            date: null, // We don't have exact dates for these
            timestamp: 0, // Will sort these first
            percentage,
            type: "midterm",
          });
        }

        if (subject.final && subject.final.examGrade !== null) {
          const percentage =
            (subject.final.examGrade / (subject.final.finalDegree || 100)) *
            100;
          examData.push({
            subject: subject.subjectName,
            title: `${semester.semester} Final`,
            date: null,
            timestamp: 1, // Will sort these after midterms
            percentage,
            type: "final",
          });
        }
      });
    });

    // Sort data chronologically
    examData.sort((a, b) => a.timestamp - b.timestamp);

    // Calculate trend line (simple linear regression)
    const trend = calculateTrendLine(examData);

    // Calculate performance by month if we have dated exams
    const monthlyPerformance = {};
    const datedExams = examData.filter((item) => item.date);

    datedExams.forEach((exam) => {
      const date = new Date(exam.date);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!monthlyPerformance[monthYear]) {
        monthlyPerformance[monthYear] = {
          count: 0,
          total: 0,
          average: 0,
        };
      }

      monthlyPerformance[monthYear].count++;
      monthlyPerformance[monthYear].total += exam.percentage;
      monthlyPerformance[monthYear].average =
        monthlyPerformance[monthYear].total /
        monthlyPerformance[monthYear].count;
    });

    return {
      trendDirection:
        trend.slope > 0
          ? "improving"
          : trend.slope < 0
          ? "declining"
          : "stable",
      trendStrength:
        Math.abs(trend.slope) > 5
          ? "strong"
          : Math.abs(trend.slope) > 2
          ? "moderate"
          : "weak",
      trendSlope: trend.slope.toFixed(2),
      monthlyPerformance,
      recentPerformance: examData.slice(-3).map((item) => ({
        subject: item.subject,
        title: item.title,
        percentage: item.percentage.toFixed(2),
      })),
    };
  } catch (error) {
    console.error("Error calculating performance trends:", error);
    return {
      trendDirection: "unknown",
      trendStrength: "unknown",
      monthlyPerformance: {},
      recentPerformance: [],
    };
  }
};

/**
 * Calculate trend line using simple linear regression
 */
const calculateTrendLine = (data) => {
  if (!data || data.length < 2) {
    return { slope: 0, intercept: 0 };
  }

  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  // X is the index (time), Y is the score percentage
  data.forEach((item, index) => {
    const x = index;
    const y = item.percentage;

    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  });

  // Calculate slope and intercept
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

/**
 * Calculate academic standing
 */
const calculateAcademicStanding = (gradeMetrics, examMetrics) => {
  try {
    // Define score thresholds
    const thresholds = {
      excellent: 85,
      good: 75,
      average: 65,
      belowAverage: 55,
      poor: 0,
    };

    // Get average grades
    const predictedGrade = parseFloat(gradeMetrics.predictedFinalGrade) || 0;
    const examPassRate = parseFloat(examMetrics.summary.examPassRate) || 0;
    const overallScore = parseFloat(examMetrics.summary.overallScore) || 0;

    // Calculate weighted score (you can adjust weights as needed)
    const weightedScore =
      predictedGrade * 0.5 + examPassRate * 0.3 + overallScore * 0.2;

    // Determine standing based on weighted score
    let standing;
    if (weightedScore >= thresholds.excellent) {
      standing = "Excellent";
    } else if (weightedScore >= thresholds.good) {
      standing = "Good";
    } else if (weightedScore >= thresholds.average) {
      standing = "Average";
    } else if (weightedScore >= thresholds.belowAverage) {
      standing = "Below Average";
    } else {
      standing = "Needs Improvement";
    }

    // Generate recommendations based on standing and improvement areas
    const recommendations = generateRecommendations(
      standing,
      gradeMetrics.improvementAreas
    );

    return {
      standing,
      score: weightedScore.toFixed(2),
      recommendations,
    };
  } catch (error) {
    console.error("Error calculating academic standing:", error);
    return {
      standing: "Unknown",
      score: "N/A",
      recommendations: [],
    };
  }
};

/**
 * Generate recommendations based on academic standing
 */
const generateRecommendations = (standing, improvementAreas) => {
  const recommendations = [];

  // Generic recommendations based on standing
  if (standing === "Excellent") {
    recommendations.push("Continue with current study habits");
    recommendations.push("Consider advanced learning opportunities");
  } else if (standing === "Good") {
    recommendations.push("Focus on maintaining consistent study schedule");
    recommendations.push("Review past exam mistakes to identify patterns");
  } else if (standing === "Average") {
    recommendations.push("Increase study time for challenging subjects");
    recommendations.push("Consider forming study groups");
    recommendations.push("Utilize teacher office hours for extra help");
  } else if (standing === "Below Average" || standing === "Needs Improvement") {
    recommendations.push("Create a structured daily study plan");
    recommendations.push("Seek tutoring for difficult subjects");
    recommendations.push("Schedule weekly check-ins with teachers");
    recommendations.push(
      "Focus on foundational concepts before advanced topics"
    );
  }

  // Add specific recommendations based on improvement areas
  if (improvementAreas && improvementAreas.length > 0) {
    improvementAreas.forEach((area) => {
      recommendations.push(
        `Focus additional attention on ${area.subject} (current grade: ${area.currentGrade}%)`
      );
    });
  }

  return recommendations;
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
