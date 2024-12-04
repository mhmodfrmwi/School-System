import React, { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { addAdmintoServer, postAdmin } from "../AdminRedux/adminSlice";
import Swal from "sweetalert2";
function AdminForm() {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.admins); // Assuming you have all parents' data in Redux
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
    if (!formData.fullName || !formData.email || !formData.password) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    // Check for duplicate email
    const emailExists = admins.some(
      (parent) => parent.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      Swal.fire("Error", "Email already exists. Please use another email.", "error");
      return;
    }
    try {
      // Dispatch Redux actions
      await dispatch(
        postAdmin({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          gender: formData.gender,
          SSN: "30403000000000", // Dummy value
          password: formData.password,
          role: "Admin",
        }),
      );

      await dispatch(
        addAdmintoServer(
          formData.fullName,
          formData.email,
          formData.password,
          formData.phoneNumber,
          formData.gender,
        ),
      );

      Swal.fire("Success", "Admin added successfully!", "success");

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
      });
  } catch (error) {
    Swal.fire("Error", "Something went wrong. Please try again.", "error");
  }
};

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Add Admin
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
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male" className="font-poppins">Male</option>
                <option value="Female" className="font-poppins">Female</option>
              </select>
            </div>
          </div>

          {/* Password and Phone Number */}
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
                name="phoneNumber"
                value={formData.phoneNumber}
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
              className="mt-8 rounded-3xl bg-[#117C90] px-6 py-2 font-poppins font-medium text-white hover:bg-[#117C90]"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminForm;
