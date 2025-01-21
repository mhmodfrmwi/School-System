import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../AdminRedux/coursesSlice";
import { useParams } from "react-router-dom";
import CoursesHeader from "./CoursesHeader"; // استيراد الـ Header
import { ToastContainer, toast } from "react-toastify"; // استيراد التوست
import "react-toastify/dist/ReactToastify.css"; // استيراد الأنماط الخاصة بالتوست

const CourseDetails = () => {
  const { subjectName } = useParams(); // استخراج اسم المادة من الرابط
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // تصفية المواد التي تتعلق بنفس المادة (subjectName)
  const filteredCourses = courses.filter(
    (course) => course.subjectName === subjectName
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    
    if (confirmDelete) {
      dispatch(deleteCourse(id));  // الحذف من الـ Redux
      toast.success("Course deleted successfully!");  // رسالة نجاح التوست
    }
  };

  return (
    <div className="container mx-auto mt-4">
      {/* إضافة الـ Header */}
      <CoursesHeader />

      {/* Responsive Table */}
      <div className="overflow-x-auto w-4/5 mx-auto"> {/* تغيير الحجم ليكون 80% */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Subject</th>
              <th className="px-4 py-2 text-center">Grade</th>
              <th className="px-4 py-2 text-center">Term</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr
                key={course.id}
                className={`${
                  index % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
                } hover:bg-[#117C90] hover:text-white`} // تغيير لون الـ hover للصف
              >
                <td className="px-4 py-2 text-center">{course.subjectName}</td>
                <td className="px-4 py-2 text-center">{course.grade}</td>
                <td className="px-4 py-2 text-center">{course.term}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-4 text-[#117C90]">
                  {/* محاذاة الأزرار للمنتصف */}
                  {/* زر تعديل */}
                  <button className="transition duration-300 hover:text-white">
                    <i className="fa fa-pencil-alt"></i> {/* أيقونة تعديل */}
                  </button>
                  {/* زر حذف */}
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="transition duration-300 hover:text-white"
                  >
                    <i className="fa fa-trash"></i> {/* أيقونة حذف */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* إضافة Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default CourseDetails;
