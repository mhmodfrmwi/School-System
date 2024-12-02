import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../../assets/students 1.png";
import img2 from "../../../assets/Group.png";
import img3 from "../../../assets/people.png";
import img4 from "../../../assets/Vector.png";
import img5 from "../../../assets/Group1.png";

function BasicForm() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="text-3xl font-poppins font-bold text-[#043B44]">All Members</h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="flex flex-col items-center px-4 py-8">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Students Card */}
          <div
            className="cursor-pointer rounded-lg bg-white p-8 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/students/allstudent")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#D1F3E0] p-2 text-4xl">
                <img src={img1} alt="notfoundimage" />
              </div>
              <h3 className="text-2xl font-poppins  text-[#A3A3A3]">Students</h3>
            </div>
            <p className="border-t-2 border-[#3CB878]"></p>
            <p className="mt-14 font-poppins text-center text-xl font-bold text-black">50000</p>
          </div>

          {/* Teachers Card */}
          <div
            className="cursor-pointer rounded-lg bg-white p-8 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/teachers/allteachers")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#E1F1FF] p-2 text-4xl">
                <img src={img2} alt="notfoundimage" />
              </div>
              <h3 className="text-2xl font-poppins text-[#A3A3A3]">Teachers</h3>
            </div>
            <p className="border-t-2 border-[#7CA6FD]"></p>
            <p className="mt-14 font-poppins text-center text-xl font-bold text-black">1500</p>
          </div>

          {/* Manager Card */}
          <div
            className="cursor-pointer rounded-lg bg-white p-8 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/managers/allmanagers")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#FFEAEA] p-2 text-4xl">
                <img src={img3} alt="notfoundimage" />
              </div>
              <h3 className="text-2xl font-poppins text-[#A3A3A3]">Manager</h3>
            </div>
            <p className="border-t-2 border-[#F61414]"></p>
            <p className="mt-14 font-poppins text-center text-xl font-bold text-black">2</p>
          </div>

          {/* Parents Card */}
          <div
            className="cursor-pointer rounded-lg bg-white p-8 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/parents/allparents")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#FFF2D8] p-2 text-4xl">
                <img src={img4} alt="notfoundimage" />
              </div>
              <h3 className="text-2xl font-poppins text-[#A3A3A3]">Parents</h3>
            </div>
            <p className="border-t-2 border-[#F48301]"></p>
            <p className="mt-14 font-poppins text-center text-xl font-bold text-black">60000</p>
          </div>

          {/* Admin Card */}
          <div
            className="cursor-pointer rounded-lg bg-white p-8 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/admins/alladmins")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#D1F3E0] p-2 text-4xl">
                <img src={img5} alt="notfoundimage" />
              </div>
              <h3 className="text-2xl font-poppins text-[#A3A3A3]">Admin</h3>
            </div>
            <p className="border-t-2 border-[#30F587]"></p>
            <p className="mt-14 font-poppins text-center text-xl font-bold text-black">1</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicForm;
