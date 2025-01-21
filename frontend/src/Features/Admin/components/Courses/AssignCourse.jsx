import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, addCourse } from "../AdminRedux/coursesSlice"; // تأكد من مسار الـ slice
import { toast } from "react-toastify"; // استيراد الـ toast

function AssignCourse() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses); // جلب الدورات من الـ Redux

  const [selectedSubject, setSelectedSubject] = useState(""); // حفظ المادة المختارة
  const [term, setTerm] = useState(""); // حفظ الترم المختار
  const [grade, setGrade] = useState(""); // حفظ الصف المختار

  useEffect(() => {
    // تحميل الدورات عند تحميل الـ component
    dispatch(fetchCourses());
  }, [dispatch]);

  // تصفية المواد لعرض المواد المميزة فقط
  const uniqueSubjects = [...new Set(courses.map(course => course.subjectName))];

  // دالة لتعيين المادة
  const handleAssignCourse = (e) => {
    e.preventDefault();

    // تحقق من ملء الحقول
    if (!selectedSubject || !term || !grade) {
      alert("Please fill in all fields");
      return;
    }

    // إرسال البيانات عبر الـ Redux لتعيين المادة
    const assignedCourse = {
      subjectName: selectedSubject,
      term: term,
      grade: grade,
    };

    dispatch(addCourse(assignedCourse)); // ستقوم بإرسال هذه البيانات لعملية التعيين

    // عرض رسالة Toast عند التعيين بنجاح
    toast.success("Course assigned successfully!");

    // إعادة تعيين القيم بعد الإرسال
    setSelectedSubject("");
    setTerm("");
    setGrade("");
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Assign Course</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleAssignCourse} className="m-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Course --</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>Error loading courses</option>
              ) : (
                uniqueSubjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Term --</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">-- Select Grade --</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#117C90] text-white rounded-md text-sm font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            Assign Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignCourse;
