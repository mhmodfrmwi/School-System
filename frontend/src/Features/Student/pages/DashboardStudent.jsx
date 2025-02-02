import React from "react";
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

function DashboardStudent() {



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
    { title: "English", description: "Spelling - Learn How To Spell Letters", link: book1 },
    { title: "Arabic", description: "Lesson 1 - How to Grow and Take Care of Your Farm", link: book2 },
    { title: "Science", description: "Adaptation - About Bears Life", link: book3 },
  ];

  const recommendedList = [
    { title: "What is an atom?", type: "Science", link: video1 },
    { title: "Let’s improve our Spelling!", type: "English", link: video2 },
    { title: "What is an atom?", type: "Science", link: video1 },
  ];


  return (
    <>
      {/*Header */}

      <div className="flex items-center justify-between bg-gradient-to-r from-[#FD813D] via-[#E47986] via-[#CF72C0] to-[#BC6FFB] p-6 shadow-md">
        {/*User */}
        <div className="flex items-center space-x-6 pl-10">
          <img
            src={userImage}
            alt="Zaina Shaheen"
            className="h-40 w-40 rounded-full border-4 border-white shadow-lg bg-[#CA9C9C]"
          />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-poppins text-[#62413A]">Zaina Shaheen</h2>
            <div className="flex items-center space-x-2">
              <img
                src={trueIcon}
                alt="True Icon"
                className="h-6 w-6"
              />
              <p className="text-[#62413A] font-medium font-poppins">You were present today!</p>
            </div>
          </div>
        </div>
        {/*Cards */}
        <div className=" flex-wrap space-x-8 pr-10 hidden lg:flex ">
          <div className="flex flex-col items-center space-y-2 ">

            <div className="flex flex-col bg-white p-4 rounded-lg shadow-md space-y-4">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-600 w-4 h-4" />
                <p className="text-sm font-semibold text-gray-600">15/10/2024 | 10:42:30</p>
              </div>
              <div className="flex items-center space-x-8">
                <p className="text-lg font-semibold font-poppins text-green-600">Green Level</p>
                <img
                  src={awardIcon}
                  alt="Award Icon"
                  className="w-10 h-10 "
                />
              </div>
            </div>


            <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
              <p className="text-xs font-medium font-poppins text-gray-500">Learning Streak</p>
              <div className="mt-2 flex space-x-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full border text-center font-bold ${index < 3 ? "bg-[#FD813D] text-white" : "bg-gray-200 text-gray-400"
                      }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <p className="mt-1 text-sm font-medium font-poppins text-gray-600">3 days 🔥</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold font-poppins text-gray-600">Your Score</p>
            <div className="relative flex items-center justify-center h-24 w-24">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-gray-200 fill-none"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-green-500 fill-none"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="100"
                  style={{
                    strokeLinecap: "round",
                    stroke: "url(#gradient)",
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#0D6A04", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#19D009", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>

              <p className="text-xl font-bold text-gray-600">246</p>
            </div>
          </div>
        </div>
      </div>




     {/* Quick Menu */}
<div className="w-[95%] mx-auto bg-white py-8 px-4 rounded-lg">
  <div className="flex items-center py-4">
    <p className="mr-2 w-2 h-8 border-l-8 border-[#BC6FFB] rounded-lg"></p>
    <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
      Quick Menu
    </button>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
        className="flex flex-col hover:cursor-pointer items-center justify-center bg-[#F3F4F6] w-full h-36 rounded-xl font-poppins font-semibold text-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
      >
        <div className="w-12 h-12 bg-[#BC6FFB] rounded-full flex items-center justify-center mb-2 transition-all duration-300 ease-in-out">
          <img src={item.icon} alt={item.label} className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium">{item.label}</p>
      </div>
    ))}
  </div>
</div>





      {/* Main Categories */}
      <div className="w-[95%] mx-auto p-4 bg-white rounded-lg  mt-8">

        <div className="flex items-center ">
          <p className="mr-2 w-2 h-8 border-l-8 border-[#BC6FFB] rounded-lg"></p>
          <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
            Main Categories
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {mainCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-2xl bg-[#F5F5F5] shadow-md border-4 hover:cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-102 hover:shadow-xl hover:bg-[#F1F1F1]"
              style={{
                border: "4px",
                borderImage: "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
              }}
            >
              <img
                src={category.icon}
                alt={category.label}
                className="w-12 h-12 object-contain mb-4"
              />
              <h3 className="mt-2 text-lg font-poppins text-gray-700">{category.label}</h3>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"
                  style={{ width: category.progress }}
                ></div>
              </div>
              <p className="text-gray-600 mt-2 font-poppins">{category.progress}</p>
            </div>
          ))}
        </div>

      </div>



      {/* Diffrent Categories */}

      <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-8">
        {/* Continue Reading Section */}
        <div className="p-4 rounded-lg shadow-md border-4 border-transparent"
          style={{ borderImage: "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1" }}>
          <h2 className="text-2xl font-bold font-poppins text-transparent bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text mb-4">Continue Reading</h2>
          <ul className="space-y-6">
            {readingList.map((item, index) => (
              <li key={index} className="flex items-center space-x-4 h-60 mb-6">
                <img src={item.link} alt={item.title} className="h-50 w-40 rounded-lg  shadow-md object-cover" />
                <div>
                  <p className="text-lg font-semibold font-poppins">{item.title}</p>
                  <p className="text-gray-600 font-poppins">{item.description}</p>
                  <a href="https://placehold.co/600x400" className="text-purple-500 font-semibold font-poppins mt-2 block">
                    Continue
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended to Watch Section */}
        <div className="p-4 rounded-lg shadow-md  border-4 border-transparent"
          style={{ borderImage: "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1" }}>
          <h2 className="text-2xl font-bold font-poppins text-transparent bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text mb-4">Recommended To Watch</h2>
          <ul className="space-y-6">
            {recommendedList.map((item, index) => (
              <li key={index} className="flex flex-col items-center space-y-4">
                <img src={item.link} alt={item.title} className="h-28 w-full rounded-lg shadow-md object-cover" />
                <div className="text-center">
                  <p className="text-lg font-semibold font-poppins">{item.title}</p>
                  <p className="text-gray-600 font-poppins">Type: {item.type}</p>
                  <a href="https://placehold.co/600x400" className="text-purple-500 font-semibold font-poppins mt-2 block">
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
};



export default DashboardStudent;
