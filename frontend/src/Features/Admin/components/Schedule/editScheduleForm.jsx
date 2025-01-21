import React, { useState } from "react";

function ScheduleForm() {
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
    console.log("Schedule Submitted", formData);
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

  return (
    <>
     <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-2xl font-bold text-[#043B44]">
          Edit Schedule
        </h2>
        <p className="mt-1 h-[3px] w-[170px] rounded-t-md bg-[#117C90] lg:h-[4px] lg:w-[10px]"></p>
      </div>

    <div className="mx-auto mt-10 w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Course Name */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter course name"
              required
            />
          </div>

          {/* Teacher Name */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">
              Teacher Name
            </label>
            <input
              type="text"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter teacher name"
              required
            />
          </div>

          {/* Grade */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">Grade</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins bg-[#117C90] text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select grade
              </option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins bg-[#117C90] text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select class
              </option>
              <option value="A">Class A</option>
              <option value="B">Class B</option>
              <option value="C">Class C</option>
            </select>
          </div>

          {/* Term */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">
              Term - Year
            </label>
            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins bg-[#117C90] text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select term
              </option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
            </select>
          </div>

          {/* Day */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">Day</label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins bg-[#117C90] text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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

          {/* From */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">From</label>
            <input
              type="time"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          {/* To */}
          <div>
            <label className="mb-2 block font-poppins text-gray-700">To</label>
            <input
              type="time"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full rounded-md border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#0D5F6A]"
          >
            Update Schedule
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default ScheduleForm;
