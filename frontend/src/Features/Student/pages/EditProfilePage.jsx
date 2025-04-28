import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateStudentProfile } from '../components/StudentRedux/StudentEditProfileSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // Safely access userInfo with fallback values
    const userInfo = useSelector((state) => state.auth?.userInfo || {});
    const { error, success } = useSelector((state) => state.teacher || {});

    const [profile, setProfile] = useState({
        firstName: userInfo?.firstName || "",
        lastName: userInfo?.lastName || "",
        gender: userInfo?.gender || "Male",
        phoneNumber: userInfo?.phone || "",
        email: userInfo?.email || "",
        role: userInfo?.role || "Student",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    useEffect(() => {
        if (success) {
            toast.success("Profile updated successfully");
            if (isEditingPassword) {
                setProfile(prev => ({
                    ...prev,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                }));
                setIsEditingPassword(false);
            }
        }

        if (error) {
            toast.error(error);
        }
    }, [success, error, isEditingPassword]);

    const handleEditPicture = () => {
        console.log("Edit picture button clicked");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        const profileData = {
            phone: profile.phoneNumber,
        };

        if (isEditingPassword) {
            if (profile.newPassword !== profile.confirmPassword) {
                toast.error("New passwords don't match");
                return;
            }
            profileData.currentPassword = profile.currentPassword;
            profileData.newPassword = profile.newPassword;
        }

        dispatch(updateStudentProfile(profileData));
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
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition mx-auto block dark:bg-DarkManager mb-4"
                >
                    {isEditingPassword ? "Cancel Password Change" : t('editProfile.changePasswordButton')   }
                </button>

                {isEditingPassword && (
                    <>
                        <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-DarkManager">
                        {t('editProfile.changePasswordButton')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-sm font-medium dark:text-black">
                                {t('editProfile.currentPassword')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.current ? "text" : "password"}
                                        name="currentPassword"
                                        value={profile.currentPassword}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() => togglePasswordVisibility('current')}
                                    >
                                        {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium dark:text-black">
                                {t('editProfile.newPassword')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        name="newPassword"
                                        value={profile.newPassword}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() => togglePasswordVisibility('new')}
                                    >
                                        {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium dark:text-black">
                                {t('editProfile.confirmPassword')}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={profile.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                    >
                                        {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <button
                onClick={handleSave}
                    className="mt-4 px-6 py-2 bg-[#849ED7] text-white rounded-md font-medium hover:bg-[#7393d6] transition mx-auto block"
                >
                    {t('editProfile.saveButton')}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;