import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postManager } from "../AdminRedux/addmanagerSlice";

function ManagerForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) return;

    dispatch(
      postManager({
        name: formData.fullName,
        email: formData.email,
        phone: Number(formData.phoneNumber),
        gender: formData.gender,
        SSN: "30403000000000",
        password: formData.password,
        role: "Boss",
      }),
    );

    setFormData({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-2xl font-bold text-[#043B44]">
          Add Manager
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="mb-2 block font-poppins text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email and Gender */}
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
                className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
                className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
                className="w-full rounded-md border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md bg-[#117C90] p-2 text-white hover:bg-[#043B44]"
            >
              Add Manager
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ManagerForm;
