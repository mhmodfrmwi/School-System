import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdmin } from "../AdminRedux/adminSlice";

function AdminForm() {
  const dispatch = useDispatch();
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

    // Validate form fields
    if (!formData.fullName || !formData.email || !formData.password || !formData.phoneNumber || !formData.gender) {
      return;
    }

    // Map gender to valid schema values
    const genderMap = { Male: "M", Female: "F", Other: "O" };

    // Prepare payload
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phoneNumber,
      gender: genderMap[formData.gender], // Map gender
    };

    try {
      // Dispatch Redux action
      await dispatch(postAdmin(payload));
      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
      });
    } catch (error) {
      // Display error
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Admin</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {/* Full Name and Email */}
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

          {/* Gender and Password */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForm;
