import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addScheduleAsync } from "../AdminRedux/scheduleSlice"; 

function ScheduleForm() {
  const [formData, setFormData] = useState({
    subjectName: "",
    day: "",
    from: "",
    to: "",
    teacher: "",
    className: "",
    grade: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Schedule Submitted", formData);

    // Dispatch action to add the schedule
    dispatch(addScheduleAsync(formData));

    // Reset the form
    setFormData({
      subjectName: "",
      day: "",
      from: "",
      to: "",
      teacher: "",
      className: "",
      grade: "",
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-60 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Add Schedule
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Basic Fields */}
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Day
              </label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Start Time
              </label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full p-2 font-poppins border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter start time (e.g., 08:00 AM)"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                End Time
              </label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full p-2 font-poppins border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter end time (e.g., 09:30 AM)"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Teacher
              </label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter teacher's name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Grade
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select grade
                </option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full p-2 font-poppins border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter class name"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#117C90]"
            >
              Add Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ScheduleForm;
