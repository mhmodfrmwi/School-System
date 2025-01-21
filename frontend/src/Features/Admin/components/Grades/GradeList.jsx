import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./GradeHeader";
import { useNavigate } from "react-router-dom"; 

const grades = [
    { id: 1, year: "2022-2023", gradeName: "grade one",  color: "#68D391" },
    { id: 2, year: "2022-2023", gradeName: "grade two", color: "#63B3ED" },
    { id: 3, year: "2023-2024", gradeName: "grade three", color: "#F6AD55" },
    { id: 4, year: "2023-2024", gradeName: "grade four", color: "#FC8181" },
  ];

const GradeList = () => {
  const navigate = useNavigate(); 

  const handleEditClick = (id) => {
    navigate(`/admin/editGradeForm/${id}`);
  };

  return (
    <div className="overflow-x-hidden">
    <Header/>
      <div className="p-5 max-w-full">
        {grades.map((grade) => (
          <div
            key={grade.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full"
          >
            {/* Icon and Info */}
            <div className="flex items-center">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                style={{ backgroundColor: `${grade.color}33` }} // Light background
              >
                <FontAwesomeIcon icon={faCalendar} style={{ color: grade.color }} />
              </div>

              {/* Year and Grade Info */}
              <div className="flex flex-col">
                <p className="m-0 text-sm text-gray-500">{grade.year}</p>
                <p className="m-0 text-lg font-bold text-gray-600">{grade.gradeName}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex">
              <button className="border-none bg-none text-[#117C90] hover:text-[#244856] cursor-pointer mr-2" onClick={() => handleEditClick(grade.id)}>
                <FontAwesomeIcon icon={faEdit} className="text-lg" />
              </button>
              <button  className="text-[#E74833] transition duration-300 hover:text-[#244856]">
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

export default GradeList;
