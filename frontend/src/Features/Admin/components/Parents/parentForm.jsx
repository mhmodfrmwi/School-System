import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postParent } from "../AdminRedux/parentSlice";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ParentForm() {
  const dispatch = useDispatch();
  const { parents} = useSelector((state) => state.parents); 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    students: [{ studentID: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStudentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStudents = formData.students.map((student, i) =>
      i === index ? { ...student, [name]: value } : student,
    );
    setFormData({ ...formData, students: updatedStudents });
  };

  const addStudent = () => {
    setFormData((prevState) => ({
      ...prevState,
      students: [...prevState.students, { studentID: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    const emailExists = parents.some(
      (parent) => parent.email.toLowerCase() === formData.email.toLowerCase(),
    );

    if (emailExists) {
      Swal.fire(
        "Error",
        "Email already exists. Please use another email.",
        "error",
      );
      return;
    }

    try {
      await dispatch(
        postParent({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          password: formData.password,
        }),
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        students: [{ studentID: "" }],
      });
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Parent</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select gender</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          {formData.students.map((student, index) => (
            <div key={index} className="mb-4">
              <label className="block text-md font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="number"
                name="studentID"
                value={student.studentID}
                onChange={(e) => handleStudentChange(index, e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter student ID"
                required
              />
            </div>
          ))}
          
          <button
            type="button"
            onClick={addStudent}
            className="mt-4 text-[#117C90] font-semibold flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add another student
          </button>

          <div className="col-span-1 sm:col-span-2 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
            >
              Add Parent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParentForm;
