import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSchedual } from "../AdminRedux/scheduleSlice"; // Updated action import
import { fetchTeachers } from "../AdminRedux/teacherSlice"; // Fetch teachers

function ScheduleForm() {
  const dispatch = useDispatch();
  const { teachers = [] } = useSelector((state) => state.teachers || {}); // Access teachers from Redux
  
  const [formData, setFormData] = useState({
    subjectName: "",
    day: "",
    startTime: "",
    endTime: "",
    teacher: "",
    SSN: "",  // SSN field is now part of form data
    class: "",
    grade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTeacherChange = (e) => {
    const { value } = e.target;
    const selectedTeacher = teachers.find((teacher) => teacher.name === value);
    
    setFormData((prevState) => ({
      ...prevState,
      teacher: value,
      SSN: selectedTeacher ? selectedTeacher.SSN : "", // Automatically set SSN
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure grade is a valid number
    if (isNaN(formData.grade)) {
      alert("Grade must be a valid number.");
      return;
    }

    console.log("Schedule Submitted", formData);
    
    // Dispatch action to post schedule
    dispatch(postSchedual(formData)); // Updated dispatch action

    // Reset form data after submission
    setFormData({
      subjectName: "",
      day: "",
      startTime: "",
      endTime: "",
      teacher: "",
      SSN: "",  // Reset SSN
      class: "",
      grade: "",
    });
  };

  // Fetch teachers when the component mounts
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className="mb-6 ms-20 mt-10 w-60 md:ms-24">
      <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
        Add Schedule
      </h2>
      <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Subject Name */}
          <div className="mb-4">
            <label className="block mb-2 font-poppins text-gray-700">
              Subject Name
            </label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter subject name"
              required
            />
          </div>

          {/* Day */}
          <div className="mb-4">
            <label className="block mb-2 font-poppins text-gray-700">Day</label>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter day (e.g. Monday)"
              required
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
          </div>

          {/* Teacher */}
          <div className="mb-4">
            <label className="block mb-2 font-poppins text-gray-700">Teacher</label>
            <select
              name="teacher"
              value={formData.teacher}
              onChange={handleTeacherChange} // Update teacher and SSN
              className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher.name}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div className="mb-4">
            <label className="block mb-2 font-poppins text-gray-700">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter class (e.g. A1)"
              required
            />
          </div>

          {/* Grade */}
          <div className="mb-4">
            <label className="block mb-2 font-poppins text-gray-700">Grade</label>
            <input
              type="number"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter grade"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-6 bg-[#117C90] text-white font-bold rounded-md hover:bg-[#244856] focus:outline-none focus:ring-2 focus:ring-[#117C90]"
          >
            Add Schedule
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleForm;
