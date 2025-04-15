import React, { useState } from "react";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "Omar",
    lastName: "Ahmed",
    gender: "Male",
    phoneNumber: "+096624685879",
    email: "omarahmed@gmail.com",
    role: "Manager",
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
      <h1 className="dark:text-DarkManager pl-5 text-2xl font-semibold text-[#244856]">
        Edit Profile
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="relative mb-6 inline-block">
          <img
            src="../src/assets/user1.jpg"
            alt="Profile Avatar"
            className="mr-4 h-24 w-24 rounded-full"
          />
          <button
            className="dark:bg-DarkManager absolute bottom-2 right-2 flex cursor-pointer items-center justify-center rounded-full bg-dashboard-bg p-1 text-white"
            onClick={handleEditPicture}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium dark:text-black">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 bg-gray-100 p-2 dark:placeholder-white"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="dark:bg-DarkManager mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
        >
          Save
        </button>
        <h2 className="mb-4 mt-8 text-xl font-semibold">Edit Password</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium dark:text-black">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={profile.currentPassword}
              onChange={handleInputChange}
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
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
              className="dark:bg-DarkManager2 mt-1 w-full rounded border border-gray-300 p-2 dark:placeholder-white"
            />
          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          className="dark:bg-DarkManager mx-auto mt-4 block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
