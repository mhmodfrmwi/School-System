import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAdmin } from "../AdminRedux/adminSlice";
import { useTranslation } from 'react-i18next';
const EditAdminForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.admins);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const admin = admins.find((admin) => admin._id === id);
    if (admin) {
      setFormData({
        fullName: admin.fullName || "",
        email: admin.email || "",
        phone: admin.phone || "",
        gender: admin.gender || "",
        password: admin.password || "", // Leave this empty for security reasons
      });
    }
  }, [id, admins]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Ensure all required fields are filled
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.gender
    ) {
      alert(t("validation.requiredFields"));
      setIsSubmitting(false);
      return;
    }

    const updatedAdmin = { ...formData };
    if (!formData.password) delete updatedAdmin.password;

    try {
      await dispatch(editAdmin({ id, updatedAdmin })).unwrap();
      navigate("/admin/alladmins");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">{t("edit.admin")}</h1>
      <div className="ml-3 mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form onSubmit={handleSubmit} className="m-6">
          {/* Full Name */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("formLabels.fullName")}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.fullName")}
              required
            />
          </div>

          {/* Email and Gender */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                placeholder={t("placeholders.email")}
                required
              />
            </div>
            <div>
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.gender")}
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90]"
                required
              >
                <option value="" className="dark:text-white" disabled>
                {t("genderOptions.select")}
                </option>
                <option value="M">{t("genderOptions.male")}</option>
                <option value="F">{t("genderOptions.female")}</option>
              </select>
            </div>
          </div>

          {/* Password and Phone */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.password")}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                placeholder={t("placeholders.password1")}
              />
            </div>
            <div>
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.phoneNumber")}
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                placeholder={t("placeholders.phoneNumber")}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-md mx-auto mt-6 block rounded-3xl bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {isSubmitting ? t("placeholders.Updating") : t("placeholders.SaveChanges")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdminForm;
