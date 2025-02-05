import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createTeacherVirtualRoom } from "../TeacherRedux/VirtualRoomsSlice";
import { fetchSubjects } from "../../../Admin/components/AdminRedux/subjectSlice";
import { fetchGrades } from "../../../Admin/components/AdminRedux/gradeSlice";
import { fetchTerms } from "../../../Admin/components/AdminRedux/termSlice";
import { fetchAcademicYears } from "../../../Admin/components/AdminRedux/academicYearSlice";

function VirtualRoomForm() {
  const dispatch = useDispatch();

  // Fetch data from Redux store
  const subjects = useSelector((state) => state.subject.subjects);
  const grades = useSelector((state) => state.grades.grades);
  const terms = useSelector((state) => state.terms.terms);
  const academicYears = useSelector((state) => state.academicYears.academicYears);

  const [formData, setFormData] = useState({
    title: "",
    subjectName: "",
    academicYear: "",
    grade: "",
    semester: "",
    startTime: "",
    duration: "",
    link: "",
  });

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchGrades());
    dispatch(fetchTerms());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeacherVirtualRoom(formData))
      .unwrap()
      .then(() => {
        toast.success("Virtual room added successfully!");
        setFormData({
          title: "",
          subjectName: "",
          academicYear: "",
          grade: "",
          semester: "",
          startTime: "",
          duration: "",
          link: "",
        });
      })
      .catch((error) => {
        toast.error(`Failed to add virtual room: ${error}`);
      });
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Add Virtual Room</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form onSubmit={handleSubmit} className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          

      {/* Title */}
        <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>


          {/* Academic Year Dropdown */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Academic Year</label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>Select Academic Year</option>
              {academicYears?.map((year) => (
                <option key={year._id} value={`${year.startYear}/${year.endYear}`}>
                  {year.startYear} / {year.endYear}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>Select Semester</option>
              {terms
                .filter((term) => {
                  const academicYearValue = `${term.academicYear_id.startYear}/${term.academicYear_id.endYear}`;
                  return academicYearValue === formData.academicYear;
                })
                .map((term) => (
                  <option key={term._id} value={term.semesterName}>
                    {term.semesterName}
                  </option>
                ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Subject Name</label>
            <select
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>Select Subject</option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject.subjectName}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Dropdown */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Grade</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>Select Grade</option>
              {grades?.map((grade) => (
                <option key={grade._id} value={grade.gradeName}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Start Time *</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>


          {/* Duration */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Duration (minutes) *</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          

          {/* Link */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Add Virtual Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VirtualRoomForm;
