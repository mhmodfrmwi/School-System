import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import userImage from "../../../assets/user.jpeg";
import SidebarImg from "../../../assets/StudentIcon/sidebar2.jpg";
import Icon1 from "../../../assets/StudentIcon/Icon1.png";
import Icon2 from "../../../assets/StudentIcon/Icon2.png";
import Icon3 from "../../../assets/StudentIcon/Icon3.png";
import Icon4 from "../../../assets/StudentIcon/Icon4.png";
import Icon5 from "../../../assets/StudentIcon/Icon5.png";
import Icon6 from "../../../assets/StudentIcon/Icon6.png";
import Icon7 from "../../../assets/StudentIcon/Icon7.png";
import Icon8 from "../../../assets/StudentIcon/Icon8.png";
import Icon9 from "../../../assets/StudentIcon/Icon9.png";
import Icon10 from "../../../assets/StudentIcon/Icon10.png";
import Icon11 from "../../../assets/StudentIcon/Icon11.png";
import Icon12 from "../../../assets/StudentIcon/Icon12.png";

const Sidebar = ({ closeSidebar }) => {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Home", icon: Icon1, path: "/student" },
        { label: "Motivation", icon: Icon2, path: "/student/motivation" },
        { label: "Courses", icon: Icon3, path: "/student/allcourses" },
        { label: "Absence", icon: Icon4, path: "/student/attendance" },
        { label: "Schedule", icon: Icon5, path: "/student/schedule" },
        { label: "Grade Managements", icon: Icon6, path: "/student/grades" },
        { label: "Activities", icon: Icon7, path: "/student/activities" },
        { label: "Library", icon: Icon8, path: "/student/librarybooksenglish" },
        { label: "Question Bank", icon: Icon9, path: "/student/question-bank" },
        { label: "Virtual Rooms", icon: Icon10, path: "/student/virtualrooms" },
        { label: "Chats", icon: Icon11, path: "/student/chats" },
        { label: "Logout", icon: Icon12, path: "/login" },
    ];

    return (
        <div className="fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transition-transform transform duration-300 ease-in-out">
        <div className="relative p-6 bg-[#EEE8F6] text-[#043B44]">
            <button
                onClick={closeSidebar}
                className="absolute top-2 right-1 text-2xl text-[#043B44] hover:text-gray-600"
            >
                <div
                    className="flex items-center font-poppins bg-[#c0cce6] justify-center w-7 h-7 rounded-full mr-2">
                    <FontAwesomeIcon icon={faTimes} className="mx-4 h-4 w-4 " />
                </div>
            </button>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold font-poppins">Khatab School</h2>
                    <p className="text-sm font-poppins text-gray-400">Term1 2025-2026</p>
                </div>
                <img src={SidebarImg} alt="Logo" className="h-20 w-20" />
            </div>
        </div>
    
        <div className="flex items-center p-4">
            <img src={userImage} alt="User" className="h-10 w-10 rounded-full" />
            <div className="ml-2">
                <p className="font-semibold font-poppins">Zaina Shaheen</p>
                <p className="text-sm font-poppins text-gray-400">G/3 Student</p>
            </div>
        </div>
    
        <nav className="mt-4 h-[calc(100vh-200px)] overflow-y-auto">
            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => navigate(item.path)}
                        className="cursor-pointer p-2 flex items-center transition-transform duration-200 hover:bg-gray-100 hover:shadow-sm font-poppins"
                    >
                        <img src={item.icon} alt={`${item.label} icon`} className="h-6 w-6 mr-2" />
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
        

        <style jsx>{`
            nav::-webkit-scrollbar {
                display: none;
            }
            nav {
                -ms-overflow-style: none; 
                scrollbar-width: none; 
            }
        `}</style>
    </div>
    
    
    );
};

export default Sidebar;