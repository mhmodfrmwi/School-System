import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Base and Admin titles
    const baseTitles = {
      "/onboarding": "Onboarding | Learnova",
      "/login": "Login | Learnova",
      "/role": "Role | Learnova",
      "/admin/dashboard": "Dashboard",
      "/admin/basicform": "Basic Form",
      "/admin/studentform": "Student Form",
      "/admin/allstudent": "All Students",
      "/admin/managerform": "Manager Form",
      "/admin/allmanagers": "All Managers",
      "/admin/parentform": "Parent Form",
      "/admin/allparents": "All Parents",
      "/admin/scheduleform": "Schedule Form",
      "/admin/allschedules": "All Schedules",
      "/admin/allTerms": "All Terms",
      "/admin/termform": "Term Form",
      "/admin/allteachers": "All Teachers",
      "/admin/teacherform": "Teacher Form",
      "/admin/allacademicyears": "All Academic Years",
      "/admin/academicyearform": "Academic Year Form",
      "/admin/allgrades": "All Grades",
      "/admin/gradeform": "Grade Form",
      "/admin/assigngrade": "Assign Grade",
      "/admin/allsubjects": "All Subjects",
      "/admin/addsubject": "Add Subject",
      "/admin/assignSubject": "Assign Subject",
      "/admin/edit-admin-profile": "Edit Admin Profile",
      "/admin/teacherinfo": "Teacher Info",
      "/admin/classteacherform": "Class Teacher Form",
      "/admin/allclassteacher": "All Class Teachers",
      "/admin/adminform": "Admin Form",
      "/admin/alladmins": "All Admins",
    };

    // Titles for teacher
    const teacherTitles = {
      "/teacher/dashboard": "Dashboard",
      "/teacher/edit-teacher-profile": "Edit Teacher Profile",
      "/teacher/school-hubs": "School Hubs",
      "/teacher/school-hubs/detailes/:id": "School Hub Details",
      "/teacher/school-hubs/prizes/:id": "School Hub Prizes",
      "/teacher/contests": "Contests",
      "/teacher/contests/participants/:contestId": "Contest Participants",
      "/teacher/contests/activity-form": "Contest Activity Form",
      "/teacher/contests/edit-activity-form/:id": "Edit Contest Activity Form",
      "/teacher/weekly-schedule": "Weekly Schedule",
      "/teacher/exam-schedule": "Exam Schedule",
      "/teacher/currentcourse": "Current Course",
      "/teacher/allcourses": "All Courses",
      "/teacher/currentcourseforattendance": "Current Course for Attendance",
      "/teacher/allcoursesforattendance": "All Courses for Attendance",
      "/teacher/student-attendance-details/:id": "Student Attendance Details",
      "/teacher/materialform": "Material Form",
      "/teacher/addmaterial/:classId/:gradeSubjectSemesterId": "Add Material",
      "/teacher/question-bank-form/:gradeSubjectSemesterId":
        "Question Bank Form",
      "/teacher/my-question-bank/:gradeSubjectSemesterId/my-questions":
        "My Question Bank",
      "/teacher/all-question-bank/:gradeSubjectSemesterId/all-questions":
        "All Question Bank",
      "/teacher/my-all-question-bank/:gradeSubjectSemesterId/my-questions":
        "My All Question Bank",
      "/teacher/all-question-bank-allyears/:gradeSubjectSemesterId/all-questions":
        "All Question Bank All Years",
      "/teacher/edit-question/:questionId": "Edit Question",
      "/teacher/exam-form/:classId/:gradeSubjectSemesterId": "Exam Form",
      "/teacher/my-exams/:gradeSubjectSemesterId": "My Exams",
      "/teacher/exams/:examId": "Edit Exam",
      "/teacher/exam-details/:examId": "Exam Details",
      "/teacher/exam-results/:examId": "Exam Results",
      "/teacher/see-all-exams/:gradeSubjectSemesterId": "See All Exams",
      "/teacher/assignment-form/:classId/:gradeSubjectSemesterId":
        "Assignment Form",
      "/teacher/all-assignment/:gradeSubjectSemesterId": "All Assignments",
      "/teacher/assignment-submissions/:assignmentId": "Assignment Submissions",
      "/teacher/edit-assignment/:assignmentId": "Edit Assignment",
      "/teacher/submission-details/:submissionId": "Submission Details",
      "/teacher/see-all-assignments-allYears/:gradeSubjectSemesterId":
        "See All Assignments All Years",
      "/teacher/all-assignment-submissions/:assignmentId":
        "All Assignment Submissions",
      "/teacher/allmaterial/:classId/:gradeSubjectSemesterId": "All Material",
      "/teacher/materialform/:classId/:gradeSubjectSemesterId": "Material Form",
      "/teacher/see-material/:grade_subject_semester_id": "See Material",
      "/teacher/see-all-material/:grade_subject_semester_id":
        "See All Material",
      "/teacher/update-material/:materialId": "Update Material",
      "/teacher/takeattendance/:id": "Take Attendance",
      "/teacher/attendancereport/:id": "Attendance Report",
      "/teacher/virtual-room/:grade_subject_semester_id": "Virtual Room",
      "/teacher/all-virtual-room/:grade_subject_semester_id":
        "All Virtual Rooms",
      "/teacher/VR-form/:classId/:gradeSubjectSemesterId": "VR Form",
      "/teacher/edit-vr/:id": "Edit VR",
      "/teacher/library-form": "Library Form",
      "/teacher/all-subjects-library": "All Subjects Library",
      "/teacher/all-materials-library/:id": "All Materials Library",
      "/teacher/library-item-form": "Library Item Form",
      "/teacher/items-in-library": "Items in Library",
      "/teacher/item-in-library/:id": "Item in Library",
      "/teacher/update-item-library/:id": "Update Item Library",
      "/teacher/teacher-library": "Teacher Library",
      "/teacher/library/:type/:itemId": "Library Item Details",
      "/teacher/motivation": "Motivation",
      "/teacher/current-courses-for-grades": "Current Courses for Grades",
      "/teacher/exam-score/:classId/:gradeSubjectSemesterId/students":
        "Exam Score Students",
      "/teacher/exam-score/upload/:classId/:gradeSubjectSemesterId":
        "Upload Exam Scores",
      "/teacher/exam-results/:classId/:gradeSubjectSemesterId/:type":
        "Exam Results",
    };

    // Titles for student
    const studentTitles = {
      "/student/dashboard": "Dashboard",
      "/student/grades": "Grades",
      "/student/grades-for-semester": "Grades for Semester",
      "/student/grades-for-allyears": "Grades for All Years",
      "/student/schedule": "Schedule",
      "/student/schedule/exam": "Exam Schedule",
      "/student/library": "Library",
      "/student/librarybooks": "Library Books",
      "/student/libraryvideos": "Library Videos",
      "/student/library/:type/:itemId": "Library Item Details",
      "/student/motivation": "Motivation",
      "/student/edit-student-profile": "Edit Student Profile",
      "/student/activities/detailes/:id": "Activity Details",
      "/student/activities/prizes/:id": "Activity Prizes",
      "/student/activities/contests": "Contests",
      "/student/activities/contests/createteam/:contestId": "Create Team",
      "/student/activities/contests/teamdetails/:teamId": "Team Details",
      "/student/activities/contests/edit-team/:teamId": "Edit Team",
      "/student/activities": "Activities",
      "/student/allcourses": "All Courses",
      "/student/allcourses/videos/:subjectId": "Course Videos",
      "/student/allcourses/materials/:subjectId": "Course Materials",
      "/student/material-details/:subjectId/:materialId": "Material Details",
      "/student/allcourses/virtualrooms/:subjectId": "Virtual Rooms",
      "/student/allcourses/questionbank/:subjectId": "Question Bank",
      "/student/question-details/:subjectId/:questionId": "Question Details",
      "/student/allcourses/exams/:gradeSubjectSemesterId": "Exams",
      "/student/allcourses/exams/:gradeSubjectSemesterId/:examId": "Exam Page",
      "/student/allcourses/exams/:gradeSubjectSemesterId/result/:examId":
        "Exam Result",
      "/student/allcourses/assignments/:gradeSubjectSemesterId": "Assignments",
      "/student/allcourses/assignments/:gradeSubjectSemesterId/:assignmentId":
        "Assignment Page",
      "/student/allcourses/assignments/:gradeSubjectSemesterId/submission/:assignmentId":
        "Assignment Submission",
      "/student/attendance": "Attendance",
    };

    // Titles for manager
    const managerTitles = {
      "/manager/dashboard": "Dashboard",
      "/manager/edit-manager-profile": "Edit Manager Profile",
      "/manager/school-hubs": "School Hubs",
      "/manager/school-hubs/detailes/:id": "School Hub Details",
      "/manager/school-hubs/prizes/:id": "School Hub Prizes",
      "/manager/school-hubs/participants/:schoolHubId":
        "School Hub Participants",
      "/manager/add-school-hubs": "Add School Hub",
      "/manager/edit-school-hubs/:id": "Edit School Hub",
      "/manager/schedule-table": "Schedule Table",
      "/manager/schedule-form": "Schedule Form",
      "/manager/virtual-room": "Virtual Room",
      "/manager/virtual-room-form": "Virtual Room Form",
      "/manager/grade": "Grade",
    };

    const titles = {
      ...baseTitles,
      ...teacherTitles,
      ...studentTitles,
      ...managerTitles,
    };

    const getTitleFromPath = (path) => {
      if (titles[path]) {
        return titles[path];
      }

      for (const [key, value] of Object.entries(titles)) {
        if (key.includes(":")) {
          const regexPattern = key.replace(/:\w+/g, "[^/]+");
          const regex = new RegExp(`^${regexPattern}$`);
          if (regex.test(path)) {
            return value;
          }
        }
      }

      return "Learnova";
    };

    const title = getTitleFromPath(location.pathname);

    document.title = title;
  }, [location.pathname]);

  return null;
}

export default TitleUpdater;
