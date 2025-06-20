import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getStudentWithFriendsReward,
  setSelectedKid
} from "../../../Parent/components/ParentRedux/MotivationSlice";

function Table() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const selectedKid = useSelector((state) => state.motivationparent.selectedKid);
  const {
    studentWithFriendsReward: friendsData,
    loading,
    error
  } = useSelector((state) => state.motivationparent);

  useEffect(() => {
    const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
    if (kidFromStorage) {
      dispatch(setSelectedKid(kidFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedKid?._id) {
      dispatch(getStudentWithFriendsReward());
    }
  }, [dispatch, selectedKid]);

  const score = useMemo(
    () => [
      {
        r11: t("table.examsHomework"),
        r12: t("table.eachQuestion"),
        r13: t("table.points5"),
        r14: "",
      },
      {
        r11: t("table.messages"),
        r12: t("table.eachMessage"),
        r13: t("table.points5"),
        r14: t("table.messageComment"),
      },
      {
        r11: t("table.courseMaterials"),
        r12: t("table.eachDownload"),
        r13: t("table.points5"),
        r14: "",
      },
      {
        r11: t("table.virtualClassrooms"),
        r12: t("table.eachClass"),
        r13: t("table.points5"),
        r14: "",
      },
    ],
    [t]
  );

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mx-auto p-6 ">
        <div className={`mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'
          }`}>
          <div className="ms-[-20px] flex flex-col p-6">
            <h1 className=" relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-lg font-bold text-[#244856] text-transparent  sm:text-xl lg:text-2xl dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
              {t("table.weightsLimits")}
              <span className={`absolute bottom-[-9px] h-[4px] w-[85px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
                }`}></span>

            </h1>
          </div>
        </div>
        <div className={`overflow-x-auto ${i18n.language === 'ar' ? 'mr-10' : 'ml-10'} w-[70%]`}>
          <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 dark:border-[#A3BFFA] shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:bg-[#C459D9] text-white">
                <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t("table.module")}
                </th>
                <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t("table.activity")}
                </th>
                <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t("table.points")}
                </th>
                <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t("table.comments")}
                </th>
              </tr>
            </thead>
            <tbody>
              {score.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-[#281459]">
                  <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300">
                    {row.r11}
                  </td>
                  <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300">
                    {row.r12}
                  </td>
                  <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300">
                    {row.r13}
                  </td>
                  <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm text-gray-700 dark:text-gray-300">
                    {row.r14}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Top Students Table */}
      <div className="mx-auto p-6 mb-12">
        <div className={`flex flex-col p-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'
          }`}>
          <h1 className="relative cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-lg font-bold text-[#244856] text-transparent sm:text-xl lg:text-2xl dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
            {t("table.topStudents")}
            <span className={`absolute bottom-[-9px] h-[4px] w-[85px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] ${i18n.language === 'ar' ? 'right-0' : 'left-0'
              }`}></span>
          </h1>
        </div>

        <div className={`overflow-x-auto ${i18n.language === 'ar' ? 'mr-10' : 'ml-10'} w-[70%]`}>
          <div className="max-h-[400px] overflow-y-auto mt-10">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 dark:border-[#A3BFFA] shadow-lg dark:shadow-[#A3BFFA]">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:bg-[#C459D9] text-white">
                  <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t("table.fullName")}
                  </th>
                  <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t("table.academicNumber")}
                  </th>
                  <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t("table.totalPoints")}
                  </th>
                  <th className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t("table.badge")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {friendsData?.friends?.map((friend) => (
                  <tr key={friend._id} className="hover:bg-gray-100 dark:hover:bg-[#281459]">
                    <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-4 font-poppins text-sm text-gray-700 dark:text-gray-300">
                      {friend.fullName}
                    </td>
                    <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-4 font-poppins text-sm text-gray-700 dark:text-gray-300">
                      {friend.academic_number}
                    </td>
                    <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-4 font-poppins text-sm text-gray-700 dark:text-gray-300">
                      {friend.totalPoints}
                    </td>
                    <td className="border border-[#FFA4A4] dark:border-[#A3BFFA] px-4 py-4 font-poppins text-sm text-gray-700 dark:text-gray-300">
                      {friend.badge}
                    </td>
                  </tr>
                ))}

                {(!friendsData || friendsData.friends?.length === 0) && (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      {t("table.noFriendsData")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;