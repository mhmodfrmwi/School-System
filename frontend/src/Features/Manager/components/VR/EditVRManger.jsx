import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchVirtualRooms,
  updateVirtualRoom,
} from "../ManagerRedux/VRMangerSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditVRManger = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { virtualRooms } = useSelector((state) => state.virtualRooms);
  const virtualRoom = virtualRooms.find((room) => room._id === id);

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    duration: "",
    link: "",
  });

  const formatStartTimeForInput = (startTime) => {
    if (!startTime) return "";
    const date = new Date(startTime);
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!virtualRoom) {
      dispatch(fetchVirtualRooms());
    } else {
      setFormData({
        title: virtualRoom.title,
        startTime: formatStartTimeForInput(virtualRoom.startTime),
        duration: virtualRoom.duration,
        link: virtualRoom.link,
      });
    }
  }, [id, dispatch, virtualRoom]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    if (!id) {
      toast.error("Error: VR ID is missing!");
      return;
    }

    const payload = { ...formData };
    console.log("Payload being sent:", payload);

    try {
      const result = await dispatch(
        updateVirtualRoom({ id, formData: payload }),
      );

      console.log("Update result:", result);

      if (updateVirtualRoom.fulfilled.match(result)) {
        toast.success("VR updated successfully");
        navigate(-1); // Go back to the previous page
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update VR");
    }
  };

  return (
    <>
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Edit Virtual Rooms
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[220px]"></div>
      </div>
      <div className="dark:bg-DarkManager2 mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditVRManger;
