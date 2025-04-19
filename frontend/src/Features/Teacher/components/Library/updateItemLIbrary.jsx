import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

import {
  fetchLibraryItemById,
  updateLibraryItemById,
} from "../TeacherRedux/generalLibrarySlice";

const UpdateItemLibrary = () => {
  const { id } = useParams();
  const { t } = useTranslation();
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
      toast.success(t('libraryItem.updateSuccess') || "Updated library");
    } catch (error) {
      toast.error(error?.message || t('libraryItem.updateFailed'));
    }
  };

  return (
    <div className="mx-auto mb-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856] dark:text-DarkManager">
        {t('libraryt.EditMaterial')}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[150px] rounded-t-md bg-[#244856] dark:bg-DarkManager"></div>
      <div className="rounded-3xl bg-[#F5F5F5] dark:bg-DarkManager2 p-6 shadow-md">
        <form onSubmit={handleSubmit} className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t('libraryItem.title')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 dark:border-DarkManager bg-white dark:bg-white px-4 py-2 text-gray-900 dark:text-DarkManager focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:focus:ring-DarkManager"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t('libraryItem.author')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 dark:border-DarkManager bg-white dark:bg-white px-4 py-2 text-gray-900 dark:text-DarkManager focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:focus:ring-DarkManager"
              required
            />
          </div>

          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t('tablesheader.FileUrl')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="libraryUrl"
              value={formData.libraryUrl}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 dark:border-DarkManager bg-white dark:bg-white px-4 py-2 text-gray-900 dark:text-DarkManager focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:focus:ring-DarkManager"
              required
            />
          </div>

          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t('libraryItem.type')}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 dark:border-DarkManager bg-white dark:bg-white px-4 py-2 text-gray-900 dark:text-DarkManager focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:focus:ring-DarkManager"
            >
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div className="col-span-1 mt-4 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-gradient-to-r from-[#105E6A] to-[#117C90] dark:from-DarkManager dark:to-DarkManager px-6 py-2 font-medium text-white transition hover:opacity-90"
            >
              {t('tablesheader.Update')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItemLibrary;
