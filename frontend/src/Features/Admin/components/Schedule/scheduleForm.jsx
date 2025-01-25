import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postSchedual } from "../AdminRedux/scheduleSlice"; // Updated action import
import { fetchTeachers } from "../AdminRedux/teacherSlice"; // Fetch teachers

function ScheduleForm() {
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(formData.grade)) {
      alert("Grade must be a valid number.");
      return;
    }

    console.log("Schedule Submitted", formData);
    dispatch(postSchedual(formData)); // Updated dispatch action
    setFormData({
      courseName: "",
      teacherName: "",
      grade: "",
      class: "",
      term: "",
      day: "",
      from: "",
      to: "",
    });
  };

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Schedule</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Teacher Name
            </label>
            <input
              type="text"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter teacher name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Grade
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select grade
              </option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
            <label className="block text-md font-medium text-gray-700 mb-2">
              Term - Year
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select term
              </option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Day
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
            <label className="block text-md font-medium text-gray-700 mb-2">
              From
            </label>
            <input
              type="time"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">
              To
            </label>
            <input
              type="time"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="col-span-1 sm:col-span-2 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
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
