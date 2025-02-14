import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faBook, faTasks, faFileAlt, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchClassTeacher } from "../TeacherRedux/TeacherClassSlice";
import { fetchMaterials } from "../TeacherRedux/PdfMaterialSlice";


const AddMaterial = () => {
  const { classId, gradeSubjectSemesterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (courseName, actionType) => {
    if (!gradeSubjectSemesterId) {
      console.error("gradeSubjectSemesterId is undefined");
      return;
    }

    let targetUrl = "";
    if (courseName === "Video Lectures" || courseName === "Course Material") {
      targetUrl = actionType === "see"
        ? `/teacher/see-material/${gradeSubjectSemesterId}`
        : `/teacher/materialform/${classId}/${gradeSubjectSemesterId}`;
    } else if (courseName === "Virtual Room") {
      targetUrl = actionType === "see"
      ? `/teacher/virtual-room`
      : `/teacher/VR-form/${classId}/${gradeSubjectSemesterId}`;
    } else if (courseName === "Assignments") {
      targetUrl = `/teacher/assignments/${gradeSubjectSemesterId}`;
    } else if (courseName === "Exams") {
      targetUrl = `/teacher/exams/${gradeSubjectSemesterId}`;
    }

    if (targetUrl) {
      console.log("Navigating to:", targetUrl);
      navigate(targetUrl);
    }
  };

  const { classTeachers = [], message, loading } = useSelector((state) => state.classTeachers || {});
  const pdfMaterials = useSelector((state) => state.pdfMaterials.pdfMaterials || []);
  
  useEffect(() => {
    dispatch(fetchClassTeacher());
  }, [dispatch]);

  useEffect(() => {
    if (gradeSubjectSemesterId) {
      dispatch(fetchMaterials(gradeSubjectSemesterId));
    }
  }, [dispatch, gradeSubjectSemesterId]);

  if (loading) return <div>Loading...</div>;
  if (message) return <div>{message}</div>;

  const classteacher = classTeachers.length > 0 ? classTeachers[0] : null;
  const videoCount = pdfMaterials.filter((material) => material.type === "Video").length;
  const pdfCount = pdfMaterials.filter((material) => material.type === "PDF").length;

  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const courses = [
    { id: 1, name: "Video Lectures", total: videoCount, icon: faVideo },
    { id: 2, name: "Course Material", total: pdfCount, icon: faBook },
    { id: 3, name: "Virtual Room", total: 24, icon: faVideo },
    { id: 4, name: "Assignments", total: 100, icon: faTasks },
    { id: 5, name: "Exams", total: 19, icon: faFileAlt },
  ];

  const getColor = (index) => colors[index % colors.length];

  return (
    <div>
      <div className="flex justify-center">
        <div className="space-y-4 w-[80%]">
          <div className="w-full bg-gray-100 border-2 text-lg border-gray-200 font-poppins rounded p-3 mb-4">
            {classteacher ? `${classteacher.subjectName} - ${classteacher.gradeName}` : "No Subject Assigned"}
          </div>
          {courses.map((course, index) => (
            <div key={course.id} className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full mr-4" style={{ backgroundColor: `${getColor(index)}33` }}>
                  <FontAwesomeIcon className="h-5 w-5" icon={course.icon} style={{ color: getColor(index) }} />
                </div>
                <div className="flex flex-col">
                  <p className="m-0 text-lg font-poppins font-semibold text-gray-600">{course.name}</p>
                  <p className="text-gray-500 font-poppins text-sm">Total: {course.total}</p>
                </div>
              </div>
              <div className="flex">
                <button onClick={() => handleNavigation(course.name, "see")} className="border-none bg-none text-[#117C90] cursor-pointer mr-2">
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                </button>
                <button onClick={() => handleNavigation(course.name, "add")} className="border-none bg-none text-[#117C90] cursor-pointer mr-2">
                  <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMaterial;
