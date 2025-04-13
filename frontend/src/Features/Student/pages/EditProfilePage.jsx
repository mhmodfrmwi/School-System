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
        <div className="w-[80%] mx-auto my-10 font-poppins">
            <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#E47986] to-[#BC6FFB] pl-5">
                {t('editProfile.title')}
            </h1>
            <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-gradient-to-r from-[#CE4EA0] via-[#E47986] to-[#BC6FFB] ml-3"></div>

            <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="relative inline-block mb-6 ">
                    <img
                        src="../src/assets/user1.jpg"
                        alt={t('editProfile.profileImageAlt')}
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <button
                        className="absolute bottom-2 right-2 bg-[#7393d6] text-white p-1 rounded-full cursor-pointer flex items-center justify-center"
                        onClick={handleEditPicture}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.firstName')}</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF] "
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.lastName')}</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.gender')}</label>
                        <select
                            name="gender"
                            value={profile.gender}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        >
                            <option value="Male">{t('editProfile.genderMale')}</option>
                            <option value="Female">{t('editProfile.genderFemale')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.phoneNumber')}</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.email')}</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.role')}</label>
                        <input
                            type="text"
                            name="role"
                            value={profile.role}
                            readOnly
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF] bg-gray-100"
                        />
                    </div>
                </div>


                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#849ED7] text-white rounded-md font-medium hover:bg-[#7393d6] transition mx-auto block"
                >
                    {t('editProfile.saveButton')}
                </button>


                <h2 className="text-xl font-semibold mt-8 mb-4">{t('editProfile.changePasswordTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.currentPassword')}</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={profile.currentPassword}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.newPassword')}</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={profile.newPassword}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.confirmPassword')}</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={profile.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">{t('editProfile.otpCode')}</label>
                        <input
                            type="text"
                            name="otpCode"
                            value={profile.otpCode}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded text-[#718EBF]"
                        />
                    </div>
                </div>

                <button
                    onClick={handlePasswordChange}
                    className="mt-4 px-6 py-2 bg-[#849ED7] text-white rounded-md font-medium hover:bg-[#7393d6] transition mx-auto block"
                >
                    {t('editProfile.changePasswordButton')}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;