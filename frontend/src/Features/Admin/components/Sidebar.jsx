import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faCalendar,
  faPen,
  faChartPie,
  faClock,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logologin.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menuItems = [
    { label: "Dashboard", icon: faHome, href: "#dashboard" },
    { label: "Members", icon: faUsers, href: "/students/BasicForm" },
    { label: "Term Management", icon: faCalendar, href: "#term-management" },
    { label: "Course Management", icon: faPen, href: "#course-management" },
    { label: "Reports & Analytics", icon: faChartPie, href: "#reports" },
    { label: "Schedule Management", icon: faClock, href: "#schedule-management" },
  ];

  return (
    <div className="relative">
      {/* Toggle Button for Small Screens */}
      <button
        className="lg:hidden fixed top-8 left-5 z-50 bg-dashboard-bg text-white rounded-lg shadow-md p-2 w-9 h-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Sidebar with Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        >
          <div
            className="w-64 bg-dashboard-bg h-full text-white flex flex-col p-4 absolute top-0 left-0 transition-transform duration-300 custom-scrollbar"
          >
            {/* Sidebar Content */}
            <SidebarContent
              menuItems={menuItems}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </div>
        </div>
      )}

      {/* Sidebar for Large Screens */}
      <div className="hidden lg:flex w-64 bg-dashboard-bg h-screen text-white flex-col p-4 custom-scrollbar">
        {/* Sidebar Content */}
        <SidebarContent
          menuItems={menuItems}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      </div>
    </div>
  );
};

const SidebarContent = ({ menuItems, hoveredIndex, setHoveredIndex }) => {
  return (
    <>
      {/* Logo Section */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <img src={logo} alt="Logo" className="h-12 w-12 mb-2" />
        <h1 className="text-xl font-bold">LEARNOVA</h1>
        <p className="text-xs font-poppins">Khatab School</p>
      </div>

      {/* Menu Section */}
      <nav className="flex flex-col gap-2 w-64">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`relative flex items-center px-4 py-3 group rounded-l-[30px] transition-all ${
              hoveredIndex === index ? "bg-white text-dashboard-bg" : "text-white"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Icon */}
            <FontAwesomeIcon
              icon={item.icon}
              className="mr-3 text-white group-hover:text-dashboard-bg transition-colors"
            />
            {/* Title */}
            <span className="text-sm font-poppins group-hover:text-dashboard-bg transition-colors">
              {item.label}
            </span>

            {/* Top and Bottom Curves */}
            {hoveredIndex === index && (
             <>
             <div className="absolute top-[-48px] right-4 w-12 h-12 bg-transparent rounded-full pointer-events-none shadow-[34px_34px_0_9px_white]"></div>
             <div className="absolute bottom-[-48px] right-4 w-12 h-12 bg-transparent rounded-full pointer-events-none shadow-[34px_-34px_0_9px_white]"></div>
             </>
            )}
             
          </a>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="mt-10 flex flex-col items-center">
        <div className="bg-white font-poppins text-dashboard-bg px-4 py-1 rounded-md mb-4 text-xs">
          Term: 2023-2024
        </div>
        <button className="px-4 py-2 font-poppins bg-white text-dashboard-bg hover:bg-gray-300 rounded-md text-sm">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
