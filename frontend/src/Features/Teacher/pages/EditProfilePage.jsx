import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTeacherProfile } from '../components/TeacherRedux/TeacherEditProfileSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const EditProfile = () => {
    const dispatch = useDispatch();

    // Safely access userInfo with fallback values
    const userInfo = useSelector((state) => state.auth?.userInfo || {});
    const { error, success } = useSelector((state) => state.teacher || {});

    const [profile, setProfile] = useState({
        firstName: userInfo?.firstName || "",
        lastName: userInfo?.lastName || "",
        gender: userInfo?.gender || "Male",
        phoneNumber: userInfo?.phone || "",
        email: userInfo?.email || "",
        role: userInfo?.role || "Teacher",
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

        dispatch(updateTeacherProfile(profileData));
    };




    return (
        <div className="w-[80%] mx-auto my-10 font-poppins">
            <h1 className="text-2xl font-semibold text-[#244856] dark:text-DarkManager pl-5">
                Edit Profile
            </h1>
            <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <div className="relative inline-block mb-6">
                    <img
                        src="../src/assets/user1.jpg"
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <button
                        className="absolute bottom-2 right-2 bg-dashboard-bg text-white p-1 rounded-full cursor-pointer flex items-center justify-center dark:bg-DarkManager"
                    onClick={handleEditPicture}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={profile.gender}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                            disabled
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            Role
                        </label>
                        <input
                            type="text"
                            name="role"
                            value={profile.role}
                            readOnly
                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100 dark:bg-DarkManager2 dark:placeholder-white"
                        />
                    </div>
                </div>

                <button
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md font-medium hover:bg-gray-600 transition mx-auto block dark:bg-DarkManager mb-4"
                >
                    {isEditingPassword ? "Cancel Password Change" : "Change Password"}
                </button>

                {isEditingPassword && (
                    <>
                        <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-DarkManager">
                            Edit Password
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="block text-sm font-medium dark:text-black">
                                    Current Password
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
                                    New Password
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
                                    Re-enter New Password
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
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditProfile;