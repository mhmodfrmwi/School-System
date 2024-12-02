import React, { useState } from "react";

function ScheduleForm() {
  const [formData, setFormData] = useState({
    subject: "",
    day: "",
    time: "",
    teacher: "",
    students: [{ studentName: "", studentClass: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStudentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStudents = formData.students.map((student, i) =>
      i === index ? { ...student, [name]: value } : student
    );
    setFormData({ ...formData, students: updatedStudents });
  };

  const addStudent = () => {
    setFormData((prevState) => ({
      ...prevState,
      students: [...prevState.students, { studentName: "", studentClass: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Schedule Submitted", formData);
    setFormData({
      subject: "",
      day: "",
      time: "",
      teacher: "",
      students: [{ studentName: "", studentClass: "" }],
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
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
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter subject"
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
                Time
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 font-poppins border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter time (e.g., 10:00 AM - 12:00 PM)"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="block font-poppins mb-2 font-poppins text-gray-700">
                Teacher
              </label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter teacher name"
                required
              />
            </div>
          </div>

          {/* Students Fields */}
          <div className="mt-6">
            {formData.students.map((student, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4"
              >
                <div>
                  <label className="block mb-2 font-poppins font-poppins text-gray-700">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={student.studentName}
                    onChange={(e) => handleStudentChange(index, e)}
                    className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                    placeholder="Enter student name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-poppins text-gray-700">
                    Class
                  </label>
                  <select
                    name="studentClass"
                    value={student.studentClass}
                    onChange={(e) => handleStudentChange(index, e)}
                    className="w-full p-2 border font-poppins rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  >
                    <option value="" disabled>
                      Select class
                    </option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addStudent}
              className="mt-4 font-poppins text-[#117C90] hover:underline"
            >
              + Add another student
            </button>
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
