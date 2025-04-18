import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faBook,
  faTasks,
  faFileAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchALLClassTeacher } from "../../TeacherRedux/TeacherClassSlice";
import { fetchMaterials } from "../../TeacherRedux/PdfMaterialSlice";
import { fetchVR } from "../../TeacherRedux/VRSlice";
import { fetchAllQuestions } from "../../TeacherRedux/QuestionBankSlice";
import { fetchExamsForTeacher } from "../../TeacherRedux/ExamSlice";
import { fetchAssignments } from "../../TeacherRedux/AssignmentSlice";
import { useTranslation } from "react-i18next";

const AllMaterialPage = () => {
  const { gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleNavigation = (courseIdentifier) => {
    if (!gradeSubjectSemesterId) {
      console.error("gradeSubjectSemesterId is undefined");
      return;
    }

    const routes = {
      video: `/teacher/see-all-material/${gradeSubjectSemesterId}`,
      material: `/teacher/see-all-material/${gradeSubjectSemesterId}`,
      vr: `/teacher/all-virtual-room/${gradeSubjectSemesterId}`,
      questionbank: `/teacher/my-all-question-bank/${gradeSubjectSemesterId}/my-questions`,
      assignments: `/teacher/see-all-assignments-allYears/${gradeSubjectSemesterId}`,
      exams: `/teacher/see-all-exams/${gradeSubjectSemesterId}`,
    };

    if (routes[courseIdentifier]) {
      navigate(routes[courseIdentifier]);
    }
  };

  const {
    classTeachers = [],
    message,
    loading,
  } = useSelector((state) => state.classTeachers || {});
  const pdfMaterials = useSelector(
    (state) => state.pdfMaterials.pdfMaterials || [],
  );
  const teacherVirtualRooms = useSelector(
    (state) => state.teacherVirtualRooms.teacherVirtualRooms || [],
  );
  const myQuestions = useSelector(
    (state) => state.questionbank.questionbank || [],
  );
  const exams = useSelector((state) => state.exam.exams || []);
  const assignment = useSelector(
    (state) => state.assignmentsTeacher.assignment || [],
  );

  useEffect(() => {
    dispatch(fetchALLClassTeacher());
  }, [dispatch]);

  useEffect(() => {
    if (gradeSubjectSemesterId) {
      dispatch(fetchMaterials(gradeSubjectSemesterId));
      dispatch(fetchVR(gradeSubjectSemesterId));
      dispatch(fetchAllQuestions(gradeSubjectSemesterId));
      dispatch(fetchExamsForTeacher(gradeSubjectSemesterId));
      dispatch(fetchAssignments(gradeSubjectSemesterId));
    } else {
      console.error("gradeSubjectSemesterId is undefined");
    }
  }, [dispatch, gradeSubjectSemesterId]);

  if (loading) return <div>Loading...</div>;
  if (message) return <div>{message}</div>;

  const classteacher = classTeachers.find(
    (teacher) => teacher.gradeSubjectSemesterId === gradeSubjectSemesterId,
  );
  const videoCount = pdfMaterials.filter(
    (material) => material.type === "Video",
  ).length;
  const pdfCount = pdfMaterials.filter(
    (material) => material.type === "PDF",
  ).length;
  const vrCount = teacherVirtualRooms.length;
  const questionBankCount = myQuestions.length;
  const examCount = exams.filter(
    (exam) => exam.teacherId === classteacher?._id,
  ).length;
  const filteredAssignments = assignment.filter(
    (assignment) => assignment.teacherId === classteacher?._id,
  ).length;

  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const courses = [
    {
      id: 1,
      name: t("addmaterial.VideoLectures"),
      identifier: "video",
      total: videoCount,
      icon: faVideo,
    },
    {
      id: 2,
      name: t("addmaterial.CourseMaterial"),
      identifier: "material",
      total: pdfCount,
      icon: faBook,
    },
    {
      id: 3,
      name: t("addmaterial.VirtualRoom"),
      identifier: "vr",
      total: vrCount,
      icon: faVideo,
    },
    {
      id: 4,
      name: t("addmaterial.QuestionBank"),
      identifier: "questionbank",
      total: questionBankCount,
      icon: faVideo,
    },
    {
      id: 5,
      name: t("addmaterial.Assignments"),
      identifier: "assignments",
      total: filteredAssignments,
      icon: faTasks,
    },
    {
      id: 6,
      name: t("addmaterial.Exams"),
      identifier: "exams",
      total: examCount,
      icon: faFileAlt,
    },
  ];

  const getColor = (index) => colors[index % colors.length];

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[80%] space-y-4">
          <div className="mb-4 w-full rounded border-2 border-gray-200 bg-gray-100 p-3 font-poppins text-lg dark:bg-DarkManager dark:text-white">
            {classteacher
              ? `${classteacher.subjectName} - ${classteacher.gradeName}`
              : "No Subject Assigned"}
          </div>
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="mb-4 flex max-w-full items-center justify-between rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-slate-100 dark:bg-DarkManager2"
            >
              <div className="flex items-center">
                <div
                  className="mr-4 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${getColor(index)}33` }}
                >
                  <FontAwesomeIcon
                    className="h-5 w-5"
                    icon={course.icon}
                    style={{ color: getColor(index) }}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="m-0 font-poppins text-lg font-semibold text-gray-600 dark:text-white">
                    {course.name}
                  </p>
                  <p className="font-poppins text-sm text-gray-500 dark:text-white">
                    {t("addmaterial.Total")}: {course.total}
                  </p>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={() => handleNavigation(course.identifier)}
                  className="mr-2 cursor-pointer border-none bg-none text-[#117C90] dark:text-white"
                >
                  <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMaterialPage;
