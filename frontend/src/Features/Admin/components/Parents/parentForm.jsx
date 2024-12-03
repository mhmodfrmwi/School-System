import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postParent, addParenttoserver } from "../AdminRedux/addparentSlice";

function ParentForm() {
  const dispatch = useDispatch();
  const { parentFullName, parentEmail, parentPassword, parentPhoneNumber, parentGender, students } = useSelector((state) => state.addparent);

  const [formData, setFormData] = useState({
    fullName: parentFullName || "",
    email: parentEmail || "",
    password: parentPassword || "",
    phoneNumber: parentPhoneNumber || "",
    gender: parentGender || "",
    students: students || [{ studentName: "", studentClass: "" }],
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

    if (!formData.fullName || !formData.email || !formData.password) return;

    // Dispatch to Redux
    dispatch(
      postParent({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        gender: formData.gender,
        SSN: "30403000000000", // Dummy value
        password: formData.password,
        role: "Parent",
      })
    );

    dispatch(
      addParenttoserver(
        formData.fullName,
        formData.email,
        formData.password,
        formData.phoneNumber,
        formData.gender
      )
    );

    console.log("Form Submitted", formData);

    // Reset form after submit
    setFormData({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      students: [{ studentName: "", studentClass: "" }],
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">Add Parent</h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Parent fields */}
          <div className="mb-4">
            <label className="block mb-2 font-poppins text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Students fields */}
          <div className="mt-6">
            {formData.students.map((student, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                <div>
                  <label className="block mb-2 font-poppins text-gray-700">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={student.studentName}
                    onChange={(e) => handleStudentChange(index, e)}
                    className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                    placeholder="Enter student name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-poppins text-gray-700">Class</label>
                  <select
                    name="studentClass"
                    value={student.studentClass}
                    onChange={(e) => handleStudentChange(index, e)}
                    className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  >
                    <option value="" disabled>Select class</option>
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
              className="mt-4 text-[#117C90] hover:underline"
            >
              + Add another student
            </button>
          </div>

          {/* Submit button */}
          <div className="mt-8">
            <button
              type="submit"
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#117C90]"
            >
              Add Parent
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ParentForm;
