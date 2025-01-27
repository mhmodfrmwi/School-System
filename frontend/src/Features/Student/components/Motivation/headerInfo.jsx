import React from "react";
import Frame from "../../../../assets/Frame.png";
import ScheduleIcon from "../../../../assets/ScheduleIcon.png";

function HeaderInfo() {
  return (
    <div className="flex justify-center">
    <div className="bg-gradient-to-r w-[97%] mt-4 from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding rounded-2xl p-6 shadow-lg flex justify-between items-center">
      {/* Profile image and details on the left */}
      <div className="flex items-center space-x-4">
        <img
          src={Frame}
          className="h-24 w-24 md:h-32 md:w-32"
          alt="Profile Frame"
        />
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-poppins font-semibold text-white">
            Green
          </h1>
          <img
            src={ScheduleIcon}
            className="h-6 w-6"
            alt="Schedule Icon"
          />
          <p className="text-xs md:text-sm text-white mt-1">
            7654234567890897
          </p>
        </div>
      </div>
  
      {/* Circular content on the most right */}
      <div className="flex flex-col items-center justify-center rounded-full border-2 border-white shadow-md text-gray-800 h-28 w-28 md:h-36 md:w-36">
        <p className="text-lg md:text-xl font-poppins font-bold text-white">Score</p>
        <p className="text-xs md:text-sm font-poppins text-white">for all semesters</p>
        <p className="text-2xl md:text-3xl font-extrabold text-white">385</p>
      </div>
    </div>
  </div>
  
  );
}

export default HeaderInfo;
