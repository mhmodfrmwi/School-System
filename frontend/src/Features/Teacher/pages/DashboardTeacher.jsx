import React, { useState, useEffect } from "react";
import { Mail, BookOpen, Calendar, MessageCircle } from "lucide-react";
import { FaBell } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassTeacher } from "../components/TeacherRedux/TeacherClassSlice";
import bag from "../../../assets/bag.png";

const DashboardTeacher = () => {
  const dispatch = useDispatch();
  const { classTeachers = [] } = useSelector(
    (state) => state.classTeachers || {},
  );

  useEffect(() => {
    dispatch(fetchClassTeacher());
  }, [dispatch]);

  const [score, setScore] = useState(246);
  const [notifications, setNotifications] = useState({
    mail: 0,
    messages: 0,
    others: 2,
  });

  const [categories, setCategories] = useState([
    { name: "Mailbox", icon: "mail", count: 3 },
    { name: "Discussion Rooms", icon: "message-circle", count: 0 },
    { name: "Custom Libraries", icon: "book-open", count: 3 },
    { name: "Academic Calendar", icon: "calendar", count: 0 },
  ]);
  const [virtualClassrooms, setVirtualClassrooms] = useState([]);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 font-sans md:p-6">
      <div className="mb-10 grid grid-cols-1 gap-20 sm:grid-cols-2">
        <div className="grid h-48 grid-cols-2 rounded-md bg-[#117C90] p-4">
          <div className="grid grid-cols-1 gap-5 text-left">
            <span className="text-md text-white">{currentTime}</span>
            <span className="ml-2 text-xs font-bold text-white md:text-2xl">
              Welcome
            </span>
            <span className="ms-6 text-xl text-white">ahmed</span>
          </div>
          <div className="mx-auto grid grid-cols-1">
            <span className="mr-2 text-lg text-white md:text-xl">
              Your score
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-xl font-bold text-white md:h-12 md:w-12 md:text-2xl">
              {score}
            </div>
          </div>
        </div>

        <div className="grid h-48 grid-cols-1 rounded-md bg-[#117C90] p-4">
          <span className="mr-2 text-lg text-white md:text-xl">
            Notifications Center
          </span>
          <div className="flex justify-around">
            <button className="p-2 text-5xl text-white">
              <FaBell className="text-4xl" />
            </button>
            <button className="text-5xl text-white">
              <FontAwesomeIcon icon={faEnvelope} className="text-4xl" />
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto">
        <section className="mb-4 rounded-lg p-4 md:mb-6 md:p-6">
          <h3 className="mb-4 text-xl font-bold text-[#105E6A] md:mb-6 md:text-3xl">
            Courses
          </h3>
          <div className="grid grid-cols-1 justify-items-center gap-6 p-6 sm:grid-cols-2 xl:grid-cols-3">
            {classTeachers.map((classteacher, index) => (
              <div
                key={classteacher?.classId || index}
                className="relative flex w-56 cursor-pointer flex-col items-center rounded-xl border border-gray-300 bg-slate-100 p-5 text-center shadow-lg transition-colors hover:bg-slate-200"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                  <img src={bag} alt="bag" className="h-7 w-7" />
                </div>
                <p className="font-poppins text-lg font-semibold">
                  {classteacher?.subjectName || "N/A"}
                </p>
                <div className="flex justify-start gap-4">
                  <p className="font-poppins font-semibold text-[#197080]">
                    {classteacher.gradeName || "N/A"}
                  </p>
                  <p className="font-poppins font-semibold text-[#197080]">
                    {classteacher.className || "N/A"}
                  </p>
                </div>
                <p className="font-poppins text-[#197080]">
                  {classteacher.semesterName || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4 rounded-lg p-4 md:mb-6 md:p-6">
          <h3 className="mb-4 text-xl font-bold text-[#105E6A] md:mb-6 md:text-3xl">
            Main Categories
          </h3>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-lg bg-slate-100 p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-center rounded-full">
                  {getIconComponent(category.icon)}
                </div>
                <span className="ml-2 text-center text-sm font-bold text-[#105E6A] md:ml-3 md:text-xl">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg p-4 md:p-6">
          <h3 className="mb-4 text-xl font-bold text-[#105E6A] md:mb-6 md:text-2xl">
            Virtual Classrooms
          </h3>
          {virtualClassrooms.length > 0 ? (
            <div>{/* Render virtual classrooms here */}</div>
          ) : (
            <p className="w-[70%] bg-slate-100 p-10 text-lg text-gray-600 md:text-3xl">
              You don’t have any new virtual classrooms today.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

const getIconComponent = (iconName) => {
  switch (iconName) {
    case "mail":
      return <Mail className="text-[#105E6A] md:h-12 md:w-12" />;
    case "message-circle":
      return <MessageCircle className="text-[#105E6A] md:h-12 md:w-12" />;
    case "book-open":
      return <BookOpen className="text-[#105E6A] md:h-12 md:w-12" />;
    case "calendar":
      return <Calendar className="text-[#105E6A] md:h-12 md:w-12" />;
    default:
      return null;
  }
};

export default DashboardTeacher;
