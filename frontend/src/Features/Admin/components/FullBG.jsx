import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const FullBG = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#117C90]">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 bg-white mx-4 my-6 rounded-lg shadow-lg">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
       

        
      </div>
    </div>
  );
};

export default FullBG;
