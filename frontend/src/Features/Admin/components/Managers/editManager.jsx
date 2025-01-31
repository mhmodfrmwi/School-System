import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editManager, fetchManagers } from "../AdminRedux/managerSlice";
import { toast } from "react-toastify";
import Loader from "@/ui/Loader";

const EditManagerForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { managers, loading } = useSelector((state) => state.managers);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  useEffect(() => {
    const managerToEdit = managers.find((manager) => manager._id === id);
    if (managerToEdit) {
      setFormData({
        fullName: managerToEdit.fullName,
        email: managerToEdit.email,
        password: "",
        phone: managerToEdit.phone,
        gender: managerToEdit.gender,
      });
    }
  }, [managers, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedManager = { ...formData };
    dispatch(editManager({ id, updatedManager }))
      .unwrap()
      .then(() => {
        toast.success("Manager updated successfully");
        navigate("/admin/allmanagers");
      })
      .catch((error) => {});
  };

  return (
    <div className="relative mx-auto mt-10 w-[80%]">
      {loading && <Loader />}
      <h1 className="pl-5 text-2xl font-poppins font-semibold text-[#244856]">
        Edit Manager
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form onSubmit={handleSubmit} className="m-6">
          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border font-poppins border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border font-poppins border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border font-poppins border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="M" className="font-poppins">Male</option>
              <option value="F" className="font-poppins">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 font-poppins block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl font-poppins border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border font-poppins border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter phone number"
              required
            />
          </div>

          <button
            type="submit"
            className="text-md mx-auto block font-poppins rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditManagerForm;
