import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateAdminProfile, fetchAdminData } from '../components/AdminRedux/AdminEditProfileSlice';
import { FaEye, FaPen, FaEyeSlash, FaCamera } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { t } = useTranslation();

    const {
        profile: adminData,
        fetchStatus,
        fetchError,
        error,
        success
    } = useSelector((state) => state.adminProfile || {});

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        email: "",
        role: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [profileImage, setProfileImage] = useState("../src/assets/user1.jpg");
    const [selectedImage, setSelectedImage] = useState(null);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    useEffect(() => {
        console.log('Full admin Data:', adminData);
        if (adminData && adminData.data) {
            console.log('Actual admin Data:', adminData.data);
        }
    }, [adminData]);

    useEffect(() => {
        dispatch(fetchAdminData());
    }, [dispatch]);

    useEffect(() => {
        if (adminData && adminData.data) {
            const admin = adminData.data;
            setProfile({
                firstName: admin.fullName?.split(' ')[0] || "",
                lastName: admin.fullName?.split(' ').slice(1).join(' ') || "",
                gender: admin.gender === "M" ? "Male" : admin.gender === "F" ? "Female" : "Other",
                phone: admin.phone || "",
                email: admin.email || "",
                role: "Admin",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            if (admin.profileImage) {
                setProfileImage(admin.profileImage);
            } else {
                setProfileImage("../src/assets/user.jpg");
            }
        }
    }, [adminData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    useEffect(() => {
        if (success) {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        const formData = new FormData();
        formData.append('phone', profile.phone);

        if (isEditingPassword) {
            if (profile.newPassword !== profile.confirmPassword) {
                toast.error(" New password does not match ");
                return;
            }
            formData.append('currentPassword', profile.currentPassword);
            formData.append('newPassword', profile.newPassword);
        }

        if (selectedImage) {
            formData.append('profileImage', selectedImage);
        }

        dispatch(updateAdminProfile(formData)).then(() => {
            setSelectedImage(null);
        });
    };
    if (fetchStatus === 'loading') {
        return <div className="text-center py-10">Loading profile data...</div>;
    }

    if (fetchStatus === 'failed') {
        return <div className="text-center py-10 text-red-500">{fetchError || 'Failed to load profile data'}</div>;
    }


    return (
        <div className="w-[80%] mx-auto my-10 font-poppins">
            <h1 className="text-2xl font-semibold text-[#244856] dark:text-DarkManager pl-5">
                {t('editProfile.title')}
            </h1>
            <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="relative inline-block mb-6">
                    <img
                        src={profileImage || "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"}
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full mr-4 object-cover"
                        onError={(e) => {
                            e.target.src = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";
                        }}
                    />
                    <button
                        className="absolute bottom-2 right-2 bg-dashboard-bg text-white p-2 rounded-full cursor-pointer flex items-center justify-center dark:bg-DarkManager"
                        onClick={triggerFileInput}
                    >
                        <FaCamera size={14} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            {t('editProfile.firstName')}
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2"
                            disabled
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
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            {t('editProfile.gender')}
                        </label>
                        <select
                            name="gender"
                            value={profile.gender}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2"
                            disabled
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className=" text-sm font-medium dark:text-black flex items-center gap-1">
                            {t('editProfile.phoneNumber')}
                            <FaPen className="text-xs text-blue-500" />
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2"
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
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2"
                            disabled
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
                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100 dark:bg-DarkManager2"
                            disabled
                        />
                    </div>
                </div>

                <button
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition mx-auto block dark:bg-DarkManager mb-4"
                >
                    {isEditingPassword ? t('assignmentt.Cancel') : t('editProfile.changePasswordButton')}
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
                    className="mt-4 px-6 py-2 bg-[#117C90] text-white rounded-md font-medium hover:bg-[#0f6b7c] transition mx-auto block dark:bg-DarkManager"
                >
                    {t('editProfile.saveButton')}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;