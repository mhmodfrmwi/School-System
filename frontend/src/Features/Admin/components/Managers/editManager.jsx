import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editManager, fetchManagers } from "../AdminRedux/managerSlice";
import { useTranslation } from 'react-i18next';
const EditManagerForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { managers } = useSelector((state) => state.managers);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  useEffect(() => {
    const managerToEdit = managers.find((manager) => manager._id === id);
    if (managerToEdit) {
      setFormData({
        fullName: managerToEdit.fullName,
        email: managerToEdit.email,
        password: managerToEdit.password,
        phone: managerToEdit.phone,
        gender: managerToEdit.gender,
      });
    }
  }, [managers, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedManager = { ...formData };
    dispatch(editManager({ id, updatedManager }))
      .unwrap()
      .then(() => {
        navigate("/admin/allmanagers");
      })
      .catch((error) => {});
  };

  return (
    <div className="relative mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 font-poppins text-2xl font-semibold text-[#244856]">
      {t("edit.manager")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form onSubmit={handleSubmit} className="m-6">
          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700 dark:text-white">
            {t("formLabels.fullName")}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.fullName")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700 dark:text-white">
            {t("formLabels.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.email")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700 dark:text-white">
            {t("formLabels.gender")}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="" className="dark:text-white" disabled>
              {t("genderOptions.select")}
              </option>
              <option value="M" className="font-poppins">
              {t("genderOptions.male")}
              </option>
              <option value="F" className="font-poppins">
              {t("genderOptions.female")}
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700 dark:text-white">
            {t("formLabels.password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.password")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-poppins font-medium text-gray-700 dark:text-white">
            {t("formLabels.phoneNumber")}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.phoneNumber")}
              required
            />
          </div>

          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {t("placeholders.SaveChanges")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditManagerForm;
