import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSchoolHub } from "../ManagerRedux/schoolhubSlice";

function AddSchoolHubForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.schoolhub);

  const [formData, setFormData] = useState({
    title: "",
    registrationStart: "",
    registrationEnd: "",
    contestDate: "",
    location: "",
    prizes: [""],
    details: "",
  });

  const handleChange = (e, index, field) => {
    if (field === "prizes") {
      const updatedArray = [...formData[field]];
      updatedArray[index] = e.target.value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const cleanedPrizes = formData.prizes.filter((prize) => prize.trim() !== "");

   
    try {
      await dispatch(
        createSchoolHub({
          ...formData,
          prizes: cleanedPrizes,
        })
      ).unwrap(); 

     
      navigate("/manager/school-hubs");
    } catch (err) {
      console.error("Failed to create school hub:", err);
    }
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Add School Hub</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form onSubmit={handleSubmit} className="m-6">
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter school hub title"
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700">Registration Start</label>
              <input
                type="date"
                name="registrationStart"
                value={formData.registrationStart}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700">Registration End</label>
              <input
                type="date"
                name="registrationEnd"
                value={formData.registrationEnd}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700">Contest Date</label>
              <input
                type="date"
                name="contestDate"
                value={formData.contestDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter school hub location"
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Prizes</label>
            {formData.prizes.map((prize, index) => (
              <input
                key={index}
                type="text"
                value={prize}
                onChange={(e) => handleChange(e, index, "prizes")}
                placeholder={`Level ${index + 1} Prize`}
                className="mb-2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              />
            ))}
            <button type="button" onClick={() => addField("prizes")} className="mt-2 text-[#117C90] ">
              + Add Prize
            </button>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Details</label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Enter school hub details"
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              rows="3"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddSchoolHubForm;