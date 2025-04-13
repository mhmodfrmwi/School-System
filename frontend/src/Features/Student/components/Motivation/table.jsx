import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentWithFriendsReward } from "../StudentRedux/motivationSlice";
import { useTranslation } from 'react-i18next';
function Table() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { studentWithFriendsReward: friends } = useSelector(
    (state) => state.motivation,
  );

  useEffect(() => {
    dispatch(getStudentWithFriendsReward());
  }, [dispatch]);
  const score = useMemo(() => [
    {
      r11: t('table.examsHomework'),
      r12: t('table.eachQuestion'),
      r13: t('table.points5'),
      r14: "",
    },
    {
      r11: t('table.messages'),
      r12: t('table.eachMessage'),
      r13: t('table.points5'),
      r14: t('table.messageComment'),
    },
    {
      r11: t('table.courseMaterials'),
      r12: t('table.eachDownload'),
      r13: t('table.points5'),
      r14: "",
    },
    {
      r11: t('table.virtualClassrooms'),
      r12: t('table.eachClass'),
      r13: t('table.points5'),
      r14: "",
    },
  ], [t]);

  return (
    <>
      <section>
        <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
          <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
            <div className="ms-[-20px] flex flex-col p-6">
              <h1 className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-lg font-bold text-[#244856] text-transparent sm:text-xl lg:text-2xl">
              {t('table.weightsLimits')}
              </h1>
              <div className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#BC6FFB]"></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t('table.module')}
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t('table.activity')}
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t('table.points')}
                  </th>
                  <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                  {t('table.comments')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {score.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r11}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r12}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r13}
                    </td>
                    <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                      {row.r14}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:w-[900px] xl:w-[1200px]">
          <div className="ms-[-20px] flex flex-col p-6">
            <h1 className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-lg font-bold text-[#244856] text-transparent sm:text-xl lg:text-2xl">
            {t('table.topStudents')}
            </h1>
            <div className="mb-4 ms-1 w-24 rounded-xl border-t-4 border-[#BC6FFB]"></div>
          </div>
          <div className="overflow-x-auto">
            {" "}
            {/* Horizontal scrolling for the table */}
            <div className="max-h-[400px] overflow-y-auto">
              {" "}
              {/* Fixed height with vertical scrolling */}
              <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.fullName')}
                    </th>
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.academicNumber')}
                    </th>
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.totalPoints')}
                    </th>
                    <th className="border border-[#FFA4A4] px-4 py-2 text-left font-poppins text-xs sm:text-base md:text-lg">
                    {t('table.badge')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {friends.friends?.map((friend) => (
                    <tr key={friend._id} className="hover:bg-gray-100">
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.fullName}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.academic_number}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.totalPoints}
                      </td>
                      <td className="border border-[#FFA4A4] px-4 py-7 font-poppins text-xs sm:text-sm md:text-sm">
                        {friend.badge}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Table;
