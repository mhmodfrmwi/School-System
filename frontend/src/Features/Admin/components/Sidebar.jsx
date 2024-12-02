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
  const [activeIndex, setActiveIndex] = useState(null); // Track the active menu item

  const menuItems = [
    { label: "Dashboard", icon: faHome, href: "#dashboard" },
    { label: "Members", icon: faUsers, href: "/students/BasicForm" },
    { label: "Term Management", icon: faCalendar, href: "/students/allTerms" },
    { label: "Course Management", icon: faPen, href: "#course-management" },
    { label: "Reports & Analytics", icon: faChartPie, href: "#reports" },
    {
      label: "Schedule Management",
      icon: faClock,
      href: "/students/allschedules",
    },
  ];

  return (
    <div className="relative">
      <button
        className="fixed left-5 top-8 z-50 h-10 w-9 rounded-lg bg-dashboard-bg p-2 text-white shadow-md lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        >
          <div className="custom-scrollbar absolute left-0 top-0 flex h-full w-64 flex-col bg-dashboard-bg p-4 text-white transition-transform duration-300">
            <SidebarContent
              menuItems={menuItems}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
        </div>
      )}

      <div className="custom-scrollbar hidden h-screen w-64 flex-col bg-dashboard-bg p-4 text-white lg:flex">
        <SidebarContent
          menuItems={menuItems}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  );
};

const SidebarContent = ({
  menuItems,
  hoveredIndex,
  setHoveredIndex,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center">
        <img src={logo} alt="Logo" className="mb-2 h-12 w-12" />
        <h1 className="text-xl font-bold">LEARNOVA</h1>
        <p className="font-poppins text-xs">Khatab School</p>
      </div>

      <nav className="flex w-64 flex-col gap-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`group relative flex items-center rounded-l-[30px] px-4 py-3 transition-all ${
              activeIndex === index || hoveredIndex === index
                ? "bg-white text-dashboard-bg"
                : "text-white"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(index)} // Set active index on click
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`mr-3 transition-colors ${
                activeIndex === index || hoveredIndex === index
                  ? "text-dashboard-bg"
                  : "text-white"
              }`}
            />
            <span className="font-poppins text-sm transition-colors group-hover:text-dashboard-bg">
              {item.label}
            </span>
            {(activeIndex === index || hoveredIndex === index) && (
              <>
                <div className="pointer-events-none absolute right-4 top-[-48px] h-12 w-12 rounded-full bg-transparent shadow-[34px_34px_0_9px_white]"></div>
                <div className="pointer-events-none absolute bottom-[-48px] right-4 h-12 w-12 rounded-full bg-transparent shadow-[34px_-34px_0_9px_white]"></div>
              </>
            )}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col items-center">
        <div className="mb-4 rounded-md bg-white px-4 py-1 font-poppins text-xs text-dashboard-bg">
          Term: 2023-2024
        </div>
        <button className="rounded-md bg-white px-4 py-2 font-poppins text-sm text-dashboard-bg hover:bg-gray-300">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
