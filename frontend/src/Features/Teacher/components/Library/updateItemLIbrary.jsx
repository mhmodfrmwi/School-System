import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchLibraryItemById,
  updateLibraryItemById,
} from "../TeacherRedux/generalLibrarySlice";

const UpdateItemLibrary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { generalLibrary } = useSelector((state) => state.generalLibrary || {});

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    libraryUrl: "",
    type: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchLibraryItemById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (generalLibrary) {
      setFormData({
        title: generalLibrary.title,
        author: generalLibrary.author,
        libraryUrl: generalLibrary.item_url,
        type: generalLibrary.type,
      });
    }
  }, [generalLibrary]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateLibraryItemById({ id, updatedData: formData }));

      toast.success("Updated library");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Edit Material
        </h1>

        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[190px]"></div>
      </div>
      <div className="mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-poppins font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">
              Library URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="libraryUrl"
              value={formData.libraryUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c]"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateItemLibrary;
