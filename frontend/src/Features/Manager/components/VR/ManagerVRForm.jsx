import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postVR } from "../ManagerRedux/VRMangerSlice";

const ManagerVRForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.virtualRooms);
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    duration: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.startTime || !formData.duration || !formData.link) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const startTime = new Date(formData.startTime);
    const currentTime = new Date();

    if (startTime <= currentTime) {
      toast.error("Start time must be in the future.");
      return;
    }

    try {
      await dispatch(postVR(formData)).unwrap();
      toast.success("Virtual Room created successfully!");
      setFormData({
        title: "",
        startTime: "",
        duration: "",
        link: "",
      });
    } catch (error) {
      toast.error(`Failed to create Virtual Room: ${error}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Upload VR
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[130px]"></div>
      </div>
      <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-poppins font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">Start Time </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">Duration </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">Link </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 bg-[#117C90] text-white font-poppins rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            {status === "loading" ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ManagerVRForm;