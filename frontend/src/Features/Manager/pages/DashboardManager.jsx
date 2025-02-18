import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DashboardManager() {
  // Static values for the data
  const students = 100;
  const teachers = 50;
  const parents = 80;
  const schedules = 12;

  const maleTeachers = 30;
  const femaleTeachers = 20;
  const maleStudents = 60;
  const femaleStudents = 40;

  const pieData = [
    { name: "Students", value: students, color: "#4CAF50" },
    { name: "Parents", value: parents, color: "#FF9800" },
    { name: "Teachers", value: teachers, color: "#2196F3" },
  ];

  // Grades data from Grade 1 to Grade 12
  const gradesData = [
    { grade: "Grade 1", percentage: 85 },
    { grade: "Grade 2", percentage: 78 },
    { grade: "Grade 3", percentage: 90 },
    { grade: "Grade 4", percentage: 82 },
    { grade: "Grade 5", percentage: 88 },
    { grade: "Grade 6", percentage: 75 },
    { grade: "Grade 7", percentage: 80 },
    { grade: "Grade 8", percentage: 92 },
    { grade: "Grade 9", percentage: 85 },
    { grade: "Grade 10", percentage: 79 },
    { grade: "Grade 11", percentage: 83 },
    { grade: "Grade 12", percentage: 87 },
  ];

  // Absence data from Grade 1 to Grade 12
  const absenceData = [
    { grade: "Grade 1", absences: 5 },
    { grade: "Grade 2", absences: 8 },
    { grade: "Grade 3", absences: 3 },
    { grade: "Grade 4", absences: 6 },
    { grade: "Grade 5", absences: 7 },
    { grade: "Grade 6", absences: 4 },
    { grade: "Grade 7", absences: 9 },
    { grade: "Grade 8", absences: 2 },
    { grade: "Grade 9", absences: 5 },
    { grade: "Grade 10", absences: 6 },
    { grade: "Grade 11", absences: 3 },
    { grade: "Grade 12", absences: 4 },
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
        <h2 className="text-2xl font-semibold font-poppins text-gray-700 mb-2">Overview</h2>
        <div className="mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856] mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {[ 
            { label: "Students", value: students, icon: "/src/assets/students 1.png", bgColor: "#D1F3E0" },
            { label: "Teachers", value: teachers, icon: "/src/assets/Group.png", bgColor: "#E1F1FF" },
            { label: "Parents", value: parents, icon: "/src/assets/vector.png", bgColor: "#FFF2D8" },
            { label: "Schedule", value: schedules, icon: "/src/assets/Schedule.png", bgColor: "#FFEAEA" },
          ].map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center flex items-center justify-start">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: item.bgColor }}>
                <img src={item.icon} alt={item.label} className="w-9 h-9" />
              </div>

              <span className="mx-4 text-xl text-gray-700" style={{ borderLeft: '2px solid #ccc', height: '30px' }}></span>

              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-600">{item.label}</h3>
                <p className="text-l font-semibold text-black">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold font-poppins text-gray-700 mb-2">
          Statistics of users
        </h2>
        <div className="mt-1 h-[4px] w-[200px] rounded-t-md bg-[#244856] mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {/* Students Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-center font-poppins text-lg font-medium text-gray-600 mb-4">
              Students
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {students > 0 ? (
                <PieChart>
                  <Pie
                    data={[
                      { name: "Female", value: femaleStudents, color: "#4CAF50" },
                      { name: "Male", value: maleStudents, color: "#2196F3" },
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
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-center font-poppins text-lg font-medium text-gray-600 mb-4">
              Teachers
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {teachers > 0 ? (
                <PieChart>
                  <Pie
                    data={[
                      { name: "Female", value: femaleTeachers, color: "#4CAF50" },
                      { name: "Male", value: maleTeachers, color: "#2196F3" },
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
          <div className="bg-white shadow-md rounded-lg p-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-center font-poppins text-lg font-medium text-gray-600 mb-4">
              Percentage Of Users By Type
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              {pieData[0].value > 0 || pieData[1].value > 0 || pieData[2].value > 0 || pieData[3].value > 0 ? (
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
        <h2 className="text-2xl font-semibold font-poppins text-gray-700 mb-2">
          Grades and Absence Statistics
        </h2>
        <div className="mt-1 h-[4px] w-[200px] rounded-t-md bg-[#244856] mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          {/* Grades Statistics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-center font-poppins text-lg font-medium text-gray-600 mb-4">
              Grades Statistics (Percentage)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradesData}>
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill="#117C90" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Absence Statistics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-center font-poppins text-lg font-medium text-gray-600 mb-4">
              Absence Statistics
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={absenceData}>
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="absences" fill="#E74833" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold font-poppins text-gray-700 mb-2">
          Calendar
        </h2>
        <div className="mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856] mb-6"></div>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-[400px]">
          <div>
            <Calendar
              tileClassName={({ date, view }) => {
                const today = new Date();
                if (view === "month" && date.toDateString() === today.toDateString()) {
                  return "bg-[#117C90] rounded-lg text-white hover:text-gray-700 cursor-pointer";
                }
                return "";
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardManager;