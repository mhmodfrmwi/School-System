import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faVideo,faBook,faTasks,faFileAlt,faPlus,faEye,} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddMaterial = () => {
  const navigate = useNavigate();
  const handleAddClick = () => {
        navigate("/teacher/materialform");
      };
  const colors = ["#68D391", "#63B3ED", "#F6AD55", "#FC8181"];
  const courses = [
    { id: 1, name: "Video Lectures", total: 26, icon: faVideo },
    { id: 2, name: "Course Material", total: 24, icon: faBook },
    { id: 3, name: "Assignments", total: 100, icon: faTasks },
    { id: 4, name: "Exams", total: 19, icon: faFileAlt },
  ];
  const getColor = (index) => {
    return colors[index % colors.length];
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="space-y-4 w-[80%]">
          <div className="w-full bg-gray-100 border-2 border-gray-200 font-poppins rounded p-3 mb-4">
            English Language - Grade 1
          </div>
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="flex items-center justify-between bg-white rounded-lg shadow-md mb-4 p-4 max-w-full"
            >
              <div className="flex items-center">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full mr-4"
                  style={{ backgroundColor: `${getColor(index)}33` }}
                >
                  <FontAwesomeIcon className="h-5 w-5"
                    icon={course.icon} 
                    style={{ color: getColor(index) }}
                  />
                </div>

                <div className="flex flex-col">
                  <p className="m-0 text-lg font-poppins font-semibold text-gray-600">
                    {course.name}
                  </p>
                  <p className="text-gray-500 font-poppins text-sm">Total: {course.total}</p>
                </div>
              </div>

              <div className="flex">
                <Link
                  to={`/teacher/seematerial`}
                  className="border-none bg-none text-[#117C90] cursor-pointer mr-2"
                >
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                </Link>
                <button onClick={handleAddClick} 
                  className="border-none bg-none text-[#117C90] cursor-pointer mr-2"
                >
                  <FontAwesomeIcon icon={faPlus} className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMaterial;