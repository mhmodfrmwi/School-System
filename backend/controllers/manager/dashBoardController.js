const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const Teacher = require("../../DB/teacher");
const Student = require("../../DB/student");
const Parent = require("../../DB/Parent");
const Admin = require("../../DB/Admin");
const Manager = require("../../DB/managerModel");
const Score = require("../../DB/scoreModel");
const SubjectScore = require("../../DB/subjectScoreModel");
const AcademicYear = require("../../DB/academicYearModel");
const Semester = require("../../DB/semesterModel");
const Grade = require("../../DB/gradeModel");
const Attendance = require("../../DB/attendenceModel");
const RewardClaim = require("../../DB/rewardClaimModel");
const UserPoint = require("../../DB/userPointModel"); 
const Sehedule = require("../../DB/schedule")

const getStatistics = expressAsyncHandler(async (req, res) => {
  try {
    const studentCount = await Student.countDocuments({});
    const teacherCount = await Teacher.countDocuments({});
    const parentCount = await Parent.countDocuments({});
    const seheduleCount = await Sehedule.countDocuments({});

    const totalUsers = studentCount + teacherCount + parentCount ;

    const studentPercentage = ((studentCount / totalUsers) * 100).toFixed(2);
    const teacherPercentage = ((teacherCount / totalUsers) * 100).toFixed(2);
    const parentPercentage = ((parentCount / totalUsers) * 100).toFixed(2);

    const studentGenderCounts = await Student.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);
    const teacherGenderCounts = await Teacher.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);

    const studentGirls = studentGenderCounts.find((g) => g._id === "F")?.count || 0;
    const studentBoys = studentGenderCounts.find((g) => g._id === "M")?.count || 0;
    const studentTotal = studentGirls + studentBoys;
    const studentGirlsPercentage = ((studentGirls / studentTotal) * 100).toFixed(2);
    const studentBoysPercentage = ((studentBoys / studentTotal) * 100).toFixed(2);

    const teacherGirls = teacherGenderCounts.find((g) => g._id === "F")?.count || 0;
    const teacherBoys = teacherGenderCounts.find((g) => g._id === "M")?.count || 0;
    const teacherTotal = teacherGirls + teacherBoys;
    const teacherGirlsPercentage = ((teacherGirls / teacherTotal) * 100).toFixed(2);
    const teacherBoysPercentage = ((teacherBoys / teacherTotal) * 100).toFixed(2);

    res.status(200).json({
      status: 200,
      message: "Statistics retrieved successfully",
      success: true,
      data: {
        counts: {
            students: studentCount,
            teachers: teacherCount,
            parents: parentCount,
            sehedule:seheduleCount,
        },
        genderPercentages: {
          students: {
            girls: studentGirlsPercentage,
            boys: studentBoysPercentage,
          },
          teachers: {
            girls: teacherGirlsPercentage,
            boys: teacherBoysPercentage,
          },
        },
        categoryPercentages: {
          students: studentPercentage,
          teachers: teacherPercentage,
          parents: parentPercentage,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
});

const getGradeStatistics = expressAsyncHandler(async (req, res) => {
    try {
      const currentYear = moment().year().toString().slice(-2);
      const currentMonth = moment().month() + 1;
      let startYear, endYear;
      if (currentMonth >= 9 && currentMonth <= 12) {
        startYear = "20" + parseInt(currentYear);
        endYear = "20" + (parseInt(currentYear) + 1);
      } else {
        startYear = "20" + (parseInt(currentYear) - 1);
        endYear = "20" + parseInt(currentYear);
      }
  
      let semester_name;
      if (currentMonth >= 9 && currentMonth <= 12) {
        semester_name = "Semester 1";
      } else {
        semester_name = "Semester 2";
      }

      const academic_year = await AcademicYear.findOne({ startYear, endYear });
      if (!academic_year) {
        return res.status(404).json({
          status: 404,
          message: "Academic year not found",
        });
      }
      const academicYearId = academic_year._id;

      const semester = await Semester.findOne({
        semesterName: semester_name,
        academicYear_id: academicYearId,
      });
      if (!semester) {
        return res.status(404).json({
          status: 404,
          message: "Semester not found in the given academic year",
        });
      }
      const semesterId = semester._id;

      const grades = await Grade.find({});
  
      const gradeStatistics = [];
  
      for (const grade of grades) {
        const gradeId = grade._id;

        const students = await Student.find({ gradeId });
  
        let passedStudents = 0;
        let failedStudents = 0;
  
        for (const student of students) {
          const studentId = student._id;

          const scores = await Score.find({
            studentId,
            academicYearId,
            classId: student.classId,
          }).populate({
            path: "subjectScoreId",
            match: { semesterId },
          });

          const validScores = scores.filter((score) => score.subjectScoreId !== null);

          const scoresBySubject = {};
          for (const score of validScores) {
            const subjectId = score.subjectScoreId.subjectId.toString();
            if (!scoresBySubject[subjectId]) {
              scoresBySubject[subjectId] = [];
            }
            scoresBySubject[subjectId].push(score);
          }
  
          let passedAllSubjects = true;

          for (const subjectId in scoresBySubject) {
            const subjectScores = scoresBySubject[subjectId];

            const totalExamGrade = subjectScores.reduce((sum, score) => sum + score.examGrade, 0);

            const totalFinalDegree = subjectScores.reduce(
              (sum, score) => sum + score.subjectScoreId.finalDegree,
              0
            );

            if (totalExamGrade < totalFinalDegree) {
              passedAllSubjects = false;
              break;
            }
          }
  
          if (passedAllSubjects) {
            passedStudents++;
          } else {
            failedStudents++;
          }
        }
  
        const totalStudentsInGrade = students.length;
        const passedPercentage = ((passedStudents / totalStudentsInGrade) * 100).toFixed(2);
        const failedPercentage = ((failedStudents / totalStudentsInGrade) * 100).toFixed(2);
  
        gradeStatistics.push({
          grade: grade.gradeName,
          passedPercentage,
          failedPercentage,
        });
      }

      res.status(200).json({
        status: 200,
        message: "Grade statistics retrieved successfully",
        success: true,
        data: gradeStatistics,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Failed to calculate grade statistics",
        error: error.message,
      });
    }
});

const getDailyAttendancePercentage = expressAsyncHandler(async (req, res) => {
    try {
      const currentDate = moment().startOf("day").toDate();
  
      const grades = await Grade.find({});
  
      const attendanceStatistics = [];
  
      for (const grade of grades) {
        const gradeId = grade._id;
  
        const students = await Student.find({ gradeId });
  
        let presentCount = 0;
        let absentCount = 0;
  
        for (const student of students) {
          const studentId = student._id;
  
          const attendance = await Attendance.findOne({
            student_id: studentId,
            date: currentDate,
          });
  
          if (attendance) {
            if (attendance.status === "P") {
              presentCount++;
            } else if (attendance.status === "A") {
              absentCount++;
            }
          } else {
            absentCount++;
          }
        }
  
        const totalStudentsInGrade = students.length;
        const presentPercentage = ((presentCount / totalStudentsInGrade) * 100).toFixed(2);
        const absentPercentage = ((absentCount / totalStudentsInGrade) * 100).toFixed(2);
  
        attendanceStatistics.push({
          grade: grade.gradeName,
          presentPercentage,
          absentPercentage,
        });
      }
  
      res.status(200).json({
        status: 200,
        message: "Daily attendance statistics retrieved successfully",
        success: true,
        data: attendanceStatistics,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Failed to calculate daily attendance statistics",
        error: error.message,
      });
    }
});

const getTop10Students = expressAsyncHandler(async (req, res) => {
    try {
        const students = await Student.find({}).populate("gradeId");

        const studentsWithPoints = await Promise.all(
        students.map(async (student) => {
            const rewards = await RewardClaim.find({
            userId: student._id,
            userType: "Student",
            }).populate("rewardId");

            let totalPoints = 0;
            rewards.forEach((rewardClaim) => {
            if (rewardClaim.rewardId && rewardClaim.value) {
                if (rewardClaim.rewardType === "add") {
                totalPoints += rewardClaim.value;
                } else if (rewardClaim.rewardType === "subtract") {
                totalPoints -= rewardClaim.value;
                }
            }
            });

            const userPoint = await UserPoint.findOne({
            userId: student._id,
            userType: "Student",
            });

            const badge = userPoint ? userPoint.badges : "Green";

            return {
            _id: student._id,
            fullName: student.fullName,
            academic_number: student.academic_number,
            email: student.email,
            grade: student.gradeId.gradeName,
            totalPoints,
            badge,
            };
        })
        );

        studentsWithPoints.sort((a, b) => b.totalPoints - a.totalPoints);

        const top10Students = studentsWithPoints.slice(0, 10);

        res.status(200).json({
        status: 200,
        success: true,
        message: "Top 10 students fetched successfully",
        data: top10Students,
        });
    } catch (error) {
        console.error("Error fetching top 10 students:", error);
        res.status(500).json({
        status: 500,
        success: false,
        message: "Failed to fetch top 10 students",
        error: error.message,
        });
    }
});

module.exports = {
  getStatistics,
  getGradeStatistics,
  getDailyAttendancePercentage,
  getTop10Students
};