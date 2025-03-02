import React, { useEffect } from "react";
import userImage from "../../../assets/Girl.png";
import trueIcon from "../../../assets/true icon.png";
import awardIcon from "../../../assets/Award.png";
import GradeIcon from "../../../assets/StudentIcon/Grade.png";
import ChatIcon from "../../../assets/StudentIcon/Chat.png";
import AwardIcon from "../../../assets/StudentIcon/Awards.png";
import ActivityIcon from "../../../assets/StudentIcon/Activites.png";
import VirtualIcon from "../../../assets/StudentIcon/Virtual.png";
import ScheduleIcon from "../../../assets/StudentIcon/Schedule.png";
import QuestionsIcon from "../../../assets/StudentIcon/Questions.png";
import LibraryIcon from "../../../assets/StudentIcon/Library.png";
import CourseIcon from "../../../assets/StudentIcon/Course.png";
import AbsenceIcon from "../../../assets/StudentIcon/Absence.png";

import VirtualI from "../../../assets/StudentIcon/VirtualRoomsIcon.png";
import VectorI from "../../../assets/StudentIcon/Vector.png";
import learningI from "../../../assets/StudentIcon/learning.png";
import GroupI from "../../../assets/StudentIcon/Group.png";
import EmailI from "../../../assets/StudentIcon/Email.png";
import editI from "../../../assets/StudentIcon/edit.png";
import CourseI from "../../../assets/StudentIcon/CourseIcon.png";
import annonI from "../../../assets/StudentIcon/annon.png";
import ActivitesI from "../../../assets/StudentIcon/ActivitesIcon.png";
import AbsenceI from "../../../assets/StudentIcon/AbsenceIcon.png";

import video1 from "../../../assets/StudentIcon/video11.png";
import video2 from "../../../assets/StudentIcon/video21.png";
import book1 from "../../../assets/StudentIcon/book11.png";
import book2 from "../../../assets/StudentIcon/book21.png";
import book3 from "../../../assets/StudentIcon/book31.png";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getSemesterReward } from "../components/StudentRedux/motivationSlice";

