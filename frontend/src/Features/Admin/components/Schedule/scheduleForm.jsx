import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSchedual } from "../AdminRedux/scheduleSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchTerms } from "../AdminRedux/termSlice";
import { fetchClasses } from "../AdminRedux/classSlice";
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice";
import { toast } from "react-toastify";
import Loader from "@/ui/Loader";

function ScheduleForm() {
  const dispatch = useDispatch();

  const teachers = useSelector((state) => state.teachers.teachers);
  const subjects = useSelector((state) => state.subject.subjects);
  const grades = useSelector((state) => state.grades.grades);
  const terms = useSelector((state) => state.terms.terms);
  const classes = useSelector((state) => state.classes);
  const academicYears = useSelector((state) => state.academicYears);
  const { loading } = useSelector((state) => state.schedules);

  const [formData, setFormData] = useState({
    className: "",
    subjectName: "",
    teacherName: "",
    grade: "",
    academicYear: "",
    day: "",
    startTime: "",
    endTime: "",
    semesterName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postSchedual(formData))
      .unwrap()
      .then(() => {
        toast.success("Schedule added successfully!");
        setFormData({
          className: "",
          subjectName: "",
          teacherName: "",
          grade: "",
          academicYear: "",
          day: "",
          startTime: "",
          endTime: "",
          semesterName: "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchSubjects());
    dispatch(fetchGrades());
    dispatch(fetchTerms());
    dispatch(fetchClasses());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      {loading && <Loader />}
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Schedule
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Subject Name
            </label>
            <select
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select subject
              </option>
              {Array.isArray(subjects) &&
                subjects.map((subject) => (
                  <option key={subject._id} value={subject.subjectName}>
                    {subject.subjectName}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Teacher Name
            </label>
            <select
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select teacher
              </option>
              {Array.isArray(teachers) && teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher.fullName}>
                    {teacher.fullName}
                  </option>
                ))
              ) : (
                <option disabled>Loading teachers...</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Grade
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select grade
              </option>
              {Array.isArray(grades) &&
                grades.map((grade) => (
                  <option key={grade._id} value={grade.gradeName}>
                    {grade.gradeName}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Class
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select class
              </option>

              {Array.isArray(classes.classes) &&
                classes.classes.map((classItem) => (
                  <option key={classItem._id} value={classItem.className}>
                    {classItem.className}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Semester Name
            </label>
            <select
              name="semesterName"
              value={formData.semesterName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select semester
              </option>
              {Array.isArray(terms) && terms.length > 0 ? (
                terms.map((term) => (
                  <option key={term._id} value={term.semesterName}>
                    {term.semesterName}
                  </option>
                ))
              ) : (
                <option disabled>Loading semesters...</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Academic Year
            </label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={(e) => {
                const selectedYear = academicYears.academicYears.find(
                  (year) => year._id === e.target.value,
                );
                setFormData((prevState) => ({
                  ...prevState,
                  academicYear: selectedYear
                    ? `${selectedYear.startYear}/${selectedYear.endYear}`
                    : "",
                }));
              }}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select Academic Year
              </option>

              {Array.isArray(academicYears.academicYears) &&
              academicYears.academicYears.length > 0 ? (
                academicYears.academicYears.map((year) => (
                  <option key={year._id} value={year._id}>
                    {year.startYear} / {year.endYear}
                  </option>
                ))
              ) : (
                <option disabled>Loading academic years...</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Day
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select day
              </option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              From
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              to
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Add Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleForm;
