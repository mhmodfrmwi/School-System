import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getGeneralStatistics,
  getAbsenceStatistics,
  getGradeStatistics,
  getStudentsRanks,
  getTeachersRanks,
} from "./ManagerSlices/dashboardSlice";
import { useTranslation } from 'react-i18next';


function DashboardManager() {
  const dispatch = useDispatch();
  const {
    statistics,
    absenceStatistics,
    gradeStatistics,
    studentsRanks,
    teachersRanks,
    loading,
    error,
  } = useSelector((state) => state.managerdashboard);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getGeneralStatistics());
    dispatch(getAbsenceStatistics());
    dispatch(getGradeStatistics());
    dispatch(getStudentsRanks());
    dispatch(getTeachersRanks());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const defaultData = {
    counts: {
      students: 0,
      teachers: 0,
      parents: 0,
      sehedule: 0,
    },
    genderPercentages: {
      students: { girls: "0.00", boys: "0.00" },
      teachers: { girls: "0.00", boys: "0.00" },
    },
    categoryPercentages: {
      students: "0.00",
      teachers: "0.00",
      parents: "0.00",
    },
  };

  const {
    counts: { students, teachers, parents, sehedule: schedules },
    genderPercentages: {
      students: {
        girls: femaleStudentsPercentage,
        boys: maleStudentsPercentage,
      },
      teachers: {
        girls: femaleTeachersPercentage,
        boys: maleTeachersPercentage,
      },
    },
    categoryPercentages,
  } = statistics?.data || defaultData;

  const femaleStudents = parseFloat(femaleStudentsPercentage);
  const maleStudents = parseFloat(maleStudentsPercentage);
  const femaleTeachers = parseFloat(femaleTeachersPercentage);
  const maleTeachers = parseFloat(maleTeachersPercentage);

  const pieData = [
    {
      name: "Students",
      value: parseFloat(categoryPercentages.students),
      color: "#4CAF50",
    },
    {
      name: "Teachers",
      value: parseFloat(categoryPercentages.teachers),
      color: "#2196F3",
    },
    {
      name: "Parents",
      value: parseFloat(categoryPercentages.parents),
      color: "#FF9800",
    },
  ];

  const gradesData =
    gradeStatistics?.data?.map((grade) => ({
      grade: grade.grade,
      passedPercentage: parseFloat(grade.passedPercentage),
      failedPercentage: parseFloat(grade.failedPercentage),
    })) || [];

  const absenceData =
    absenceStatistics?.data?.map((absence) => ({
      grade: absence.grade,
      presentPercentage: parseFloat(absence.presentPercentage),
      absentPercentage: parseFloat(absence.absentPercentage),
    })) || [];

  const studentsRanksData = studentsRanks?.data || [];
  const teachersRanksData = teachersRanks?.data || [];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Green":
        return "bg-green-400";
      case "Silver":
        return "bg-gray-400";
      case "Bronze":
        return "bg-orange-600";
      default:
        return "bg-gray-200";
    }
  };
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
    <div className="p-6 font-poppins">
      {/* Search Section */}
      <section>
        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-700">
        {t("dashboard.overview")}
        </h2>
        <div className="mb-4 mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856]"></div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            {
              label:  t("dashboard.users.students"),
              value: students,
              icon: "/src/assets/students 1.png",
              bgColor: "#D1F3E0",
            },
            {
              label: t("dashboard.users.teachers"),
              value: teachers,
              icon: "/src/assets/Group.png",
              bgColor: "#E1F1FF",
            },
            {
              label: t("dashboard.users.parents"),
              value: parents,
              icon: "/src/assets/vector.png",
              bgColor: "#FFF2D8",
            },
            {
              label: t('Schedule'),
              value: schedules,
              icon: "/src/assets/Schedule.png",
              bgColor: "#FFEAEA",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="dark:bg-DarkManager2 flex items-center justify-start rounded-lg bg-white p-4 text-center shadow-md"
            >
              <div
                className="mb-2 flex h-16 w-16 items-center justify-center rounded-full dark:text-white"
                style={{ backgroundColor: item.bgColor }}
              >
                <img src={item.icon} alt={item.label} className="h-9 w-9" />
              </div>

              <span
                className="mx-4 text-xl text-gray-700 dark:text-white"
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
          <div className="dark:bg-DarkManager2 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t("dashboard.charts.students")}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {students > 0 ? (
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
          <div className="dark:bg-DarkManager2 rounded-lg bg-white p-6 shadow-md dark:text-white">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t("dashboard.charts.teachers")}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {teachers > 0 ? (
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: t("dashboard.charts.female"),
                        value: femaleTeachers,
                        color: "#4CAF50",
                      },
                      { name: t("dashboard.charts.male"), value: maleTeachers, color: "#2196F3" },
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
          <div className="dark:bg-DarkManager2 col-span-1 rounded-lg bg-white p-6 shadow-md dark:text-white sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t("dashboard.charts.percentage")}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {pieData[0].value > 0 ||
              pieData[1].value > 0 ||
              pieData[2].value > 0 ? (
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

      {/* Grades and Absence Statistics Section */}
      <section className="mt-12">
        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-700">
        {t('dashboardm.GradesAbsenceStatistics')}
        </h2>
        <div className="mb-4 mt-1 h-[4px] w-[200px] rounded-t-md bg-[#244856]"></div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="dark:bg-DarkManager2 rounded-lg bg-white p-6 shadow-md dark:text-white">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t('dashboardm.GradesStatistics')} (Percentage)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradesData}>
                <XAxis dataKey="grade" tick={{ fill: "white" }} />
                <YAxis tick={{ fill: "white" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="passedPercentage" fill="#4CAF50" name="Passed" />
                <Bar dataKey="failedPercentage" fill="#E74833" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dark:bg-DarkManager2 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-center font-poppins text-lg font-medium text-gray-600 dark:text-white">
            {t('dashboardm.AbsenceStatistics')}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={absenceData}>
                <XAxis dataKey="grade" tick={{ fill: "white" }} />
                <YAxis tick={{ fill: "white" }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="presentPercentage"
                  fill="#4CAF50"
                  name="Present"
                />
                <Bar dataKey="absentPercentage" fill="#E74833" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Ranks Section */}
      <section className="mt-12">
        <h2 className="mb-2 font-poppins text-2xl font-semibold text-gray-700">
        {t('dashboardm.Ranks')}
        </h2>
        <div className="mb-4 mt-1 h-[4px] w-[200px] rounded-t-md bg-[#244856]"></div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Students Ranks Table */}
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="dark:text-DarkManager mb-4 text-center font-poppins text-lg font-medium text-gray-600">
            {t('dashboardm.TopStudents')}
            </h3>
            <div className="overflow-x-auto">
              <table className="dark:bg-DarkManager2 min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2">{t('dashboardm.Rank')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.Name')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.AcademicNumber')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.Grade')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.TotalPoints')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.Badge')}</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsRanksData.map((student, index) => (
                    <tr
                      key={index}
                      className={`text-center ${index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"} dark:hover:bg-DarkManager/10 transition-all hover:bg-[#117C90]/10 dark:text-black`}
                    >
                      <td className="border-b px-4 py-2">{index + 1}</td>
                      <td className="border-b px-4 py-2">{student.fullName}</td>
                      <td className="border-b px-4 py-2">
                        {student.academic_number}
                      </td>
                      <td className="border-b px-4 py-2">{student.grade}</td>
                      <td className="border-b px-4 py-2">
                        {student.totalPoints}
                      </td>
                      <td className="border-b px-4 py-2">
                        <span
                          className={`rounded-full px-2 py-1 text-white ${getBadgeColor(student.badge)}`}
                        >
                          {student.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teachers Ranks Table */}
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="dark:text-DarkManager mb-4 text-center font-poppins text-lg font-medium text-gray-600">
            {t('dashboardm.TopTeachers')}
            </h3>
            <div className="overflow-x-auto">
              <table className="dark:bg-DarkManager2 min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2">{t('dashboardm.Rank')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.Name')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.AcademicNumber')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.Subject')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.TotalPoints')}</th>
                    <th className="border-b px-4 py-2">{t('dashboardm.Badge')}</th>
                  </tr>
                </thead>
                <tbody>
                  {teachersRanksData.map((teacher, index) => (
                    <tr
                      key={index}
                      className={`text-center ${index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"} dark:hover:bg-DarkManager/10 transition-all hover:bg-[#117C90]/10 dark:text-black`}
                    >
                      <td className="border-b px-4 py-2">{index + 1}</td>
                      <td className="border-b px-4 py-2">{teacher.fullName}</td>
                      <td className="border-b px-4 py-2">
                        {teacher.academicNumber}
                      </td>
                      <td className="border-b px-4 py-2">
                        {teacher.subject.subjectName}
                      </td>
                      <td className="border-b px-4 py-2">
                        {teacher.totalPoints}
                      </td>
                      <td className="border-b px-4 py-2">
                        <span
                          className={`rounded-full px-2 py-1 text-white ${getBadgeColor(teacher.badge)}`}
                        >
                          {teacher.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
}

export default DashboardManager;
