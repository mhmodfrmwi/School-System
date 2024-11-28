import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AllStudent from "../components/AllStudent";

const Students = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#117C90]">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 bg-white mx-4 my-6 rounded-lg shadow-lg">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <div className="p-8">
        <AllStudent />
        </div>
      </div>
    </div>
  );
};

export default Students;
