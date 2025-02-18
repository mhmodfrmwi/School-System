import React, { useState } from "react";

function EditSchoolHubForm() {
  // بيانات مفترضة كأنها قادمة من الباك
  const initialData = {
    title: "School Hub Example",
    registrationStart: "2025-03-01",
    registrationEnd: "2025-03-15",
    contestDate: "2025-04-01",
    location: "Cairo, Egypt",
    prizes: ["First Place - $1000", "Second Place - $500"],
    details: ["Winner gets a scholarship", "Runner-up gets a certificate"],
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e, index, field) => {
    if (field === "prizes" || field === "details") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
            <button type="button" onClick={() => addField("prizes")} className="mt-2 text-[#117C90]">+ Add Prize</button>
          </div>
          
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">Details</label>
            {formData.details.map((detail, index) => (
              <textarea
                key={index}
                value={detail}
                onChange={(e) => handleChange(e, index, "details")}
                className="mb-2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                rows="3"
              />
            ))}
            <button type="button" onClick={() => addField("details")} className="mt-2 text-[#117C90]">+ Add Detail</button>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSchoolHubForm;
