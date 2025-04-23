import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../components/AdminRedux/studentSlice";
import { fetchTeachers } from "../components/AdminRedux/teacherSlice";
import { fetchParents } from "../components/AdminRedux/parentSlice";
import { fetchManagers } from "../components/AdminRedux/managerSlice";
import { fetchAdmins } from "../components/AdminRedux/adminSlice";
import { toast } from "react-toastify";
import img1 from "../../../assets/students 1.png";
import img2 from "../../../assets/Group.png";
import img3 from "../../../assets/people.png";
import img4 from "../../../assets/Vector.png";
import img5 from "../../../assets/Group1.png";
import { useTranslation } from 'react-i18next';

function BasicForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const networkErrorShownRef = useRef(false);
  const { students, error: studentsError } = useSelector(
    (state) => state.students,
  );
  const { teachers, error: teachersError } = useSelector(
    (state) => state.teachers,
  );
  const { parents, error: parentsError } = useSelector(
    (state) => state.parents,
  );
  const { managers, error: managersError } = useSelector(
    (state) => state.managers,
  );
  const { admins, error: adminsError } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchParents());
    dispatch(fetchManagers());
    dispatch(fetchAdmins());
  }, [dispatch]);

  useEffect(() => {
    const errors = [
      studentsError,
      teachersError,
      parentsError,
      managersError,
      adminsError,
    ];

    // Check if any error is a network error
    const hasNetworkError = errors.some(
      (error) => error && error.includes("NetworkError"),
    );

    // Show toast only once for network error
    if (hasNetworkError && !networkErrorShownRef.current) {
      toast.error(
        t("dashboardadmin.errors.network")
      );
      networkErrorShownRef.current = true; // Mark network error toast as shown
    }
  }, [studentsError, teachersError, parentsError, managersError, adminsError]);

  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="mb-6 ms-14 mt-2 px-6 py-8 sm:px-12 md:ms-16 md:px-16 lg:px-28">
        <h2 className="w-full font-poppins text-3xl font-bold text-[#043B44] sm:w-52">
        {t("AllMembers")}
        </h2>
        <div className="mb-4 mt-1 h-[4px] w-24 rounded-t-md bg-[#244856] sm:w-36 md:w-48"></div>
      </div>

      <div className="flex flex-col items-center px-4">
        <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2 md:gap-x-16 lg:grid-cols-3 xl:gap-x-32">
          {/* Students Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105 dark:bg-[#117C90]"
            onClick={() => handleCardClick("/admin/allstudent")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#D1F3E0] p-2 text-4xl">
                <img src={img1} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3] dark:text-white">
              {t("dashboardadmin.users.students")}
              </h3>
            </div>
            <p className="border-t-2 border-[#3CB878]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black dark:text-white">
              {students?.length || 0}
            </p>
          </div>

          {/* Teachers Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105 dark:bg-[#117C90]"
            onClick={() => handleCardClick("/admin/allteachers")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#E1F1FF] p-2 text-4xl">
                <img src={img2} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3] dark:text-white">
              {t("dashboardadmin.users.teachers")}
              </h3>
            </div>
            <p className="border-t-2 border-[#7CA6FD]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black dark:text-white">
              {teachers?.length || 0}
            </p>
          </div>

          {/* Manager Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105 dark:bg-[#117C90]"
            onClick={() => handleCardClick("/admin/allmanagers")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#FFEAEA] p-2 text-4xl">
                <img src={img3} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3] dark:text-white">
              {t("dashboardadmin.users.manager")}
              </h3>
            </div>
            <p className="border-t-2 border-[#F61414]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black dark:text-white">
              {managers?.length || 0}
            </p>
          </div>

          {/* Parents Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105 dark:bg-[#117C90]"
            onClick={() => handleCardClick("/admin/allparents")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#FFF2D8] p-2 text-4xl">
                <img src={img4} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3] dark:text-white">
              {t("dashboardadmin.users.parents")}
              </h3>
            </div>
            <p className="border-t-2 border-[#F48301]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black dark:text-white">
              {parents?.length || 0}
            </p>
          </div>

          {/* Admin Card */}
          <div
            className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-md transition-transform hover:scale-105 dark:bg-[#117C90]"
            onClick={() => handleCardClick("/admin/alladmins")}
          >
            <div className="my-3 flex items-center">
              <div className="mb-2 me-3 rounded-full bg-[#D1F3E0] p-2 text-4xl">
                <img src={img5} alt="notfoundimage" />
              </div>
              <h3 className="font-poppins text-xl text-[#A3A3A3] dark:text-white">
             { t("dashboardadmin.users.admin")}
              </h3>
            </div>
            <p className="border-t-2 border-[#30F587]"></p>
            <p className="mt-8 text-center font-poppins text-xl font-bold text-black dark:text-white">
              {admins?.length || 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicForm;
