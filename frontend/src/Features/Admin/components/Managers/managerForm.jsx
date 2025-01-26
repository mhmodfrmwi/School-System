import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postManager } from "../AdminRedux/managerSlice"; // Update import
import { toast } from "react-toastify";
import Loader from "@/ui/Loader";

function ManagerForm() {
  const dispatch = useDispatch();
  const { managers, loading } = useSelector((state) => state.managers); // Update state name to managers
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
  
    if (!formData.fullName || !formData.email || !formData.password || !formData.phoneNumber) {
      toast.warning("Please fill in all required fields.");
      return;
    }
  
    // Validate phone number format
    const phoneRegex = /^[0-9]{11}$/; // Adjust this pattern as needed
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }
  
    const emailExists = managers.some(
      (manager) => manager.email.toLowerCase() === formData.email.toLowerCase()
    );
  
    if (emailExists) {
      toast.error("Email already exists. Please use another email.");
      return;
    }
  
    try {
      await dispatch(
        postManager({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          gender: formData.gender,
          password: formData.password,
        })
      ).unwrap();
  
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
      });
      toast.success("Manager added successfully.");
    } catch (error) {
      toast.error(error.message || "An error occurred while submitting the form.");
    }
  };
  

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      {loading && <Loader />}
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Manager</h1>
      <div className="mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856] ml-3"></div>
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
            <label className="block text-md font-medium text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
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

          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
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
