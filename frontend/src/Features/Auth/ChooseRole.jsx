import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole } from "../../Features/Auth/AuthRedux/roleSlice";
import logo from "../../assets/logoorangee 1.png";
import React from "react";

const ChooseRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleRoleSelect = (role) => {
    dispatch(setRole(role)); 
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center font-poppins overflow-y-scroll bg-[#FEDDC6]">
      <div className="justify-space flex h-full w-full flex-col items-center rounded-lg">
        <div>
          <img src={logo} alt="notfound" className="mx-auto" />
          <p className="mb-16 mt-6 px-2 text-center text-4xl font-semibold text-white md:px-28 md:text-5xl">
            Experience digital education like never before.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 p-2 pb-16 md:grid-cols-5">
          {[
            { label: "Student", icon: "🎓", api: "student" },
            { label: "Teacher", icon: "👩‍🏫", api: "teacher" },
            { label: "Parent", icon: "👨‍👩‍👧", api: "parent" },
            { label: "Manager", icon: "👔", api: "manager" },
            { label: "Admin", icon: "⚙️", api: "admin" },
          ].map((item, index) => (
            <button
              key={index}
              className="flex flex-col items-center rounded-lg border-2 border-orange-500 bg-white p-12 text-center text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
              onClick={() => handleRoleSelect(item.api)}
            >
              <span className="mb-2 text-3xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
