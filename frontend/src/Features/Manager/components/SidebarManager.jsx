import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/logologin.png";

import GradeIconH from "../../../assets/TeacherIcon/Grade.png";
import ActivityIconH from "../../../assets/TeacherIcon/Activites.png";
import VirtualIconH from "../../../assets/TeacherIcon/Virtual.png";
import ScheduleIconH from "../../../assets/TeacherIcon/Schedule.png";
import AbsenceIconH from "../../../assets/TeacherIcon/Absence.png";

import GradeIcon from "../../../assets/StudentIcon/Grade.png";
import ActivityIcon from "../../../assets/StudentIcon/Activites.png";
import VirtualIcon from "../../../assets/StudentIcon/Virtual.png";
import ScheduleIcon from "../../../assets/StudentIcon/Schedule.png";
import AbsenceIcon from "../../../assets/StudentIcon/Absence.png";

const SidebarManager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      label: "Dashboard",
      icon: faHome,
      hoverIcon: faHome,
      href: "/manager/dashboard",
    },
    {
      label: "School Hubs",
      icon: ActivityIcon,
      hoverIcon: ActivityIconH,
      href: "/manager/school-hubs",
    },
    {
      label: "Absence",
      icon: AbsenceIcon,
      hoverIcon: AbsenceIconH,
      href: "/manager/get-all-classes",
    },
    {
      label: "Schedule",
      icon: ScheduleIcon,
      hoverIcon: ScheduleIconH,
      href: "/manager/schedule-table",
    },
    {
      label: "Grades",
      icon: GradeIcon,
      hoverIcon: GradeIconH,
      href: "/manager/grade",
    },
    {
      label: "Virtual Rooms",
      icon: VirtualIcon,
      hoverIcon: VirtualIconH,
      href: "/manager/virtual-room",
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
              currentPath={currentPath}
            />
          </div>
        </div>
      )}

      <div className="custom-scrollbar hidden h-screen w-64 flex-col bg-dashboard-bg p-4 text-white lg:flex">
        <SidebarContent
          menuItems={menuItems}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          currentPath={currentPath}
        />
      </div>
    </div>
  );
};

const SidebarContent = ({
  menuItems,
  hoveredIndex,
  setHoveredIndex,
  currentPath,
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
              currentPath === item.href
                ? "rounded-l-[30px] bg-white font-semibold text-dashboard-bg"
                : "text-white"
            } ${
              hoveredIndex === index && currentPath !== item.href
                ? "bg-white text-dashboard-bg"
                : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {typeof item.icon === "string" ? (
              <img
                src={
                  hoveredIndex === index || currentPath === item.href
                    ? item.hoverIcon
                    : item.icon
                }
                alt="icon"
                className="mr-3 h-6 w-6 object-contain transition-all duration-300"
                loading="lazy"
              />
            ) : (
              <FontAwesomeIcon
                icon={item.icon}
                className="mr-3 text-lg transition-colors group-hover:text-dashboard-bg"
              />
            )}

            <span className="font-poppins text-sm transition-colors group-hover:font-semibold group-hover:text-dashboard-bg">
              {item.label}
            </span>
            {currentPath === item.href && (
              <>
                <div className="pointer-events-none absolute right-4 top-[-48px] h-12 w-12 bg-transparent shadow-[34px_34px_0_9px_white] lg:rounded-full"></div>
                <div className="pointer-events-none absolute bottom-[-48px] right-4 h-12 w-12 bg-transparent shadow-[34px_-34px_0_9px_white] lg:rounded-full"></div>
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

export default SidebarManager;
