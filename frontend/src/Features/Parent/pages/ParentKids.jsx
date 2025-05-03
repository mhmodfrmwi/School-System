import { motion } from "framer-motion";
import { useParentKids } from "../hooks/useParentKids";
import Loader from "@/ui/Loader";
// import { useCreateKid } from "./hooks/useCreateKid";
import { FiUser, FiMail, FiBook, FiUsers } from "react-icons/fi";
import { FaChild } from "react-icons/fa";
import { useState } from "react";
import ParentKidDashboard from "./ParentKidDashboard"; 
import { useNavigate } from "react-router-dom";
function ParentKids() {
   const navigate = useNavigate();
  const { parentKids, isLoading } = useParentKids();

  const [selectedKid, setSelectedKid] = useState(null);


  if (isLoading) return <Loader role="parent" />;
  const handleSelectKid = (kid) => {
    localStorage.setItem('isInParentDashboard', 'false'); 
    navigate("/parent/dashboard", { state: { selectedKid: kid } });
  };
  
  // if (selectedKid) {
  //   return <ParentKidDashboard kid={selectedKid} onBack={() => setSelectedKid(null)} />;
  // }
  // const handleSelectKid = (kid) => {
  //   setSelectedKid(kid);
  // };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="relative inline-block">
          <h1 className="flex items-center gap-3 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-3xl font-bold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
            <FaChild className="text-[#BC6FFB] dark:text-[#AE45FB]" />
            My Children
          </h1>
          <span className="absolute bottom-[-9px] left-0 h-1 w-20 rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"></span>
        </div>
      </div>

      {typeof parentKids === "string" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl bg-white p-8 text-center shadow-lg dark:bg-[#281459]"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {parentKids}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl shadow-lg"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#FFA4A4] bg-white dark:border-[#A3BFFA] dark:bg-[#281459]">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                  <th className="border border-[#FFA4A4] px-6 py-4 text-left font-poppins text-sm font-semibold dark:border-[#A3BFFA] md:text-base">
                    <div className="flex items-center gap-2">
                      <FiUser /> Full Name
                    </div>
                  </th>
                  <th className="border border-[#FFA4A4] px-6 py-4 text-left font-poppins text-sm font-semibold dark:border-[#A3BFFA] md:text-base">
                    <div className="flex items-center gap-2">
                      <FiBook /> Academic Number
                    </div>
                  </th>
                  <th className="border border-[#FFA4A4] px-6 py-4 text-left font-poppins text-sm font-semibold dark:border-[#A3BFFA] md:text-base">
                    <div className="flex items-center gap-2">
                      <FiMail /> Email
                    </div>
                  </th>
                  <th className="border border-[#FFA4A4] px-6 py-4 text-left font-poppins text-sm font-semibold dark:border-[#A3BFFA] md:text-base">
                    <div className="flex items-center gap-2">
                      <FiUsers /> Gender
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {parentKids?.length > 0 ? (
                  parentKids.map((item) => {
                    const kid = item?.student_id;
                    return (
                      <motion.tr
                        key={kid._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => handleSelectKid(kid)}
                        className={`cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-[#1f1142] ${
                          selectedKid?._id === kid._id
                            ? "bg-gray-100 dark:bg-[#1f1142]"
                            : ""
                        }`}
                      >
                        <td className="border border-[#FFA4A4] px-6 py-4 font-poppins text-sm text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#FD813D] to-[#BC6FFB] text-white">
                              {kid.fullName.charAt(0)}
                            </div>
                            {kid.fullName}
                          </div>
                        </td>
                        <td className="border border-[#FFA4A4] px-6 py-4 font-poppins text-sm text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300">
                          {kid.academic_number}
                        </td>
                        <td className="border border-[#FFA4A4] px-6 py-4 font-poppins text-sm text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300">
                          {kid.email}
                        </td>
                        <td className="border border-[#FFA4A4] px-6 py-4 font-poppins text-sm text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                              kid.gender === "M"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                            }`}
                          >
                            {kid.gender === "M" ? "Male" : "Female"}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FiUsers className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                        <p className="text-lg">No children found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ParentKids;
