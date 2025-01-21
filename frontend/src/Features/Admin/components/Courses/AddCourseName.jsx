import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../AdminRedux/coursesSlice"; // تأكد من مسار الـ slice
import { toast } from "react-toastify"; // استيراد الـ toast

function AddCourse() {
  const dispatch = useDispatch();
  const [courseName, setCourseName] = useState("");

  // دالة لإرسال البيانات عند إضافة المادة
  const handleAddCourse = (e) => {
    e.preventDefault();

    // تحقق من ملء الحقول
    if (!courseName) {
      alert("Please enter the course name");
      return;
    }

    // إرسال البيانات عبر الـ Redux لإضافة المادة
    const newCourse = {
      subjectName: courseName,
    };

    dispatch(addCourse(newCourse));

    // عرض رسالة Toast عند إضافة الدورة بنجاح
    toast.success("Course added successfully!");

    // إعادة تعيين القيم بعد الإرسال
    setCourseName("");
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Course</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleAddCourse} className="m-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter course name"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#117C90] text-white rounded-md text-sm font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
