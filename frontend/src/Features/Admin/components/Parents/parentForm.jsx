import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addParenttoserver, postParent } from "../AdminRedux/parentSlice";
import Swal from "sweetalert2";

function ParentForm() {
  const dispatch = useDispatch();
  const { parents } = useSelector((state) => state.parents); // Assuming you have all parents' data in Redux
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    // Check for duplicate email
    const emailExists = parents.some(
      (parent) => parent.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      Swal.fire("Error", "Email already exists. Please use another email.", "error");
      return;
    }

    try {
      // Dispatch to Redux
      await dispatch(
        postParent({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          gender: formData.gender,
          SSN: "30403000000000",
          password: formData.password,
          role: "Parent",
        })
      );

      await dispatch(
        addParenttoserver(
          formData.fullName,
          formData.email,
          formData.password,
          formData.phoneNumber,
          formData.gender
        )
      );

      Swal.fire("Success", "Parent added successfully!", "success");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
        students: [{ studentName: "", studentClass: "" }],
      });
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };


  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Add Parent
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Parent fields */}
          <div className="mb-4">
            <label className="mb-2 block font-poppins text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded- font-poppins md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled className="font-poppins">
                  Select gender
                </option>
                <option value="Male" className="font-poppins">Male</option>
                <option value="Female" className="font-poppins">Female</option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-poppins text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full font-poppins rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Students fields */}
          <div className="mt-6">
            {formData.students.map((student, index) => (
              <div
                key={index}
                className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block font-poppins text-gray-700">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={student.studentName}
                    onChange={(e) => handleStudentChange(index, e)}
                    className="w-full font-poppins rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                    placeholder="Enter student name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block font-poppins text-gray-700">
                    Class
                  </label>
                  <select
                    name="studentClass"
                    value={student.studentClass}
                    onChange={(e) => handleStudentChange(index, e)}
                    className="w-full font-poppins rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  >
                    <option value="" className="font-poppins" disabled>
                      Select class
                    </option>
                    <option value="A" >A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addStudent}
              className="mt-4 text-[#117C90] font-poppins hover:underline"
            >
              + Add another student
            </button>
          </div>

          {/* Submit button */}
          <div className="mt-8">
            <button
              type="submit"
              className="mt-8 rounded-3xl  bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#117C90]"
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
