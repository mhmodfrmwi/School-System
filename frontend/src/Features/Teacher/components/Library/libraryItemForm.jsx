import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { createLibraryItem } from "../TeacherRedux/generalLibrarySlice";

function LibraryItemForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    libraryUrl: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createLibraryItem(formData));
      setFormData({
        title: "",
        author: "",
        libraryUrl: "",
        type: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto mb-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Library Item
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[150px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Library URL
            </label>
            <input
              type="url"
              name="libraryUrl"
              value={formData.libraryUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select type</option>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div className="col-span-1 mt-4 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Add Library Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LibraryItemForm;
