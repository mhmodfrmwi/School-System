import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../components/AdminRedux/studentSlice";
import { fetchTeachers } from "../components/AdminRedux/teacherSlice";
import { fetchParents } from "../components/AdminRedux/parentSlice";
import { fetchManagers } from "../components/AdminRedux/managerSlice";
import { fetchAdmins } from "../components/AdminRedux/adminSlice";
import img1 from "../../../assets/students 1.png";
import img2 from "../../../assets/Group.png";
import img3 from "../../../assets/people.png";
import img4 from "../../../assets/Vector.png";
import img5 from "../../../assets/Group1.png";

function BasicForm() {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const { parents } = useSelector((state) => state.parents);
  const { managers } = useSelector((state) => state.managers);
  const { admins } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchParents());
    dispatch(fetchManagers());
    dispatch(fetchAdmins());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
   <div className="px-6 sm:px-12 md:px-16 lg:px-28 py-8 mb-6 ms-14 mt-2 md:ms-16">
  <h2 className="w-full sm:w-52 font-poppins text-3xl font-bold text-[#043B44]">
    All Members
  </h2>
  <div className="mt-1 h-[4px] w-24 sm:w-36 md:w-48 rounded-t-md bg-[#244856] mb-4"></div>
</div>


      <div className="flex flex-col items-center px-4">
        <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2 md:gap-x-16 lg:grid-cols-3 xl:gap-x-32">
          {/* Students Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/allstudent")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#D1F3E0] p-2 text-4xl">
                <img src={img1} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3]">Students</h3>
            </div>
            <p className="border-t-2 border-[#3CB878]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black">
            {students?.length || 0}
            </p>
          </div>

          {/* Teachers Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/allteachers")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#E1F1FF] p-2 text-4xl">
                <img src={img2} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3]">Teachers</h3>
            </div>
            <p className="border-t-2 border-[#7CA6FD]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black">
            {teachers?.length || 0}
            </p>
          </div>

          {/* Manager Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/allmanagers")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#FFEAEA] p-2 text-4xl">
                <img src={img3} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3]">Manager</h3>
            </div>
            <p className="border-t-2 border-[#F61414]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black">
            {managers?.length || 0}
            </p>
          </div>

          {/* Parents Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/allparents")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#FFF2D8] p-2 text-4xl">
                <img src={img4} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3]">Parents</h3>
            </div>
            <p className="border-t-2 border-[#F48301]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black">
            {parents?.length || 0}
            </p>
          </div>

          {/* Admin Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105"
            onClick={() => handleCardClick("/admin/alladmins")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#D1F3E0] p-2 text-4xl">
                <img src={img5} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3]">Admin</h3>
            </div>
            <p className="border-t-2 border-[#30F587]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black">
            {admins?.length || 0} 
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicForm;
