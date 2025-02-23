import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolHubs, updateSchoolHub } from "../ManagerRedux/schoolhubSlice"; 


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function EditSchoolHubForm() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schoolHubs, loading, error } = useSelector((state) => state.schoolhub);

  
  useEffect(() => {
    dispatch(getSchoolHubs());
  }, [dispatch]);

 
  const schoolHub = schoolHubs.find((hub) => hub._id === id);

  
  const [formData, setFormData] = useState({
    title: schoolHub?.title || "",
    registrationStart: schoolHub?.registrationStart ? formatDate(schoolHub.registrationStart) : "",
    registrationEnd: schoolHub?.registrationEnd ? formatDate(schoolHub.registrationEnd) : "",
    contestDate: schoolHub?.contestDate ? formatDate(schoolHub.contestDate) : "",
    location: schoolHub?.location || "",
    prizes: schoolHub?.prizes || [""],
    details: schoolHub?.details || "",
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
        updateSchoolHub({
          schoolHubId: id,
          updatedData: {
            ...formData,
            prizes: cleanedPrizes,
          },
        })
      ).unwrap(); 

     
      navigate("/manager/school-hubs");
    } catch (err) {
      console.error("Failed to update school hub:", err);
    }
  };

  if (!schoolHub) return <div>Loading...</div>; 

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Edit School Hub</h1>
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
                className="mb-2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              />
            ))}
            <button type="button" onClick={() => addField("prizes")} className="mt-2 text-[#117C90]">
              + Add Prize
            </button>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditSchoolHubForm;