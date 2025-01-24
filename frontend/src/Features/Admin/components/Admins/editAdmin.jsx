import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAdmin } from "../AdminRedux/adminSlice";

const EditAdminForm = () => {
  const { id } = useParams(); // Extracting ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins); // Getting admin data from Redux

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const admin = admins.find((admin) => admin._id === id); // Find the admin by ID
    if (admin) {
      setFormData({
        fullName: admin.fullName || "",
        email: admin.email || "",
        password: admin.password || "",
        phone: admin.phone || "",
        gender: admin.gender || "",
      });
    }
  }, [id, admins]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.phone || !formData.gender) {
      alert("Please fill in all required fields.");
      return;
    }

    dispatch(editAdmin({ id, updatedAdmin: formData }));
    navigate("/admin/alladmins"); // Navigate back to the admin list
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Edit Admin
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
              className="w-full rounded-md border font-poppins p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
                className="w-full rounded-md font-poppins border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="M" className="font-poppins">
                  Male
                </option>
                <option value="F" className="font-poppins">
                  Female
                </option>
                <option value="O" className="font-poppins">
                  Other
                </option>
              </select>
            </div>
          </div>

          {/* Password and Phone */}
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
                className="w-full rounded-md border font-poppins p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border font-poppins p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#043B44]"
            >
              Update Admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAdminForm;
