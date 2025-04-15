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

    if (
      !formData.title ||
      !formData.startTime ||
      !formData.duration ||
      !formData.link
    ) {
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
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Upload VR
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[130px]"></div>
      </div>
      <div className="dark:bg-DarkManager2 mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              Start Time{" "}
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              Duration{" "}
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              Link{" "}
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {status === "loading" ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ManagerVRForm;
