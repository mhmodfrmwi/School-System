import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addParenttoserver, postParent } from "../AdminRedux/parentSlice";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";

function ParentForm() {
  const dispatch = useDispatch();
  const { parents, loading } = useSelector((state) => state.parents); // Assuming you have all parents' data in Redux
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
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
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          gender: formData.gender,
          SSN: "30403000000000",
          password: formData.password,
          role: "Parent",
        }),
      );

      await dispatch(
        addParenttoserver(
          formData.fullName,
          formData.email,
          formData.password,
          formData.phoneNumber,
          formData.gender,
        ),
      );

      Swal.fire("Success", "Parent added successfully!", "success");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
        students: [{ studentID: "" }],
      });
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="relative">
      {loading && <Loader />}
      <div className="mb-6 ms-10 mt-6">
        <h2 className="w-52 font-poppins text-3xl font-bold text-[#043B44]">
          Add Parent
        </h2>
        <p className="mt-3 w-24 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-2xl bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-semibold text-[#117C90]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-[#117C90]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-[#117C90]">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled className="font-poppins">
                  Select gender
                </option>
                <option value="Male" className="font-poppins">
                  Male
                </option>
                <option value="Female" className="font-poppins">
                  Female
                </option>
              </select>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-[#117C90]">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-[#117C90]">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {formData.students.map((student, index) => (
              <div key={index} className="mt-4">
                <div>
                  <label className="mb-2 block font-semibold text-[#117C90]">
                    Student ID
                  </label>
                  <input
                    type="number"
                    name="studentID"
                    value={student.studentID}
                    onChange={(e) => handleStudentChange(index, e)}
                    className="w-full rounded-2xl border p-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                    placeholder="Enter student ID"
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addStudent}
              className="mt-8 font-semibold text-[#117C90]"
            >
              <div className="mt-2 flex w-44 flex-row justify-between text-center">
                <p className="rounded-full border-2 border-black px-3 py-1 text-black">
                  +
                </p>
                <p className="mt-2"> Add another</p>
              </div>
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#117C90]"
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
