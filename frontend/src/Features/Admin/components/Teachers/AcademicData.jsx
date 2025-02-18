import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses } from "../AdminRedux/classSlice"; // Fetch classes
import { fetchTeachers } from "../AdminRedux/teacherSlice"; // Fetch teachers
import { postClassTeacher } from "../AdminRedux/classTeacherSlice"; // Add class teacher

function AcademicData() {
  const dispatch = useDispatch();

  // State to hold form data
  const [academicData, setAcademicData] = useState({
    teacherName: "",
    subjectName: "",
    className: "",
    academicYear: "",
  });

  // Fetch data from Redux store
  const { classes } = useSelector((state) => state.classes);
  const { teachers } = useSelector((state) => state.teachers);

  // Load data on component mount
  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchTeachers());
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
    const selectedTeacher = teachers.find(
      (teacher) => teacher._id === academicData.teacherName,
    );
    const selectedClass = classes.find(
      (cls) => cls._id === academicData.className,
    );

    // Create the data object with the names
    const classTeacherData = {
      teacherName: selectedTeacher?.fullName || "",
      subjectName: selectedTeacher?.subjectId?.subjectName || "",
      classId: selectedClass?._id || "",
      academicYear:
        selectedClass?.academicYear_id?.startYear +
          "-" +
          selectedClass?.academicYear_id?.endYear || "",
    };

    // Dispatch action to post class teacher
    dispatch(postClassTeacher(classTeacherData));

    // Reset the form
    setAcademicData({
      teacherName: "",
      subjectName: "",
      className: "",
      academicYear: "",
    });
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Academic Data
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Select Teacher - Dynamic options */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Teacher
            </label>
            <select
              name="teacherName"
              value={academicData.teacherName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Teacher</option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.fullName} - {teacher.subjectId?.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Select Class - Dynamic options */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Class
            </label>
            <select
              name="className"
              value={academicData.className}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Class</option>
              {classes?.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className} - {cls.gradeId?.gradeName} -{" "}
                  {cls.academicYear_id?.startYear}-
                  {cls.academicYear_id?.endYear}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
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
