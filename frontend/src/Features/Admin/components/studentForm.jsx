import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postStudent, addStudenttoserver } from "./addstudentSlice";

function StudentForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    studentClass: "",
    gender: "",
  });

  const {
    fullName: studentFullName,
    email: studentEmail,
    password: studentPassword,
    phoneNumber: studentPhoneNumber,
    studentClass: studentC,
    gender: studentGender,
  } = useSelector((state) => state.addstudent);

  console.log(
    studentFullName,
    studentEmail,
    studentPassword,
    studentPhoneNumber,
    studentC,
    studentGender,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber
    )
      return;

    dispatch(
      postStudent({
        name: formData.fullName,
        email: formData.email,
        class: formData.studentClass,
        gender: formData.gender,
        studentID: crypto.randomUUID(),
        image: "https://randomuser.me/api/portraits/men/23.jpg",
      }),
    );

    dispatch(
      addStudenttoserver(
        formData.fullName,
        formData.email,
        formData.password,
        formData.phoneNumber,
        formData.studentClass,
        formData.gender,
      ),
    );

    setFormData({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      studentClass: "",
      gender: "",
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="text-3xl font-bold text-[#043B44]">Add Student</h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="col-span-12 md:col-span-6">
              <label className="mb-2 block font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="col-span-12 md:col-span-3">
              <label className="mb-2 block font-medium text-gray-700">
                Class
              </label>
              <select
                name="studentClass"
                value={formData.studentClass}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select class
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-3">
              <label className="mb-2 block font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="col-span-12 md:col-span-6">
              <label className="mb-2 block font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className="mb-2 block font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="text-start">
            <button
              type="submit"
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-medium text-white hover:bg-[#117C90]"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default StudentForm;
