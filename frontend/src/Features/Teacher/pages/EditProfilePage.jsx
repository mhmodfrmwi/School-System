import React, { useState } from "react";

const EditProfile = () => {
    const [profile, setProfile] = useState({
        firstName: "Omar",
        lastName: "Ahmed",
        gender: "Male",
        phoneNumber: "+096624685879",
        email: "omarahmed@gmail.com",
        role: "Teacher",
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
        console.log("Profile saved:", profile);
    };

    const handlePasswordChange = () => {
        console.log("Password updated:", {
            currentPassword: profile.currentPassword,
            newPassword: profile.newPassword,
            otpCode: profile.otpCode,
        });
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
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#117C90] text-white rounded-md font-medium hover:bg-[#0f6b7c] transition mx-auto block dark:bg-DarkManager"
                >
                    Save
                </button>

                <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-DarkManager">
                    Edit Password
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={profile.currentPassword}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={profile.newPassword}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            Re-enter New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={profile.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium dark:text-black">
                            OTP Code
                        </label>
                        <input
                            type="text"
                            name="otpCode"
                            value={profile.otpCode}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded dark:bg-DarkManager2 dark:placeholder-white"
                        />
                    </div>
                </div>

                <button
                    onClick={handlePasswordChange}
                    className="mt-4 px-6 py-2 bg-[#117C90] text-white rounded-md font-medium hover:bg-[#0f6b7c] transition mx-auto block dark:bg-DarkManager"
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default EditProfile;