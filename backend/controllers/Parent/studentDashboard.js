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
const studentService = require("../../services/studentService");
const academicService = require("../../services/academicYearService");
const questionService = require("../../services/questionBankService");
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

    const numberOfAbsentDays = await getNumberOfAbsentDays(studentId);
    const completedExams = await getCompletedExams(studentId, authToken);
    const missedExams = await getMissedExams(studentId, authToken);
    const completedAssignments = await getCompletedAssignments(
      studentId,
      authToken
    );
    const missedAssignments = await getMissedAssignments(studentId, authToken);
    const grades = await getStudentGradesReport(studentId);

    const gradeId = await studentService.getStudentGradeId(studentId);
    const academicYear = await academicService.getCurrentAcademicYear();
    const currentSemester = await academicService.getCurrentSemester(
      academicYear._id
    );

    const questions =
      await questionService.getQuestionsByGradeAndSemesterWithStatus(
        gradeId,
        currentSemester._id,
        studentId
      );
    const materialsStates = (await getMaterialsForGrade(studentId))
      .studentStats;
    const virtualRoomsStates = await getAllCompletedVirtualRoomsForAllSubjects(
      studentId
    );

    const attendanceMetrics = await calculateAttendanceMetrics(
      studentId,
      numberOfAbsentDays
    );
    const examMetrics = calculateExamMetrics(completedExams, missedExams);
    const assignmentMetrics = calculateAssignmentMetrics(
      completedAssignments,
      missedAssignments
    );
    const enhancedGradeMetrics = calculateEnhancedGradeMetrics(grades);
    const performanceTrends = calculatePerformanceTrends(
      grades,
      completedExams
    );
    const academicStanding = calculateAcademicStanding(
      enhancedGradeMetrics,
      examMetrics
    );
    const questionMetrics = calculateQuestionMetrics(questions);
    res.status(200).json({
      status: 200,
      message: "Dashboard data fetched successfully",
      data: {
        studentData,
        materialsStates,
        numberOfAbsentDays,
        completedExams,
        missedExams,
        completedAssignments,
        missedAssignments,
        questions,
        grades,
        virtualRoomsStates,
        dashboardMetrics: {
          attendance: attendanceMetrics,
          exams: examMetrics,
          assignments: assignmentMetrics,
          questions: questionMetrics,
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
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 8, 1);

    const monthsDiff =
      currentDate.getMonth() -
      startDate.getMonth() +
      12 * (currentDate.getFullYear() - startDate.getFullYear());
    const totalSchoolDays = monthsDiff * 20;

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

const determineAttendanceStatus = (absentDays, totalDays) => {
  const absenceRate = (absentDays / totalDays) * 100;

  if (absenceRate < 5) return "Excellent";
  if (absenceRate < 10) return "Good";
  if (absenceRate < 15) return "Average";
  if (absenceRate < 20) return "Below Average";
  return "Poor";
};

const calculateExamMetrics = (completedExams, missedExams) => {
  try {
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

      if (examsBySubject[subject].taken > 0) {
        examsBySubject[subject].averageScore = (
          (examsBySubject[subject].totalScore /
            examsBySubject[subject].totalPossible) *
          100
        ).toFixed(2);
      }
    });

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

const calculateAssignmentMetrics = (
  completedAssignments,
  missedAssignments
) => {
  try {
    const totalCompleted = completedAssignments.length || 0;
    const totalMissed = missedAssignments.length || 0;
    const totalAssignments = totalCompleted + totalMissed;

    const completionRate =
      totalAssignments > 0
        ? ((totalCompleted / totalAssignments) * 100).toFixed(2)
        : 0;

    let totalScore = 0;
    let totalPossibleScore = 0;
    let highestScore = 0;
    let lowestScore = 100;

    const bySubject = {};

    completedAssignments.forEach((assignment) => {
      const subject = assignment.subject_id?.subjectName;
      const score = assignment.score || 0;
      const totalMarks = assignment.total_marks || 100;
      const scorePercentage = (score / totalMarks) * 100;

      totalScore += score;
      totalPossibleScore += totalMarks;

      highestScore = Math.max(highestScore, scorePercentage);
      lowestScore = Math.min(lowestScore, scorePercentage);

      if (subject) {
        if (!bySubject[subject]) {
          bySubject[subject] = {
            completed: 0,
            missed: 0,
            totalScore: 0,
            totalPossible: 0,
            averageScore: 0,
            completionRate: 0,
          };
        }

        bySubject[subject].completed++;
        bySubject[subject].totalScore += score;
        bySubject[subject].totalPossible += totalMarks;
      }
    });

    missedAssignments.forEach((assignment) => {
      const subject = assignment.subject_id?.subjectName;
      const totalMarks = assignment.total_marks || 0;

      if (subject) {
        if (!bySubject[subject]) {
          bySubject[subject] = {
            completed: 0,
            missed: 0,
            totalScore: 0,
            totalPossible: 0,
            averageScore: 0,
            completionRate: 0,
          };
        }

        bySubject[subject].missed++;
        bySubject[subject].totalPossible += totalMarks;
      }
    });

    Object.keys(bySubject).forEach((subject) => {
      const subjectData = bySubject[subject];
      const total = subjectData.completed + subjectData.missed;

      subjectData.averageScore =
        subjectData.totalPossible > 0
          ? (
              (subjectData.totalScore / subjectData.totalPossible) *
              100
            ).toFixed(2)
          : 0;

      subjectData.completionRate =
        total > 0 ? ((subjectData.completed / total) * 100).toFixed(2) : 0;
    });

    const averageScore =
      totalPossibleScore > 0
        ? ((totalScore / totalPossibleScore) * 100).toFixed(2)
        : 0;

    const now = new Date();
    const urgencyCategories = {
      past: 0,
      urgent: 0,
      upcoming: 0,
      planned: 0,
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

    const assignmentTypes = {
      homework: 0,
      project: 0,
      quiz: 0,
      other: 0,
    };

    [...completedAssignments, ...missedAssignments].forEach((assignment) => {
      const type = assignment.assignment_type?.toLowerCase() || "other";

      if (type.includes("homework")) {
        assignmentTypes.homework++;
      } else if (type.includes("project")) {
        assignmentTypes.project++;
      } else if (type.includes("quiz")) {
        assignmentTypes.quiz++;
      } else {
        assignmentTypes.other++;
      }
    });

    const submissionTimings = {
      early: 0,
      onTime: 0,
      late: 0,
    };

    completedAssignments.forEach((assignment) => {
      if (assignment.submission_date && assignment.due_date) {
        const submitted = new Date(assignment.submission_date);
        const due = new Date(assignment.due_date);
        const daysDifference = Math.floor(
          (due - submitted) / (1000 * 60 * 60 * 24)
        );

        if (daysDifference > 1) {
          submissionTimings.early++;
        } else if (daysDifference >= 0) {
          submissionTimings.onTime++;
        } else {
          submissionTimings.late++;
        }
      }
    });

    const impactLevel =
      totalMissed > 5 ? "High" : totalMissed > 2 ? "Medium" : "Low";

    const potentialPointsLost = missedAssignments.reduce(
      (sum, assignment) => sum + (assignment.total_marks || 0),
      0
    );

    const recentAssignments = completedAssignments
      .sort((a, b) => new Date(b.submission_date) - new Date(a.submission_date))
      .slice(0, 5)
      .map((assignment) => ({
        title: assignment.title || "Unnamed Assignment",
        subject: assignment.subject_id?.subjectName || "Unknown Subject",
        score: assignment.score || 0,
        totalMarks: assignment.total_marks || 100,
        percentage: ((assignment.score / assignment.total_marks) * 100).toFixed(
          2
        ),
      }));

    return {
      summary: {
        totalAssignments,
        totalCompleted,
        totalMissed,
        completionRate,
        averageScore,
        highestScore: highestScore.toFixed(2),
        lowestScore: lowestScore === 100 ? "N/A" : lowestScore.toFixed(2),
        potentialPointsLost,
      },
      bySubject,
      urgency: urgencyCategories,
      submissionTimings,
      assignmentTypes,
      impactOnGrades: {
        level: impactLevel,
        potentialPointsLost,
      },
      recentPerformance: recentAssignments,
    };
  } catch (error) {
    console.error("Error calculating assignment metrics:", error);
    return {
      summary: {
        totalAssignments: 0,
        totalCompleted: 0,
        totalMissed: 0,
        completionRate: 0,
        averageScore: 0,
      },
      bySubject: {},
      urgency: { past: 0, urgent: 0, upcoming: 0, planned: 0 },
      submissionTimings: { early: 0, onTime: 0, late: 0 },
      assignmentTypes: { homework: 0, project: 0, quiz: 0, other: 0 },
      impactOnGrades: { level: "Unknown", potentialPointsLost: 0 },
      recentPerformance: [],
    };
  }
};

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

          updateGradeDistribution(gradeDistribution, percentage);
        }

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

          updateGradeDistribution(gradeDistribution, percentage);
        }
      });
    });

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

    const predictedFinalGrade = calculatePredictedGrade(allGrades);

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

