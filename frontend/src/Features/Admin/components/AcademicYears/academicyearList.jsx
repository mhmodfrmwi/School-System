import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./AcademicYearHeader";
import { useNavigate } from "react-router-dom"; 

const academicYears = [
  { id: 1, year: "2022-2023", color: "#68D391" }, // Green
  { id: 2, year: "2022-2023", color: "#63B3ED" }, // Blue
  { id: 3, year: "2023-2024", color: "#F6AD55" }, // Orange
  { id: 4, year: "2023-2024", color: "#FC8181" }, // Red
];

const AcademicYearList = () => {
  const navigate = useNavigate(); 

  const handleEditClick = (id) => {
    navigate(`/admin/editacademicyearform/${id}`);
  };

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="p-5 max-w-full">
        {academicYears.map((year) => (
          <div
            key={year.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full"
          >
            {/* Icon and Info */}
            <div className="flex items-center">
              {/* Circle Icon */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                style={{ backgroundColor: `${year.color}33` }} // Light background
              >
                <FontAwesomeIcon icon={faCalendar} style={{ color: year.color }} />
              </div>

              {/* Year Info */}
              <p className="m-0 text-lg font-bold text-gray-700">{year.year}</p>
            </div>

            {/* Actions */}
            <div className="flex">
              <button className="border-none bg-none text-[#117C90] cursor-pointer mr-2" onClick={() => handleEditClick(year.id)}>
                <FontAwesomeIcon icon={faEdit} className="text-lg" />
              </button>
              <button className="border-none bg-none text-[#E74833] cursor-pointer">
              <i
                        className="far fa-trash-alt"
                        style={{ fontSize: "16px" }}
                      />
              
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicYearList;
