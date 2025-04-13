import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faCalendar,
  faPen,
  faClock,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/logologin.png";
import { fetchTerms } from "../components/AdminRedux/termSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { terms, status, error } = useSelector((state) => state.terms);

  useEffect(() => {
    if (status === "idle" || terms.length === 0) {
      dispatch(fetchTerms());
    }
  }, [status, terms.length, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const menuItems = [
    { label: "Dashboard", icon: faHome, href: "/admin/dashboard" },
    { label: "Members", icon: faUsers, href: "/admin/basicform" },
    { label: "Term Management", icon: faCalendar, href: "/admin/allTerms" },
    { label: "Course Management", icon: faPen, href: "/admin/allsubjects" },
    {
      label: "Academic Year",
      icon: "fluent:number-row-24-regular",
      href: "/admin/allacademicyears",
    },
    {
      label: "Grade Management",
      icon: "octicon:number-16",
      href: "/admin/allGrades",
    },
    {
      label: "Schedule Management",
      icon: faClock,
      href: "/admin/allschedules",
    },
  ];

  return (
    <div className="relative">
      <button
        className="fixed left-5 top-8 z-50 h-10 w-9 rounded-lg bg-dashboard-bg p-2 text-white shadow-md dark:bg-[#043B44] lg:hidden"
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
          <div className="custom-scrollbar absolute left-0 top-0 flex h-full w-64 flex-col bg-dashboard-bg p-4 text-white transition-transform duration-300 dark:bg-[#043B44]">
            <SidebarContent
              menuItems={menuItems}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              currentPath={currentPath}
              terms={terms}
              navigate={navigate}
            />
          </div>
        </div>
      )}

      <div className="custom-scrollbar hidden h-screen w-64 flex-col bg-dashboard-bg p-4 text-white dark:bg-[#043B44] lg:flex">
        <SidebarContent
          menuItems={menuItems}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          currentPath={currentPath}
          terms={terms}
          navigate={navigate}
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
  terms,
  navigate,
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
                ? "rounded-l-[30px] bg-white font-semibold text-dashboard-bg dark:text-[#043B44]"
                : "text-white"
            } ${
              hoveredIndex === index && currentPath !== item.href
                ? "bg-white text-dashboard-bg dark:text-[#043B44]"
                : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {typeof item.icon === "string" ? (
              <Icon
                icon={item.icon}
                className={`mr-3 transition-colors group-hover:text-dashboard-bg dark:group-hover:text-[#043B44] ${
                  currentPath === item.href
                    ? "text-dashboard-bg dark:text-[#043B44]"
                    : "text-white"
                } text-xl`}
                style={{ fontSize: "1.5rem" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={item.icon}
                className={`mr-3 transition-colors group-hover:text-dashboard-bg dark:group-hover:text-[#043B44] ${
                  currentPath === item.href
                    ? "text-dashboard-bg dark:text-[#043B44]"
                    : "text-white"
                }`}
              />
            )}

            <span className="font-poppins text-sm transition-colors group-hover:font-semibold group-hover:text-dashboard-bg dark:group-hover:text-[#043B44]">
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
        <div>
          {terms.length > 0 ? (
            (() => {
              const currentYear = new Date().getFullYear();

              const currentYearTerms = terms.filter(
                (term) =>
                  term.academicYear_id &&
                  term.academicYear_id.startYear <= currentYear &&
                  term.academicYear_id.endYear >= currentYear,
              );

              const latestTerm =
                currentYearTerms.length > 0
                  ? currentYearTerms[currentYearTerms.length - 1]
                  : null;

              return latestTerm ? (
                <div className="mb-4 rounded-md bg-white px-4 py-1 font-poppins text-xs text-dashboard-bg dark:text-[#043B44]">
                  {latestTerm.semesterName}:{" "}
                  {latestTerm.academicYear_id.startYear} -{" "}
                  {latestTerm.academicYear_id.endYear}
                </div>
              ) : (
                <p>No current term available</p>
              );
            })()
          ) : (
            <p>No terms available</p>
          )}
        </div>

        <button
          className="rounded-md bg-white px-4 py-2 font-poppins text-sm text-dashboard-bg hover:bg-gray-300 dark:text-[#043B44]"
          onClick={() => navigate("/role")}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