function DashboardStudent() {
  const dispatch = useDispatch();
  const { semesterReward } = useSelector((state) => state.motivation);
  const { fullName } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getSemesterReward());
  }, [dispatch]);

  const mainCategories = [
    { label: "Online Assignments", icon: editI, progress: "100%" },
    { label: "Exams", icon: learningI, progress: "90%" },
    { label: "Course Materials", icon: CourseI, progress: "80%" },
    { label: "Report Cards", icon: VectorI, progress: "60%" },
    { label: "Mailbox", icon: EmailI, progress: "50%" },
    { label: "Assessments", icon: AbsenceI, progress: "70%" },
    { label: "Activities", icon: ActivitesI, progress: "20%" },
    { label: "Virtual Classroom", icon: VirtualI, progress: "10%" },
    { label: "Announcements", icon: annonI, progress: "40%" },
    { label: "Video Lectures", icon: GroupI, progress: "100%" },
  ];

  const readingList = [
    {
      title: "English",
      description: "Spelling - Learn How To Spell Letters",
      link: book1,
    },
    {
      title: "Arabic",
      description: "Lesson 1 - How to Grow and Take Care of Your Farm",
      link: book2,
    },
    {
      title: "Science",
      description: "Adaptation - About Bears Life",
      link: book3,
    },
  ];

  const recommendedList = [
    { title: "What is an atom?", type: "Science", link: video1 },
    { title: "Let’s improve our Spelling!", type: "English", link: video2 },
    { title: "What is an atom?", type: "Science", link: video1 },
  ];

  return (
    <>
      {/*Header */}

      <div className="flex items-center justify-between bg-gradient-to-r from-[#FD813D] via-[#CF72C0] via-[#E47986] to-[#BC6FFB] p-6 shadow-md">
        {/*User */}
        <div className="flex items-center space-x-6 pl-10">
          <img
            src={userImage}
            alt="Zaina Shaheen"
            className="h-40 w-40 rounded-full border-4 border-white bg-[#CA9C9C] shadow-lg"
          />
          <div className="space-y-2">
            <h2 className="font-poppins text-2xl font-bold text-[#62413A]">
              {fullName}
            </h2>
            <div className="flex items-center space-x-2">
              <img src={trueIcon} alt="True Icon" className="h-6 w-6" />
              <p className="font-poppins font-medium text-[#62413A]">
                You were present today!
              </p>
            </div>
          </div>
        </div>
        {/*Cards */}
        <div className="hidden flex-wrap space-x-8 pr-10 lg:flex">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-semibold text-gray-600">
                  15/10/2024 | 10:42:30
                </p>
              </div>
              <div className="flex items-center space-x-8">
                <p
                  className={`font-poppins text-lg font-semibold ${
                    semesterReward.badge === "Green"
                      ? "text-green-600"
                      : semesterReward.badge === "Diamond"
                        ? "text-gray-500"
                        : semesterReward.badge === "Gold"
                          ? "text-yellow-500"
                          : "text-gray-300"
                  }`}
                >
                  {semesterReward.badge === "Green"
                    ? "Green Level"
                    : semesterReward.badge === "Diamond"
                      ? "Diamond Level"
                      : semesterReward.badge === "Gold"
                        ? "Gold Level"
                        : "Default Level"}
                </p>
                <img src={awardIcon} alt="Award Icon" className="h-10 w-10" />
              </div>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
              <p className="font-poppins text-xs font-medium text-gray-500">
                Learning Streak
              </p>
              <div className="mt-2 flex space-x-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full border text-center font-bold ${
                      index < 3
                        ? "bg-[#FD813D] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <p className="mt-1 font-poppins text-sm font-medium text-gray-600">
                3 days 🔥
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
            <p className="font-poppins text-lg font-semibold text-gray-600">
              Your Score
            </p>

            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="fill-none stroke-gray-200"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="fill-none"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="100"
                  style={{
                    strokeLinecap: "round",
                    stroke:
                      semesterReward.badge === "Green"
                        ? "url(#greenGradient)"
                        : semesterReward.badge === "Diamond"
                          ? "url(#diamondGradient)"
                          : semesterReward.badge === "Gold"
                            ? "url(#goldGradient)"
                            : "url(#defaultGradient)",
                  }}
                />
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#0D6A04", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#19D009", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="diamondGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#6a6969", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#a3a0a0", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="goldGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#FFD700", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#FFCC00", stopOpacity: 1 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="defaultGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#B0B0B0", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#D3D3D3", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
              </svg>
              <p
                className={`text-xl font-bold ${
                  semesterReward.badge === "Green"
                    ? "text-green-600"
                    : semesterReward.badge === "Diamond"
                      ? "text-gray-500"
                      : semesterReward.badge === "Gold"
                        ? "text-yellow-500"
                        : "text-gray-300"
                }`}
              >
                {semesterReward.totalSemesterPoints}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="mx-auto w-[95%] rounded-lg bg-white px-4 py-8">
        <div className="flex items-center py-4">
          <p className="mr-2 h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB]"></p>
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
            Quick Menu
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            { label: "Awards", icon: AwardIcon },
            { label: "Courses", icon: CourseIcon },
            { label: "Absence", icon: AbsenceIcon },
            { label: "Schedule", icon: ScheduleIcon },
            { label: "Grade Mngments", icon: GradeIcon },
            { label: "Activities", icon: ActivityIcon },
            { label: "Library", icon: LibraryIcon },
            { label: "Question Bank", icon: QuestionsIcon },
            { label: "Virtual Rooms", icon: VirtualIcon },
            { label: "Chats", icon: ChatIcon },
          ].map((item, index) => (
            <div
              key={index}
              className="flex h-36 w-full transform flex-col items-center justify-center rounded-xl bg-[#F3F4F6] font-poppins font-semibold text-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md"
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#BC6FFB] transition-all duration-300 ease-in-out">
                <img src={item.icon} alt={item.label} className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Categories */}
      <div className="mx-auto mt-8 w-[95%] rounded-lg bg-white p-4">
        <div className="flex items-center">
          <p className="mr-2 h-8 w-2 rounded-lg border-l-8 border-[#BC6FFB]"></p>
          <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent">
            Main Categories
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {mainCategories.map((category, index) => (
            <div
              key={index}
              className="hover:scale-102 flex transform flex-col items-center rounded-2xl border-4 bg-[#F5F5F5] p-4 shadow-md transition-transform duration-300 ease-in-out hover:cursor-pointer hover:bg-[#F1F1F1] hover:shadow-xl"
              style={{
                border: "4px",
                borderImage:
                  "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
              }}
            >
              <img
                src={category.icon}
                alt={category.label}
                className="mb-4 h-12 w-12 object-contain"
              />
              <h3 className="mt-2 font-poppins text-lg text-gray-700">
                {category.label}
              </h3>
              <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"
                  style={{ width: category.progress }}
                ></div>
              </div>
              <p className="mt-2 font-poppins text-gray-600">
                {category.progress}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Diffrent Categories */}

      <div className="mx-auto mt-8 grid w-[95%] grid-cols-1 gap-6 px-8 md:grid-cols-2">
        {/* Continue Reading Section */}
        <div
          className="rounded-lg border-4 border-transparent p-4 shadow-md"
          style={{
            borderImage:
              "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
          }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-bold text-transparent">
            Continue Reading
          </h2>
          <ul className="space-y-6">
            {readingList.map((item, index) => (
              <li key={index} className="mb-6 flex h-60 items-center space-x-4">
                <img
                  src={item.link}
                  alt={item.title}
                  className="h-50 w-40 rounded-lg object-cover shadow-md"
                />
                <div>
                  <p className="font-poppins text-lg font-semibold">
                    {item.title}
                  </p>
                  <p className="font-poppins text-gray-600">
                    {item.description}
                  </p>
                  <a
                    href="https://placehold.co/600x400"
                    className="mt-2 block font-poppins font-semibold text-purple-500"
                  >
                    Continue
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended to Watch Section */}
        <div
          className="rounded-lg border-4 border-transparent p-4 shadow-md"
          style={{
            borderImage:
              "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
          }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-bold text-transparent">
            Recommended To Watch
          </h2>
          <ul className="space-y-6">
            {recommendedList.map((item, index) => (
              <li key={index} className="flex flex-col items-center space-y-4">
                <img
                  src={item.link}
                  alt={item.title}
                  className="h-28 w-full rounded-lg object-cover shadow-md"
                />
                <div className="text-center">
                  <p className="font-poppins text-lg font-semibold">
                    {item.title}
                  </p>
                  <p className="font-poppins text-gray-600">
                    Type: {item.type}
                  </p>
                  <a
                    href="https://placehold.co/600x400"
                    className="mt-2 block font-poppins font-semibold text-purple-500"
                  >
                    Watch Now
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DashboardStudent;
