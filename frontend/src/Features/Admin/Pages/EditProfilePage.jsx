import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    firstName: "Omar",
    lastName: "Ahmed",
    gender: "Male",
    phoneNumber: "+096624685879",
    email: "omarahmed@gmail.com",
    role: "Admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    otpCode: "",
  });

  const handleEditPicture = () => {
    console.log("Edit picture button clicked");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Profile saved:", profile);
  };

  const handlePasswordChange = () => {
    // Handle password change logic here
    console.log("Password updated:", {
      currentPassword: profile.currentPassword,
      newPassword: profile.newPassword,
      otpCode: profile.otpCode,
    });
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
      {t('editProfile.title')}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="relative mb-6 inline-block">
          <img
            src="../src/assets/user1.jpg"
            alt={t('editProfile.profileImageAlt')}
            className="mr-4 h-24 w-24 rounded-full"
          />
          <button
            className="absolute bottom-2 right-2 flex cursor-pointer items-center justify-center rounded-full bg-dashboard-bg p-1 text-white"
            onClick={handleEditPicture}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.firstName')}
            </label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.lastName')}
            </label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.gender')}
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="Male">{t('editProfile.genderMale')}</option>
              <option value="Female">{t('editProfile.genderFemale')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.phoneNumber')}
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.email')}
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.role')}
            </label>
            <input
              type="text"
              name="role"
              value={profile.role}
              readOnly
              className="mt-1 w-full rounded border border-gray-300 bg-gray-100 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
        >
          {t('editProfile.saveButton')}
        </button>

        <h2 className="mb-4 mt-8 text-xl font-semibold dark:text-black">
        {t('editProfile.changePasswordTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.currentPassword')}
            </label>
            <input
              type="password"
              name="currentPassword"
              value={profile.currentPassword}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.newPassword')}
            </label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.confirmPassword')}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-black">
            {t('editProfile.otpCode')}
            </label>
            <input
              type="text"
              name="otpCode"
              value={profile.otpCode}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 dark:bg-[#117C90] dark:placeholder-white"
            />
          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          className="mx-auto mt-4 block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
        >
          {t('editProfile.changePasswordButton')}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
