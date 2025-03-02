import React, { useState, useEffect } from "react";
import { Mail, BookOpen, Calendar, MessageCircle } from "lucide-react";
import { FaBullhorn, FaBell, FaCalendarAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassTeacher } from "../components/TeacherRedux/TeacherClassSlice";
import bag from "../../../assets/bag.png";
import { getTeacherPointsForTerm } from "../components/TeacherRedux/motivationTeacherSlice";

const DashboardTeacher = () => {
  const dispatch = useDispatch();
  const { classTeachers = [] } = useSelector(
    (state) => state.classTeachers || {},
  );

  const { teacherPointsForTerm } = useSelector(
    (state) => state.motivationTeacher,
  );
  useEffect(() => {
    dispatch(fetchClassTeacher());
    dispatch(getTeacherPointsForTerm());
  }, [dispatch]);

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
      {/* Top Section */}
      <div className="mb-10 grid grid-cols-1 gap-10 font-poppins sm:grid-cols-2">
        <div className="grid h-48 grid-cols-2 rounded-md bg-[#117C90] p-4">
          <div className="ml-2 grid grid-cols-1 gap-2 text-left">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-lg text-gray-200" />
              <span className="text-sm text-gray-200">{currentTime}</span>
            </div>
            <div className="flex flex-col items-start">
              <div className="ml-2 grid grid-cols-1 gap-1 text-center">
                <span className="text-xs font-medium text-white md:text-sm">
                  Welcome
                </span>
                <span className="text-2xl font-bold text-white md:text-4xl">
                  zien
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm text-white md:text-lg">Your score</span>
            <div className="relative flex items-center justify-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-4 ${
                  teacherPointsForTerm.badge === "Green"
                    ? "border-green-500 bg-green-500"
                    : teacherPointsForTerm.badge === "Diamond"
                      ? "border-[#6a6969] bg-[#6a6969]"
                      : teacherPointsForTerm.badge === "Gold"
                        ? "border-yellow-500 bg-yellow-500"
                        : "border-gray-300 bg-gray-300"
                } p-7 md:h-14 md:w-14`}
              >
                <span className="text-lg font-bold text-white md:text-2xl">
                  {teacherPointsForTerm.totalPoints}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid h-48 rounded-md bg-[#117C90] p-4">
          <span className="ml-4 block text-start text-sm font-semibold text-white md:text-lg">
            NOTIFICATIONS CENTER
          </span>
          <div className="flex h-14 w-full justify-center gap-4">
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-1">
              <FaBullhorn className="text-2xl text-[#c9cc29]" />
              <span className="ml-2 text-2xl font-bold text-[#117C90]">0</span>
            </div>
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-1">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-2xl text-[#cf502a]"
              />
              <span className="ml-2 text-2xl font-bold text-[#117C90]">0</span>
            </div>
            <div className="flex items-center rounded-md bg-gray-100 px-3 py-1">
              <FaBell className="text-2xl text-[#31961d]" />
              <span className="ml-2 text-2xl font-bold text-[#117C90]">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto">
        {/* Courses Section */}
        <section className="mb-4 rounded-lg p-4 md:mb-6 md:p-6">
          <div className="ml-0">
            <div className="flex flex-col">
              <h1 className="font-poppins text-lg font-bold text-[#244856] sm:text-xl lg:text-3xl">
                Courses
              </h1>
              <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[125px]"></div>
            </div>
            <div className="ml-0 grid grid-cols-1 justify-items-center gap-10 pt-6 sm:grid-cols-2 xl:grid-cols-3">
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
          </div>
        </section>

        {/* Main Categories Section */}
        <section className="mb-4 rounded-lg p-4 font-poppins md:mb-6 md:p-6">
          <div className="ml-0">
            <div className="mb-7 flex flex-col">
              <h1 className="font-poppins text-lg font-bold text-[#244856] sm:text-xl lg:text-2xl">
                Main Categories
              </h1>
              <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[205px]"></div>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-4 rounded-lg bg-slate-100 p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-center rounded-full">
                    {getIconComponent(category.icon)}
                  </div>
                  <span className="ml-2 text-center text-sm font-medium text-[#105E6A] md:ml-3 md:text-lg">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Virtual Classrooms Section */}
        <section className="rounded-lg p-4 font-poppins md:p-6">
          <div className="ml-0">
            <div className="mb-6 flex flex-col">
              <h1 className="font-poppins text-lg font-bold text-[#244856] sm:text-xl lg:text-2xl">
                Virtual Classrooms
              </h1>
              <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[235px]"></div>
            </div>
            {virtualClassrooms.length > 0 ? (
              <div>{/* Render virtual classrooms here */}</div>
            ) : (
              <p className="w-[70%] bg-slate-100 p-10 text-lg font-medium text-gray-600 md:text-2xl">
                You don’t have any new virtual classrooms today.
              </p>
            )}
          </div>
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
