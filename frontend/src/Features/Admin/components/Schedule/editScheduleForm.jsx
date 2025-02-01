import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTeachers } from "../AdminRedux/teacherSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchTerms } from "../AdminRedux/termSlice";
import { editSchedualAsync } from "../AdminRedux/scheduleSlice";

function EditScheduleForm({ existingData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schedules = useSelector((state) => state.schedules.schedules);
  const teachers = useSelector((state) => state.teachers.teachers);
  const subjects = useSelector((state) => state.subject.subjects);
  const grades = useSelector((state) => state.grades.grade);
  const terms = useSelector((state) => state.terms.terms);

  const [formData, setFormData] = useState({
    courseName: "",
    teacherName: "",
    grade: "",
    class: "",
    term: "",
    day: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchSubjects());
    dispatch(fetchGrades());
    dispatch(fetchTerms());
  }, [dispatch]);

  useEffect(() => {
    const schedule = schedules.find((item) => item._id === id);
    if (schedule) {
      setFormData({
        courseName: schedule.courseName,
        teacherName: schedule.teacherName,
        grade: schedule.grade,
        class: schedule.class,
        term: schedule.term,
        day: schedule.day,
        from: schedule.from,
        to: schedule.to,
      });
    }
  }, [id, schedules]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editSchedualAsync({ id, updatedSchedule: formData }));
    navigate("/admin/allschedules");
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Edit Schedule
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Course Name
            </label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select course
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
              {Array.isArray(teachers) &&
                teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher.fullName}>
                    {teacher.fullName}
                  </option>
                ))}
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
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select class
              </option>
              <option value="A">Class A</option>
              <option value="B">Class B</option>
              <option value="C">Class C</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Term - Year
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="" disabled>
                Select term
              </option>
              {Array.isArray(terms) && terms.length > 0 ? (
                terms.map((term) => (
                  <option key={term._id} value={term._id}>
                    {term.semesterName} - {term.academicYear_id?.startYear} /{" "}
                    {term.academicYear_id?.endYear}
                  </option>
                ))
              ) : (
                <option disabled>Loading terms...</option>
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
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              To
            </label>
            <input
              type="time"
              name="to"
              value={formData.to}
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
              Update Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditScheduleForm;
