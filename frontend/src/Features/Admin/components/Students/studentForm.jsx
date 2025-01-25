import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { postStudent } from "../AdminRedux/studentSlice";

function StudentForm() {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    grade: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.emailAddress ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.grade ||
      !formData.address
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const emailExists = students.some(
      (student) =>
        student.emailAddress.toLowerCase() ===
        formData.emailAddress.toLowerCase()
    );

    if (emailExists) {
      Swal.fire("Error", "Email already exists. Please use another email.", "error");
      return;
    }

    try {
      dispatch(postStudent(formData));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Student added successfully!",
      });

      setFormData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        grade: "",
        address: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add student. Please try again.",
      });
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div>
          <label>Grade</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
