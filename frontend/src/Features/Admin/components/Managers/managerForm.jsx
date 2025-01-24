import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addBossetoServer, postBosse } from "../AdminRedux/managerSlice";
import { postBosse } from "../AdminRedux/managerSlice";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";

function ManagerForm() {
  const dispatch = useDispatch();
  const { bosses, loading } = useSelector((state) => state.bosses);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }
    const emailExists = bosses.some(
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
        postBosse({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          gender: formData.gender,
          password: formData.password,
        }),
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <div className="relative">
      {loading && <Loader />}
      <div className="mb-8 ms-10 mt-6">
        <h2 className="font-poppins text-2xl font-bold text-[#043B44]">
          Add Manager
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
                <option value="" disabled>
                  Select gender
                </option>
                <option value="M" className="font-poppins">
                  M
                </option>
                <option value="F" className="font-poppins">
                  F
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

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#117C90]"
            >
              Add Manager
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagerForm;
