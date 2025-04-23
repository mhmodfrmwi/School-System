import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSchoolHub } from "../ManagerRedux/schoolhubSlice";
import { useTranslation } from 'react-i18next';


function AddSchoolHubForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

    const cleanedPrizes = formData.prizes.filter(
      (prize) => prize.trim() !== "",
    );

    try {
      await dispatch(
        createSchoolHub({
          ...formData,
          prizes: cleanedPrizes,
        }),
      ).unwrap();

      navigate("/manager/school-hubs");
    } catch (err) {
      console.error("Failed to create school hub:", err);
    }
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
      {t('schoolhubs.AddSchoolHubs')}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="dark:bg-DarkManager2 rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form onSubmit={handleSubmit} className="m-6">
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t('tablesheader.Title')} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t('schoolhubs.phtitle')}
              className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("activities.hubCard.registrationStart")}
              </label>
              <input
                type="date"
                name="registrationStart"
                value={formData.registrationStart}
                onChange={handleChange}
                className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("activities.hubCard.registrationEnd")}
              </label>
              <input
                type="date"
                name="registrationEnd"
                value={formData.registrationEnd}
                onChange={handleChange}
                className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("activities.hubCard.contestDate")}
              </label>
              <input
                type="date"
                name="contestDate"
                value={formData.contestDate}
                onChange={handleChange}
                className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("activityDetails.sections.location")}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={t('schoolhubs.phlocation')}
                className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("activities.hubCard.prizes")}
            </label>
            {formData.prizes.map((prize, index) => (
              <input
                key={index}
                type="text"
                value={prize}
                onChange={(e) => handleChange(e, index, "prizes")}
                placeholder={`${t('schoolhubs.level')} ${index + 1} ${t('schoolhubs.prize')}`}
                className="dark:bg-DarkManager2 mb-2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
              />
            ))}
            <button
              type="button"
              onClick={() => addField("prizes")}
              className="mt-2 rounded-full p-2 text-[#117C90] dark:bg-white dark:text-black"
            >
              + {t('schoolhubs.AddPrize')}
            </button>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("activities.hubCard.details")}
            </label>
            <textarea
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder={t('schoolhubs.phdetails')}
              className="dark:bg-DarkManager2 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:placeholder-white"
              rows="3"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] disabled:bg-gray-400 dark:bg-white dark:text-black"
            >
              {loading ? "Saving..." : t('tablesheader.Upload')}
            </button>
          </div>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddSchoolHubForm;