const calculatePredictedGrade = (grades) => {
  if (!grades || grades.length === 0) return "N/A";

  const weightedTotal = grades.reduce((sum, grade, index) => {
    const weight = index + 1;
    return sum + grade.grade * weight;
  }, 0);

  const weightSum = grades.reduce((sum, _, index) => sum + (index + 1), 0);
  const predictedGrade = weightedTotal / weightSum;

  return predictedGrade.toFixed(2);
};

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

const calculatePerformanceTrends = (grades, completedExams) => {
  try {
    const examData = [];

    completedExams.forEach((subjectExams) => {
      subjectExams.exams.forEach((exam) => {
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

    grades.semesterGrades.forEach((semester) => {
      semester.grades.forEach((subject) => {
        if (subject.midterm && subject.midterm.examGrade !== null) {
          const percentage =
            (subject.midterm.examGrade / (subject.midterm.finalDegree || 100)) *
            100;
          examData.push({
            subject: subject.subjectName,
            title: `${semester.semester} Midterm`,
            date: null,
            timestamp: 0,
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
            timestamp: 1,
            percentage,
            type: "final",
          });
        }
      });
    });

    examData.sort((a, b) => a.timestamp - b.timestamp);

    const trend = calculateTrendLine(examData);

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

const calculateTrendLine = (data) => {
  if (!data || data.length < 2) {
    return { slope: 0, intercept: 0 };
  }

  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  data.forEach((item, index) => {
    const x = index;
    const y = item.percentage;

    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

const calculateAcademicStanding = (gradeMetrics, examMetrics) => {
  try {
    const thresholds = {
      excellent: 85,
      good: 75,
      average: 65,
      belowAverage: 55,
      poor: 0,
    };

    const predictedGrade = parseFloat(gradeMetrics.predictedFinalGrade) || 0;
    const examPassRate = parseFloat(examMetrics.summary.examPassRate) || 0;
    const overallScore = parseFloat(examMetrics.summary.overallScore) || 0;

    const weightedScore =
      predictedGrade * 0.5 + examPassRate * 0.3 + overallScore * 0.2;

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

const generateRecommendations = (standing, improvementAreas) => {
  const recommendations = [];

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
const getCompletedAssignments = async (student_id, authToken) => {
  try {
    const studentData = await student.findById(student_id);
    if (!studentData) {
      throw new Error("Student not found");
    }

    const semester_id = await nowSemesterId(studentData.academicYear_id);
    if (!semester_id) {
      throw new Error("Could not determine current semester");
    }

    const response = await axios.post(
      `${process.env.EXAMS_SERVICE_URL}/assignments/completedAssignments`,
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
    console.error("Error fetching completed assignments:", error.message);
    throw new Error("Failed to fetch completed assignments");
  }
};

const calculateQuestionMetrics = (questions) => {
  try {
    const totalQuestions = questions.length;
    const bookmarkedCount = questions.filter((q) => q.isBookmarked).length;
    const viewedCount = questions.filter((q) => q.isViewed).length;

    const completionRate =
      totalQuestions > 0
        ? ((viewedCount / totalQuestions) * 100).toFixed(2)
        : 0;
    const bookmarkedRate =
      totalQuestions > 0
        ? ((bookmarkedCount / totalQuestions) * 100).toFixed(2)
        : 0;

    const typeDistribution = questions.reduce((acc, q) => {
      const type = q.questionType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const subjectDistribution = questions.reduce((acc, q) => {
      const subject = q.subjectId?.subjectName || "Unknown";
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {});

    const recentActivity = questions
      .filter((q) => q.isViewed || q.isBookmarked)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
      .map((q) => ({
        questionId: q._id,
        type: q.questionType,
        subject: q.subjectId?.subjectName || "Unknown",
        isBookmarked: q.isBookmarked,
        isViewed: q.isViewed,
        lastInteraction: q.updatedAt,
      }));

    return {
      summary: {
        totalQuestions,
        bookmarkedCount,
        viewedCount,
        unviewedCount: totalQuestions - viewedCount,
        completionRate,
        bookmarkedRate,
      },
      typeDistribution,
      subjectDistribution,
      recentActivity,
      engagementScore: calculateEngagementScore(questions),
    };
  } catch (error) {
    console.error("Error calculating question metrics:", error);
    return {
      summary: {
        totalQuestions: 0,
        bookmarkedCount: 0,
        viewedCount: 0,
        completionRate: 0,
        bookmarkedRate: 0,
      },
      typeDistribution: {},
      subjectDistribution: {},
      recentActivity: [],
    };
  }
};

const calculateEngagementScore = (questions) => {
  const viewedWeight = 0.6;
  const bookmarkedWeight = 0.4;
  const maxPossible = questions.length * (viewedWeight + bookmarkedWeight);

  const score = questions.reduce((sum, q) => {
    let questionScore = 0;
    if (q.isViewed) questionScore += viewedWeight;
    if (q.isBookmarked) questionScore += bookmarkedWeight;
    return sum + questionScore;
  }, 0);

  return maxPossible > 0 ? ((score / maxPossible) * 100).toFixed(2) : 0;
};
module.exports = {
  getDashboardData,
};
