import React from "react";
import HeaderInfo from "../components/Motivation/HeaderInfo";
import PointsSummary from "../components/Motivation/PointsSummary";
import AboutScore from "../components/Motivation/AboutScore";
import NewWayOfLearning from "../components/Motivation/NewWayOfLearning";
import SummaryScore from "../components/Motivation/SummaryScore";
import Table from "../components/Motivation/Table";
import backgroundWaves from "../../../assets/StudentIcon/bg-color2.png"; 
import backgroundStars from "../../../assets/StudentIcon/bg-color1.png";

function MotivationPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-[#FF8C38] via-[#FF6F61] to-[#C459D9] dark:bg-[#13082F] p-6 relative"
      style={{
        backgroundImage: "var(--background-image)", 
      }}
    >
      
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>

  
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>

      <div className="relative z-10">
        <HeaderInfo />
        <PointsSummary />
        <AboutScore />
        <NewWayOfLearning />
        <SummaryScore />
        <Table />
      </div>
    </div>
  );
}

export default MotivationPage;