import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdmin } from "../AdminRedux/adminSlice";
import { useTranslation } from "react-i18next";
function AdminForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.gender === "Male"
      ? (formData.gender = "M")
      : (formData.gender = "F");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.gender
    ) {
      alert(t("validation.requiredFields"));
      return;
    }
    // const phoneRegex = /^[0-9]{11}$/;
    // if (!phoneRegex.test(formData.phoneNumber)) {
    //   toast.error(t("validation.phoneValidation"));
    //   return;
    // }

    // const genderMap = {
    //   Male: t("genderOptions.male"),
    //   Female: t("genderOptions.female"),
    //   Other: "O",
    // };

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phoneNumber,
      gender: formData.gender,
    };

    try {
      await dispatch(postAdmin(payload));
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("validation.errorMessage");
      alert(errorMessage);
    }
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        {" "}
        {t("adminHeader.add")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Full Name and Email */}
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
          <div className="mb-4">
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

          {/* Gender and Password */}
          <div className="mb-4">
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
              <option value="">{t("genderOptions.select")}</option>
              <option value={t("genderOptions.male")}>
                {t("genderOptions.male")}
              </option>
              <option value={t("genderOptions.female")}>
                {t("genderOptions.female")}
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.password")}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("formLabels.phoneNumber")}
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder={t("placeholders.phoneNumber")}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 mt-4 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("adminHeader.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForm;
