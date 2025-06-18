import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateStudentProfile, fetchStudentData } from '../components/StudentRedux/StudentEditProfileSlice';
import { useTranslation } from 'react-i18next';
import { FaEye, FaPen, FaEyeSlash, FaCamera } from 'react-icons/fa';
import backgroundWaves from "../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../assets/StudentIcon/bg-color1.png";
import { Card } from "@/components/ui/card";

const EditProfile = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { t } = useTranslation();

    const {
        profile: studentData,
        fetchStatus,
        fetchError,
        error,
        success
    } = useSelector((state) => state.studentProfile || {});

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
        dispatch(fetchStudentData());
    }, [dispatch]);

    useEffect(() => {
        if (studentData && studentData.data) {
            const student = studentData.data;
            setProfile({
                firstName: student.fullName?.split(' ')[0] || "",
                lastName: student.fullName?.split(' ').slice(1).join(' ') || "",
                gender: student.gender === "M" ? "Male" : student.gender === "F" ? "Female" : "Other",
                phone: student.phone || "",
                email: student.email || "",
                role: "Student",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
    
            if (student.profileImage) {
                setProfileImage(student.profileImage);
            }else {
                setProfileImage("../src/assets/user.jpg");
            }
        }
    }, [studentData]);

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

        dispatch(updateStudentProfile(formData)).then(() => {
            setSelectedImage(null);
        });
    };

    if (fetchStatus === 'loading') {
        return <div className="text-center py-10 dark:text-gray-300">Loading profile data...</div>;
    }

    if (fetchStatus === 'failed') {
        return <div className="text-center py-10 text-red-500 dark:text-red-400">{fetchError || 'Failed to load profile data'}</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#13082F] relative">
            {/* Background Elements */}
            <div
                className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{ backgroundImage: `url(${backgroundStars})` }}
            ></div>
            <div
                className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
                style={{ backgroundImage: `url(${backgroundWaves})` }}
            ></div>
            
            <div className="relative z-10 w-[80%] mx-auto py-10 font-poppins">
                <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#E47986] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] pl-5">
                    {t('editProfile.title')}
                </h1>
                <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-gradient-to-r from-[#CE4EA0] via-[#E47986] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ml-3"></div>

                <Card className="p-6 bg-white dark:bg-[#281459] rounded-lg shadow-lg border border-gray-200 dark:border-[#E0AAEE] mt-6">
                    <div className="relative inline-block mb-6">
                        <img
                            src={profileImage || "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"}
                            alt="Profile Avatar"
                            className="w-24 h-24 rounded-full mr-4 object-cover border-4 border-white dark:border-[#4B3B7A]"
                            onError={(e) => {
                                e.target.src = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";
                            }}
                        />
                        <button
                            className="absolute bottom-2 right-2 bg-[#849ED7] dark:bg-[#AE45FB] text-white p-2 rounded-full cursor-pointer flex items-center justify-center hover:bg-[#7393d6] dark:hover:bg-[#9D3AEB] transition"
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
                            <label className="block text-sm font-medium dark:text-gray-300">{t('editProfile.firstName')}</label>
                            <input
                                type="text"
                                name="firstName"
                                value={profile.firstName}
                                className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">{t('editProfile.lastName')}</label>
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">{t('editProfile.gender')}</label>
                            <select
                                name="gender"
                                value={profile.gender}
                                className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300"
                                disabled
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium dark:text-gray-300 flex items-center gap-1">
                                {t('editProfile.phoneNumber')}
                                <FaPen className="text-xs text-blue-500 dark:text-blue-400" />
                            </label>                        
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">{t('editProfile.email')}</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">{t('editProfile.role')}</label>
                            <input
                                type="text"
                                name="role"
                                value={profile.role}
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100 dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300"
                                disabled
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditingPassword(!isEditingPassword)}
                        className="px-6 py-2 bg-gray-500 dark:bg-[#4B3B7A] text-white rounded-md font-medium hover:bg-gray-600 dark:hover:bg-[#5A4A8A] transition mx-auto block mb-4"
                    >
                        {isEditingPassword ? t('assignmentt.Cancel')  : t('editProfile.changePasswordButton')}
                    </button>

                    {isEditingPassword && (
                        <>
                            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-gray-300">
                                {t('editProfile.changePasswordButton')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        {t('editProfile.currentPassword')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.current ? "text" : "password"}
                                            name="currentPassword"
                                            value={profile.currentPassword}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300 pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                            onClick={() => togglePasswordVisibility('current')}
                                        >
                                            {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        {t('editProfile.newPassword')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.new ? "text" : "password"}
                                            name="newPassword"
                                            value={profile.newPassword}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300 pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                            onClick={() => togglePasswordVisibility('new')}
                                        >
                                            {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        {t('editProfile.confirmPassword')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.confirm ? "text" : "password"}
                                            name="confirmPassword"
                                            value={profile.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-[#1A0C3D] dark:border-[#4B3B7A] dark:text-gray-300 pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
                        className="mt-4 px-6 py-2 bg-[#849ED7] dark:bg-[#AE45FB] text-white rounded-md font-medium hover:bg-[#7393d6] dark:hover:bg-[#9D3AEB] transition mx-auto block"
                    >
                        {t('editProfile.saveButton')}
                    </button>
                </Card>
            </div>
        </div>
    );
};

export default EditProfile;