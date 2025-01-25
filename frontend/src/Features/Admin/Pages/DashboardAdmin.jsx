import React , { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../components/AdminRedux/studentSlice";
import { fetchTeachers } from "../components/AdminRedux/teacherSlice";
import { fetchParents } from "../components/AdminRedux/parentSlice";
import { fetchBosses } from "../components/AdminRedux/managerSlice";
import { fetchAdmins } from "../components/AdminRedux/adminSlice";
import { fetchTerms } from "../components/AdminRedux/termSlice";
import { fetchSubjects } from "../components/AdminRedux/subjectSlice";
import { fetchScheduals } from "../components/AdminRedux/scheduleSlice";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { students, loading: loadingStudents } = useSelector((state) => state.students);
  const { teachers, loading: loadingTeachers } = useSelector((state) => state.teachers);
  const { parents, loading: loadingParents } = useSelector((state) => state.parents);
  const { bosses, loading: loadingBosses } = useSelector((state) => state.bosses);
  const { admins, loading: loadingAdmins } = useSelector((state) => state.admins);
  const { terms, loading: loadingTerms } = useSelector((state) => state.terms);
  const { subjects, loading: loadingSubjects } = useSelector((state) => state.subject);
  const { scheduals, loading: loadingSchedules } = useSelector((state) => state.schedule);






  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchParents());
    dispatch(fetchBosses());
    dispatch(fetchAdmins());
    dispatch(fetchTerms());
    dispatch(fetchSubjects());
    dispatch(fetchScheduals());
  }, [dispatch]);

  const maleTeachers = teachers.filter(teacher => teacher.gender === 'M').length;
  const femaleTeachers = teachers.filter(teacher => teacher.gender === 'F').length;
  const maleStudents = students.filter(student => student.gender === 'M').length;
  const femaleStudents = students.filter(student => student.gender === 'F').length;


  const pieData = [
    { name: "Students", value: loadingStudents ? 0 : students?.length || 0, color: "#4CAF50" },
    { name: "Parents", value: loadingParents ? 0 : parents?.length || 0, color: "#FF9800" },
    { name: "Teachers", value: loadingTeachers ? 0 : teachers?.length || 0, color: "#2196F3" },
    { name: "Managers", value: loadingBosses ? 0 : bosses?.length || 0, color: "#F44336" },
    { name: "Admins", value: loadingAdmins ? 0 : admins?.length || 0, color: "#9C27B0" },
  ];
  

  return (
    <div className="p-6 ">
      {/* Overview Section */}
      <section>
        <h2 className="text-2xl font-semibold font-poppins text-gray-700 mb-2">Overview</h2>
        <div className="mt-1 h-[4px] w-[100px] rounded-t-md bg-[#244856] mb-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Students", value:  loadingStudents ? "Loading...": students.length, icon: "/src/assets/students 1.png" , bgColor:" #D1F3E0"},
            { label: "Teachers", value: loadingTeachers ? "Loading..." : teachers.length, icon: "/src/assets/Group.png" , bgColor:"#E1F1FF" },
            { label: "Parents", value:  loadingParents ? "Loading..." :  parents.length, icon: "/src/assets/vector.png" , bgColor:"#FFF2D8" },
            { label: "Manager", value:loadingBosses ? "Loading..." : bosses.length, icon: "/src/assets/people.png"  , bgColor:"#FFEAEA"},
            { label: "Admin", value:  loadingAdmins ? "Loading..." :admins.length, icon: "/src/assets/Group1.png"  , bgColor:"#D1F3E0"},
            { label: "Terms", value:  loadingTerms ? "Loading..." :terms.length, icon: "/src/assets/Term.png" , bgColor:"#E1F1FF"},
            { label: "Courses", value: loadingSubjects ? "Loading..." :subjects.length, icon: "/src/assets/Course.png" , bgColor:"#FFF2D8"},
            { label: "Schedule", value: loadingSchedules ? "Loading..." :scheduals.length, icon: "/src/assets/Schedule.png", bgColor:"#FFEAEA" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 text-center flex items-center justify-start"
            >
              <div className="w-16 h-16  rounded-full flex items-center justify-center mb-2" 
               style={{ backgroundColor: item.bgColor }}>
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
            <ResponsiveContainer width="100%" height={200}>
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
            </ResponsiveContainer>
          </div>

          {/* Teachers Chart */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-center  font-poppins text-lg font-medium text-gray-600 mb-4">
              Teachers
            </h3>
            <ResponsiveContainer width="100%" height={200}>
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
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-center  font-poppins text-lg font-medium text-gray-600 mb-4">
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
};

export default Dashboard;
