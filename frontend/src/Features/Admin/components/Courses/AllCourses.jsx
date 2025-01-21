import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../AdminRedux/coursesSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import CoursesHeader from "./CoursesHeader"; // استيراد مكون الـ Header
import { ToastContainer, toast } from "react-toastify"; // استيراد التوست
import "react-toastify/dist/ReactToastify.css"; // استيراد الأنماط الخاصة بالتوست

const CoursesList = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    
    if (confirmDelete) {
      dispatch(deleteCourse(id));  // الحذف من الـ Redux
      toast.success("Course deleted successfully!");  // رسالة نجاح التوست
    }
  };

  // إنشاء مصفوفة لتصفية المواد المتكررة
  const uniqueCourses = Array.from(
    new Map(courses.map((course) => [course.subjectName, course])).values()
  );

  // Generate dynamic colors for icons
  const colors = [
    "bg-green-200", 
    "bg-blue-200", 
    "bg-orange-200", 
    "bg-red-200", 
    "bg-purple-200", 
    "bg-teal-200"
  ];
  const iconColors = [
    "text-green-600", 
    "text-blue-600", 
    "text-orange-600", 
    "text-red-600", 
    "text-purple-600",
    "text-teal-600"  
  ];
  const getIconColor = (index) => colors[index % colors.length];
  const getIconTextColor = (index) => iconColors[index % iconColors.length]; // For icon color

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* إضافة الـ Header هنا */}
      <CoursesHeader /> 

      <div className="flex justify-center"> {/* Center horizontally */}
        <div className="space-y-4 w-4/5"> {/* Set width to 80% */}
          {uniqueCourses.map((course, index) => (
            <div
              key={course.id}
              className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-md rounded-md" // Flex column for small screens, row for larger
            >
              {/* Left section: Icon + Course Name */}
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full ${getIconColor(index)}`}
                >
                  <FontAwesomeIcon icon={faBook} className={`text-2xl ${getIconTextColor(index)}`} />
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 text-xl mx-2 h-7 border-l-2 border-gray-600"></span>
                  <h2 className="text-base font-bold">{course.subjectName}</h2> {/* Keep the same size for the subject name */}
                </div>
              </div>

              {/* Right section: Actions */}
              <div className="flex sm:flex-row flex-row sm:space-x-4 space-x-4 space-y-2 sm:space-y-0 justify-center">
                {/* View Icon */}
                <Link 
                  to={`/admin/allcourses2/${course.subjectName}`} 
                  className="w-5 h-5 text-[#3C8D99] hover:text-[#2C6E79] sm:mt-0 mt-2" 
                >
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                </Link>

                {/* Edit Icon */}
                <Link 
                  to={`/edit-course/${course.id}`}
                  className="w-5 h-5 text-[#3C8D99] hover:text-[#2C6E79]"
                >
                  <FontAwesomeIcon icon={faPen} className="w-5 h-5" />
                </Link>

                {/* Delete Icon */}
                <button 
                  onClick={() => handleDelete(course.id)} 
                  className="w-5 h-5 text-[#3C8D99] hover:text-[#2C6E79]"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* إضافة Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default CoursesList;
