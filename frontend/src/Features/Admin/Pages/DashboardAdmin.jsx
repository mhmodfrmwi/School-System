import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const pieData = [
    { name: "Students", value: 50, color: "#4CAF50" },
    { name: "Parents", value: 25, color: "#FF9800" },
    { name: "Teachers", value: 15, color: "#2196F3" },
    { name: "Managers", value: 10, color: "#F44336" },
    { name: "Admins", value: 8, color: "#9C27B0" },
  ];

  return (
    <div className="p-6 ">
      {/* Overview Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Overview</h2>
        <div className="mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856] mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Students", value: "50,000", icon: "👩‍🎓" },
            { label: "Teachers", value: "1,500", icon: "👨‍🏫" },
            { label: "Parents", value: "60,000", icon: "👪" },
            { label: "Manager", value: "2", icon: "👔" },
            { label: "Admin", value: "1", icon: "⚙️" },
            { label: "Terms", value: "5", icon: "📅" },
            { label: "Courses", value: "1", icon: "📚" },
            { label: "Schedule", value: "2", icon: "📆" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 text-center flex items-center justify-start"
            >
              <div className="w-16 h-16 bg-[#F1F1F1] rounded-full flex items-center justify-center mb-2">
                <div className="text-3xl">{item.icon}</div>
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
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Statistics of users
        </h2>
        <div className="mt-1 h-[4px] w-[200px] rounded-t-md bg-[#244856] mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {/* Students Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-center text-lg font-medium text-gray-600 mb-4">
              Students
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Female", value: 30000, color: "#4CAF50" },
                    { name: "Male", value: 20000, color: "#2196F3" },
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
            </ResponsiveContainer>
          </div>

          {/* Teachers Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-center text-lg font-medium text-gray-600 mb-4">
              Teachers
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Female", value: 1000, color: "#4CAF50" },
                    { name: "Male", value: 500, color: "#2196F3" },
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
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-center text-lg font-medium text-gray-600 mb-4">
              Percentage Of Users By Type
            </h3>
            <ResponsiveContainer width="100%" height={250}>
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
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
<section className="mt-12">
  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
    Calendar
  </h2>
  <div className="mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856] mb-6"></div>
  <div className="bg-white shadow-md rounded-lg p-6 max-w-[400px]">
    <Calendar />
  </div>
</section>

    </div>
  );
};

export default Dashboard;
