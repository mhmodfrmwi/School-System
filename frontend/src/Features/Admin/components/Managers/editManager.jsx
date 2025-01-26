import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  editManagerAsync } from "../AdminRedux/managerSlice";

const EditManagerForm = () => {
   const { id } = useParams(); 
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const { bosses } = useSelector((state) => state.bosses);
     const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        gender: "",
        phone: "",
        password: "",
     });
   
     useEffect(() => {
       const manager = bosses.find((manager) => manager._id === id); 
       if (manager) {
         setFormData({
          fullName: manager.fullName,
          email: manager.email,
          gender: manager.gender,
          phone: manager.phone,
          password: manager.password,
         });
       }
     }, [id, bosses]);
   
     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData((prevState) => ({ ...prevState, [name]: value }));
     };
   
     const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(editManagerAsync({ id, updatedManager: formData }));
       navigate("/admin/allmanagers"); 
     };
    

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <div className="mb-6">
        <h2 className="text-2xl font-poppins font-semibold text-[#244856]">Edit Manager</h2>
        <div className="mt-1 h-[4px] w-[155px] rounded-t-md bg-[#244856]"></div>
      </div>
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

          <div className="col-span-1 sm:col-span-2 flex justify-end gap-4">
            
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md font-medium hover:bg-[#0f6b7c] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditManagerForm;
