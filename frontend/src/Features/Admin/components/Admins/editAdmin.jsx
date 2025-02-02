import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAdmin } from "../AdminRedux/adminSlice";

const EditAdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const admin = admins.find((admin) => admin._id === id);
    if (admin) {
      setFormData({
        fullName: admin.fullName || "",
        email: admin.email || "",
        phone: admin.phone || "",
        gender: admin.gender || "",
        password: admin.password || "", // Leave this empty for security reasons
      });
    }
  }, [id, admins]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Ensure all required fields are filled
    if (!formData.fullName || !formData.email || !formData.phone || !formData.gender) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const updatedAdmin = { ...formData };
    if (!formData.password) delete updatedAdmin.password;

    try {
      await dispatch(editAdmin({ id, updatedAdmin })).unwrap();
      navigate("/admin/alladmins");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Admin</h1>
      <div className="mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="m-6">
          {/* Full Name */}
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

          {/* Email and Gender */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
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
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>

          {/* Password and Phone */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter new password (leave blank to keep current password)"
              />
            </div>
            <div>
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 px-6 py-2 bg-[#117C90] text-white rounded-3xl text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdminForm;
