import React, { useState } from "react";
import AddSubjectName from "./AddSubjectName";
import AssignSubject from "./AssignSubject";

function SubjectManagementPage() {
  const [selectedTab, setSelectedTab] = useState("add");

  return (
    <div className="w-full mx-auto mt-10 px-4">
      {/* Tab navigation */}
      <div className="flex mb-10 border border-gray-300 rounded-full overflow-hidden max-w-[90%] md:w-[60%] mx-auto bg-[#F5F5F5]">
        <button
          onClick={() => setSelectedTab("add")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs md:text-sm font-medium ${
            selectedTab === "add"
              ? "bg-[#117C90] text-white"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-full`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            1
          </span>
          Add Subject
        </button>
        <button
          onClick={() => setSelectedTab("assign")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs md:text-sm font-medium ${
            selectedTab === "assign"
              ? "bg-[#117C90] text-white"
              : "bg-[#F5F5F5] text-gray-700"
          } rounded-full`}
        >
          <span className="w-5 h-5 flex items-center justify-center border border-[#117C90] text-[#117C90] bg-white rounded-full">
            2
          </span>
          Assign Subject
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {selectedTab === "add" && <AddSubjectName />}
        {selectedTab === "assign" && <AssignSubject />}
      </div>
    </div>
  );
}

export default SubjectManagementPage;
