import React, { useState } from "react";
import AddCourse from "./AddCourseName"; // استيراد مكون إضافة المادة
import AssignCourse from "./AssignCourse"; // استيراد مكون تعيين المادة

function CourseManagementPage() {
  const [selectedTab, setSelectedTab] = useState("add"); // حالة لتحديد التبويب المختار

  return (
    <div className="w-full mx-auto mt-10">
      {/* التبويبات */}
      <div className="flex mb-20 border border-gray-300 rounded-full overflow-hidden w-[60%] mx-auto bg-[#F5F5F5]">
        <button
          onClick={() => setSelectedTab("add")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium ${selectedTab === "add" ? "bg-[#117C90] text-white" : "bg-[#F5F5F5] text-gray-700"} rounded-full`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            1
          </span>
          Add Course
        </button>
        <button
          onClick={() => setSelectedTab("assign")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium ${selectedTab === "assign" ? "bg-[#117C90] text-white" : "bg-[#F5F5F5] text-gray-700"} rounded-full`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            2
          </span>
          Assign Course
        </button>
      </div>

      {/* محتوى Add Course */}
      {selectedTab === "add" && <AddCourse />}
      
      {/* محتوى Assign Course */}
      {selectedTab === "assign" && <AssignCourse />}
    </div>
  );
}

export default CourseManagementPage;
