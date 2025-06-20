import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchVR, updateTeacherVirtualRoom } from "../../TeacherRedux/VRSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditVR = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const teacherVirtualRooms = useSelector(
    (state) => state.teacherVirtualRooms.teacherVirtualRooms,
  );
  const virtualRoom = teacherVirtualRooms.find((room) => room._id === id);

  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    duration: "",
    link: "",
    class_id: "",
    grade_subject_semester_id: "",
  });

  const formatStartTimeForInput = (startTime) => {
    if (!startTime) return "";
    const date = new Date(startTime);
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!virtualRoom) {
      dispatch(fetchVR());
    } else {
      setFormData({
        title: virtualRoom.title,
        startTime: formatStartTimeForInput(virtualRoom.startTime),
        duration: virtualRoom.duration,
        link: virtualRoom.link,
        class_id: virtualRoom.class_id || "",
        grade_subject_semester_id: virtualRoom.grade_subject_semester_id || "",
      });
    }
  }, [id, dispatch, virtualRoom]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add validation for future time
    const selectedStartTime = new Date(formData.startTime);
    const currentTime = new Date();
    
    if (selectedStartTime <= currentTime) {
      toast.error("Please choose a future date and time");
      return;
    }

    console.log("Submitting update:", formData);
    console.log("VR ID:", id);

    if (!id) {
      toast.error("Error: VR ID is missing!");
      return;
    }

    const payload = { ...formData };
    delete payload.grade_subject_semester_id;
    delete payload.class_id;

    console.log("Payload being sent:", payload);

    try {
      const result = await dispatch(
        updateTeacherVirtualRoom({ id, formData: payload }),
      );

      console.log("Update result:", result);

      if (updateTeacherVirtualRoom.fulfilled.match(result)) {
        toast.success("VR updated successfully");
        navigate(-1);
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
          {t("tablesheader.EditVirtualRooms")}
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[220px]"></div>
      </div>
      <div className="mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Title")}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.StartTime")}
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Duration")}
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Link")}
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {t("tablesheader.Update")}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditVR;