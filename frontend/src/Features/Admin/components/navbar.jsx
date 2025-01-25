import React, { useState } from "react";
import { FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { ReactSVG } from "react-svg";
import InfoIcon from "../../../assets/icons/Info.svg";
import Mode from "../../../assets/icons/Mode.svg";
import userImage from "../../../assets/user.jpeg";
import language from "../../../assets/icons/language.svg";
import Vector from "../../../assets/icons/Vector.svg";
import logout from "../../../assets/icons/logout.svg";
import ThemeSwitcher from "@/ui/ThemeSwitcher";

const Navbar = () => {
  const navigate = useNavigate();
  const [settingToggle, setSettingToggle] = useState(false);
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const url = window.location.pathname; // e.g., "/user/john"
  const name = url.split("/").pop(); // Gets the last part: "john"

  return (
    <div className="relative">
      <div className="flex h-16 w-full max-w-full items-center justify-between bg-white px-4 shadow-md">
        {/* Left Section - Back Button */}
        <div className="flex items-center space-x-3">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="hidden rounded-lg bg-dashboard-bg p-2 text-white lg:flex"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <p
            className="hidden font-inter text-lg font-semibold text-dashboard-header lg:flex"
            onClick={() => {
              `${name}` !== "admin" && navigate(`/admin/${name}`);
            }}
          >
            {name}
          </p>
        </div>

        {/* Search Section */}
        <div className="mx-4 flex flex-1 items-center space-x-2">
          {/* Full Search (Visible on md and above) */}
          <div className="relative ml-auto hidden w-full max-w-sm sm:flex">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
              <FaSearch className="text-lg text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items, collections, and users"
              className="w-full rounded-full border bg-search-bg py-2 pl-12 pr-12 text-center font-poppins text-sm focus:outline-none md:text-left md:text-base"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
              <FontAwesomeIcon
                icon={faSliders}
                className="text-lg text-gray-400"
              />
            </div>
          </div>

          {/* Search Icon (Visible on smaller screens) */}
          <button className="ml-auto flex text-gray-500 sm:hidden">
            <FaSearch className="text-xl" />
          </button>
        </div>

        {/* Right Section - Notifications, Profile, Dark Mode */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="relative p-2 text-gray-500">
            <FaBell className="text-xl" />
            <span className="absolute right-2 top-1 block h-3.5 w-3.5 rounded-full bg-red-500"></span>
          </button>
          <button className="p-2 text-xl text-gray-500">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
          </button>
          <button className="p-2 text-gray-500">
            <ReactSVG src={InfoIcon} className="h-auto w-auto" />
          </button>
          <ThemeSwitcher />
          {/* <button className="p-2 text-gray-500">
            <ReactSVG src={Mode} className="h-auto w-auto" />
          </button> */}
          <div className="flex items-center space-x-2">
            <img
              src={userImage}
              alt="User"
              className="h-8 w-8 rounded-full md:h-10 md:w-10"
            />
            <span className="hidden font-poppins text-sm font-semibold text-dashboard-header md:text-base lg:flex">
              Yasser
            </span>
          </div>
          <button
            className="p-2 text-2xl text-gray-500 md:text-3xl"
            onClick={() => setSettingToggle(!settingToggle)}
          >
            <IoSettingsOutline />
          </button>

          {settingToggle && (
            <div className="absolute right-5 top-20 z-20 h-72 w-56 rounded-xl bg-gradient-to-b from-[#99C7CF] to-[#117C90]">
              <div>
                <div className="mx-auto ms-7 mt-3 flex flex-row items-center">
                  <button className="p-2 text-gray-500">
                    <ReactSVG src={Vector} className="r h-auto w-auto" />
                  </button>
                  <h2 className="font-semibold text-white">Edit Profile</h2>
                </div>
                <p className="mx-auto my-2 w-40 border-b-2 border-white"></p>
              </div>
              {/* <button className="ms-14 p-2 text-gray-500">
                <ReactSVG src={Mode} className="r h-auto w-auto" />
              </button> */}
              <div className="ms-20">
                <ThemeSwitcher />
              </div>
              <p className="mx-auto my-2 w-28 border-b-2 border-white"></p>
              <button className="mx-auto ms-6 p-2 text-gray-500">
                <ReactSVG src={language} className="r h-auto w-auto" />
              </button>
              <p className="mx-auto my-2 w-28 border-b-2 border-white"></p>

              <div
                className="mx-auto ms-12 mt-5 flex flex-row items-center"
                onClick={() => navigate("/login")}
              >
                <button className="p-2 text-gray-500">
                  <ReactSVG src={logout} className="r h-auto w-auto" />
                </button>
                <h2 className="font-semibold text-white">Logout</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
