import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/onboarding": "Onboarding | Learnova",
      "/login": "Login | Learnova",
      "/role": "Role | Learnova",
      "/admin/dashboard": "Dashboard",
      "/teacher/dashboard": "Dashboard",
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
      "/teacher/edit-teacher-profile": "Edit Teacher Profile",
      "/teacher/school-hubs": "School Hubs",
      "/teacher/school-hubs/detailes": "School Hub Details",
      "/teacher/school-hubs/prizes": "School Hub Prizes",
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
      "/teacher/materialform/:classId/:gradeSubjectSemesterId": "Material Form",
      "/teacher/see-material/:grade_subject_semester_id": "View Material",
      "/teacher/update-material/:materialId": "Update Material",
      "/teacher/takeattendance/:id": "Take Attendance",
      "/teacher/attendancereport/:id": "Attendance Report",
      "/teacher/virtual-room/:grade_subject_semester_id": "Virtual Room",
      "/teacher/VR-form/:classId/:gradeSubjectSemesterId": "VR Form",
      "/teacher/edit-vr/:id": "Edit VR",
      "/teacher/library-form": "Library Form",
      "/teacher/all-subjects-library": "All Subjects Library",
      "/teacher/all-materials-library/:id": "All Materials Library",
    };

    let title = titles[location.pathname] || "";

    if (!title) {
      const pathSegments = location.pathname.split("/");
      const editPagePatterns = {
        "edit-teacher": "Edit Teacher",
        editacademicyearform: "Edit Academic Year",
        editadminform: "Edit Admin",
        editmanagerform: "Edit Manager",
        editparentform: "Edit Parent",
        "edit-student": "Edit Student",
        "edit-schedule": "Edit Schedule",
        "edit-term": "Edit Term",
        "edit-class-teacher": "Edit Class Teacher",
        "edit-subject": "Edit Subject",
        "edit-assigned-subject": "Edit Assigned Subject",
        "edit-teacher-profile": "Edit Teacher Profile",
        "edit-activity-form": "Edit Activity Form",
        "edit-vr": "Edit VR",
      };

      const editPage = pathSegments.find(
        (segment) => editPagePatterns[segment],
      );
      if (editPage) {
        title = editPagePatterns[editPage];
      }
    }

    document.title = title || "Learnova";
  }, [location.pathname]);

  return null;
}

export default TitleUpdater;
