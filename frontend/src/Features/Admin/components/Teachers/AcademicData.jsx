import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../AdminRedux/classSlice"; // Fetch classes
import { fetchSubjects } from "../AdminRedux/subjectSlice"; // Fetch subjects
import { fetchTeachers } from "../AdminRedux/teacherSlice"; // Fetch teachers
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice"; // Fetch academic years
import { postClassTeacher } from "../AdminRedux/classTeacherSlice"; // Add class teacher

function AcademicData() {
  const dispatch = useDispatch();

  // State to hold form data
  const [academicData, setAcademicData] = useState({
    className: "",
    subjectName: "",
    teacherName: "",
    academicYear: "",
    gradeName: "",
  });

  // Fetch data from Redux store
  const { classes } = useSelector((state) => state.classes);
  const { subjects } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teachers);
  const { academicYears } = useSelector((state) => state.academicYears);


  // Load data on component mount
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicData({ ...academicData, [name]: value });
  };

  // Handle form submission (Add Class Teacher)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map the selected IDs to their actual values
    const selectedClass = classes.find(cls => cls._id === academicData.className)?.className || '';
    const selectedSubject = subjects.find(subject => subject._id === academicData.subjectName)?.subjectName || '';
    const selectedTeacher = teachers.find(teacher => teacher._id === academicData.teacherName)?.fullName || '';
    const selectedAcademicYear = academicYears.find(year => year._id === academicData.academicYear)?.startYear + '-' + academicYears.find(year => year._id === academicData.academicYear)?.endYear || '';

    // Create the data object with the names
    const classTeacherData = {
      className: selectedClass,
      subjectName: selectedSubject,
      teacherName: selectedTeacher,
      academicYear: selectedAcademicYear,
    };


    // Dispatch action to post class teacher
    dispatch(postClassTeacher(classTeacherData));

    // Reset the form
    setAcademicData({
      className: "",
      subjectName: "",
      teacherName: "",
      academicYear: "",
    });
  };


  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Academic Data</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {/* Select Class - Dynamic options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Class</label>
            <select
              name="className"
              value={academicData.className}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Class</option>
              {classes?.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>

          {/* Select Subject - Dynamic options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Subject</label>
            <select
              name="subjectName"
              value={academicData.subjectName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Subject</option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Select Teacher - Dynamic options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Teacher</label>
            <select
              name="teacherName"
              value={academicData.teacherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Teacher</option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Select Academic Year - Dynamic options */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Academic Year</label>
            <select
              name="academicYear"
              value={academicData.academicYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Academic Year</option>
              {academicYears?.map((year) => (
                <option key={year._id} value={year._id}>
                  {year.startYear} - {year.endYear}
                </option>
              ))}
            </select>
          </div>


          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
            >
              Submit Academic Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcademicData;
