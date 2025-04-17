import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchStudents } from "../components/AdminRedux/studentSlice";
import { fetchTeachers } from "../components/AdminRedux/teacherSlice";
import { fetchParents } from "../components/AdminRedux/parentSlice";
import { fetchManagers } from "../components/AdminRedux/managerSlice";
import { fetchAdmins } from "../components/AdminRedux/adminSlice";
import { fetchTerms } from "../components/AdminRedux/termSlice";
import { fetchSubjects } from "../components/AdminRedux/subjectSlice";
import { fetchScheduals } from "../components/AdminRedux/scheduleSlice";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const networkErrorShownRef = useRef(false); // Use a ref to track if network error toast is shown
  const tokenErrorShownRef = useRef(false);
  // Fetch data from slices
  const {
    students,
    loading: loadingStudents,
    error: studentError,
  } = useSelector((state) => state.students);
  const {
    teachers,
    loading: loadingTeachers,
    error: teacherError,
  } = useSelector((state) => state.teachers);
  const {
    parents,
    loading: loadingParents,
    error: parentError,
  } = useSelector((state) => state.parents);
  const {
    managers,
    loading: loadingManagers,
    error: managerError,
  } = useSelector((state) => state.managers);
  const {
    admins,
    loading: loadingAdmins,
    error: adminError,
  } = useSelector((state) => state.admins);
  const {
    terms,
    loading: loadingTerms,
    error: termError,
  } = useSelector((state) => state.terms);
  const {
    subjects,
    loading: loadingSubjects,
    error: subjectError,
  } = useSelector((state) => state.subject);
  const {
    schedules,
    loading: loadingSchedules,
    error: scheduleError,
  } = useSelector((state) => state.schedules);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchParents());
    dispatch(fetchManagers());
    dispatch(fetchAdmins());
    dispatch(fetchTerms());
    dispatch(fetchSubjects());
    dispatch(fetchScheduals());
  }, [dispatch]);

  // Handle network errors centrally
  useEffect(() => {
    const errors = [
      studentError,
      teacherError,
      parentError,
      managerError,
      adminError,
      termError,
      subjectError,
      scheduleError,
    ];

    // Check if any error is a network error
    const hasNetworkError = errors.some(
      (error) => error && error.includes("NetworkError"),
    );
    const hasTokenError = errors.some(
      (error) => error && error.includes("Token is required!"),
    );

    // Show toast only once for network error
    if (hasNetworkError && !networkErrorShownRef.current) {
      toast.error(
        t("dashboard.errors.network")
      );
      networkErrorShownRef.current = true; // Mark network error toast as shown
    }
    // Show toast only once for token error
    if (hasTokenError && !tokenErrorShownRef.current) {
      toast.error(t("dashboard.errors.token"));
      tokenErrorShownRef.current = true;
    }
  }, [
    studentError,
    teacherError,
    parentError,
    managerError,
    adminError,
    termError,
    subjectError,
    scheduleError,
  ]);

  // Rest of your component code...
  const maleTeachers =
    teachers?.filter((teacher) => teacher.gender === "M").length || 0;
  const femaleTeachers =
    teachers?.filter((teacher) => teacher.gender === "F").length || 0;
  const maleStudents =
    students?.filter((student) => student.gender === "M").length || 0;
  const femaleStudents =
    students?.filter((student) => student.gender === "F").length || 0;

  const pieData = [
    {
      name: t("dashboard.users.students"),
      value: loadingStudents ? 0 : students?.length || 0,
      color: "#4CAF50",
    },
    {
      name: t("dashboard.users.parents"),
      value: loadingParents ? 0 : parents?.length || 0,
      color: "#FF9800",
    },
    {
      name: t("dashboard.users.teachers"),
      value: loadingTeachers ? 0 : teachers?.length || 0,
      color: "#2196F3",
    },
    {
      name: t("dashboard.users.manager"),
      value: loadingManagers ? 0 : managers?.length || 0,
      color: "#F44336",
    },
    {
      name: t("dashboard.users.admin"),
      value: loadingAdmins ? 0 : admins?.length || 0,
      color: "#9C27B0",
    },
  ];

  const NoDataPieChart = () => (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={[{ name: "No Data", value: 1 }]}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          label={({ name }) => name}
        >
          <Cell fill="#117C90" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="p-6">
      {/* Overview Section */}
      <section>
        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-700">
        {t("dashboard.overview")}
        </h2>
        <div className="mb-4 mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856]"></div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            {
              label:  t("dashboard.users.students"),
              value: loadingStudents ? 0 : students.length,
              icon: "/src/assets/students 1.png",
              bgColor: "#D1F3E0",
            },
            {
              label: t("dashboard.users.teachers"),
              value: loadingTeachers ? 0 : teachers.length,
              icon: "/src/assets/Group.png",
              bgColor: "#E1F1FF",
            },
            {
              label: t("dashboard.users.parents"),
              value: loadingParents ? 0 : parents.length,
              icon: "/src/assets/vector.png",
              bgColor: "#FFF2D8",
            },
            {
              label:t("dashboard.users.manager"),
              value: loadingManagers ? 0 : managers.length,
              icon: "/src/assets/people.png",
              bgColor: "#FFEAEA",
            },
            {
              label:  t("dashboard.users.admin"),
              value: loadingAdmins ? 0 : admins.length,
              icon: "/src/assets/Group1.png",
              bgColor: "#D1F3E0",
            },
            {
              label: t("dashboard.users.terms"),
              value: loadingTerms ? 0 : terms.length,
              icon: "/src/assets/Term.png",
              bgColor: "#E1F1FF",
            },
            {
              label: t("dashboard.users.courses"),
              value: loadingSubjects ? 0 : subjects.length,
              icon: "/src/assets/Course.png",
              bgColor: "#FFF2D8",
            },
            {
              label: t("dashboard.users.schedule"),
              value: loadingSchedules ? 0 : schedules ? schedules.length : 0,
              icon: "/src/assets/Schedule.png",
              bgColor: "#FFEAEA",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-start rounded-lg bg-white p-4 text-center shadow-md dark:bg-[#117C90]"
            >
              <div
                className="mb-2 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: item.bgColor }}
              >
                <img src={item.icon} alt={item.label} className="h-9 w-9" />
              </div>

              <span
                className="mx-4 text-xl text-gray-700"
                style={{ borderLeft: "2px solid #ccc", height: "30px" }}
              ></span>

              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-600 dark:text-white">
                  {item.label}
                </h3>
                <p className="text-l font-semibold text-black dark:text-white">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mt-12">
        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-700">
        {t("dashboard.statistics")}
        </h2>
        <div className="mb-4 mt-1 h-[4px] w-[200px] rounded-t-md bg-[#244856]"></div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Students Chart */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-[#117C90]">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t("dashboard.charts.students")}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {students.length > 0 ? (
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: t("dashboard.charts.female"),
                        value: femaleStudents,
                        color: "#4CAF50",
                      },
                      { name: t("dashboard.charts.male"), value: maleStudents, color: "#2196F3" },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    <Cell fill="#4CAF50" />
                    <Cell fill="#2196F3" />
                  </Pie>
                </PieChart>
              ) : (
                <NoDataPieChart />
              )}
            </ResponsiveContainer>
          </div>

          {/* Teachers Chart */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-[#117C90]">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t("dashboard.charts.teachers")}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {teachers.length > 0 ? (
                <PieChart>
                  <Pie
                    data={[
                      {
                        name:t("dashboard.charts.female"),
                        value: femaleTeachers,
                        color: "#4CAF50",
                      },
                      { name:  t("dashboard.charts.male"), value: maleTeachers, color: "#2196F3" },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    <Cell fill="#4CAF50" />
                    <Cell fill="#2196F3" />
                  </Pie>
                </PieChart>
              ) : (
                <NoDataPieChart />
              )}
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="col-span-1 rounded-lg bg-white p-6 shadow-md dark:bg-[#117C90] sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t("dashboard.charts.percentage")}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {pieData[0].value > 0 ||
              pieData[1].value > 0 ||
              pieData[2].value > 0 ||
              pieData[3].value > 0 ? (
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <NoDataPieChart />
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="mt-12">
        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-700">
        {t("dashboard.calendar")}
        </h2>
        <div className="mb-6 mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856]"></div>

        <div className="max-w-[400px] rounded-lg bg-white p-6 shadow-md dark:bg-[#117C90]">
          <div className="text-black dark:text-white">
            <Calendar
              tileClassName={({ date, view }) => {
                const today = new Date();
                if (
                  view === "month" &&
                  date.toDateString() === today.toDateString()
                ) {
                  return "bg-white dark:bg-[#043B44] rounded-lg text-[#117C90] dark:text-white hover:text-gray-700 dark:hover:text-black cursor-pointer";
                }
                return "text-black dark:text-white hover:bg-gray-100 dark:hover:text-black dark:hover:bg-[#0e5a66] rounded-lg";
              }}
              className="!bg-transparent"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
