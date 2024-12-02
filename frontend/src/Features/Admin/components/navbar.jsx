import React from "react";
import { FaSearch, FaBell, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { ReactSVG } from 'react-svg';
import InfoIcon from '../../../assets/icons/Info.svg';
import Mode from '../../../assets/icons/Mode.svg';
import userImage from '../../../assets/user.jpeg';


const Navbar = () => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1); // Navigates to the previous page
    };
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between bg-white px-4 shadow-md w-full h-16 max-w-full">
                {/* Left Section - Back Button */}
                <div className="flex items-center space-x-3">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="p-2 bg-dashboard-bg text-white rounded-lg hidden lg:flex"
                >
                  <FaArrowLeft className="text-lg" />
                </button>
                <p className="text-lg font-semibold font-inter text-dashboard-header hidden lg:flex">
                  Dashboard
                </p>
              </div>

                {/* Search Section */}
                <div className="flex items-center flex-1 mx-4 space-x-2">
                    {/* Full Search (Visible on md and above) */}
                    <div className="relative w-full max-w-sm ml-auto hidden sm:flex">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-400 text-lg" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search items, collections, and users"
                            className="w-full py-2 pl-12 pr-12 border rounded-full focus:outline-none font-poppins text-sm md:text-base bg-search-bg text-center md:text-left"
                            style={{
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                            }}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <FontAwesomeIcon icon={faSliders} className="text-gray-400 text-lg" />
                        </div>
                    </div>

                    {/* Search Icon (Visible on smaller screens) */}
                    <button className="flex sm:hidden ml-auto text-gray-500">
                        <FaSearch className="text-xl" />
                    </button>
                </div>

                {/* Right Section - Notifications, Profile, Dark Mode */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <button className="relative p-2 text-gray-500">
                        <FaBell className="text-xl" />
                        <span className="absolute top-1 right-2 block w-3.5 h-3.5 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="p-2 text-gray-500 text-xl">
                        <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                    </button>
                    <button className="p-2 text-gray-500">
                        <ReactSVG src={InfoIcon} className="h-auto w-auto" />
                    </button>
                    <button className="p-2 text-gray-500">
                        <ReactSVG src={Mode} className="h-auto w-auto" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <img
                            src= {userImage}
                            alt="User"
                            className="w-8 h-8 rounded-full md:w-10 md:h-10"
                        />
                        <span className="text-dashboard-header font-semibold font-poppins text-sm md:text-base hidden lg:flex">
                            Yasser
                        </span>
                    </div>
                    <button className="p-2 text-gray-500 text-2xl md:text-3xl">
                        <IoSettingsOutline />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
