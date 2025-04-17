import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/ui/Loader";
import Pagination from "../Pagination";
import { useState } from "react";
import { useCreateClassData } from "../services/apiAttendance";
import { useTranslation } from 'react-i18next';

const GetAttendanceClass = () => {
  const { id: classId } = useParams();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { createClassData, isCreating, data } = useCreateClassData();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  console.log(data);
  const onSubmit = (formData) => {
    if (classId && formData.date) {
      createClassData(
        { classId, date: formData.date },
        {
          onSuccess: () => {
            reset();
          },
          onError: () => {
            reset();
          },
        },
      );
    }
  };

  if (isCreating) {
    return <Loader />;
  }

  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="mx-auto w-[360px] p-4 sm:w-[550px] md:w-[700px] md:p-6 lg:px-0 xl:w-full">
      <div className="mb-6 ml-6 flex flex-col">
        <h1 className="dark:text-DarkManager font-poppins text-lg font-semibold text-[#117C90] sm:text-xl lg:text-2xl">
          {t('attendanse.ClassData')}
        </h1>
        <div className="dark:bg-DarkManager mt-1 h-[3px] w-[100px] rounded-t-md bg-[#117C90] lg:h-[4px]"></div>
      </div>

      <div className="ml-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 grid w-full grid-cols-1 gap-4 font-poppins md:w-[40%]"
        >
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="h-11 w-full rounded-md border p-2 dark:text-black"
          />
          {errors.date && (
            <p className="text-xs text-red-500">{errors.date.message}</p>
          )}

          <button
            type="submit"
            className="dark:bg-DarkManager w-full rounded bg-[#117C90] px-4 py-2 text-white hover:bg-[#0f6a7d]"
            disabled={isCreating}
          >
            {t('Absence')}
          </button>
        </form>
      </div>

      {data && data.length > 0 ? (
        <>
          <div className="dark:shadow-DarkManager mx-auto ms-2 mt-7 w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] font-poppins shadow-md shadow-[#117C90]">
            <table className="w-full">
              <thead className="dark:bg-DarkManager bg-[#117C90] text-left text-white">
                <tr>
                  <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    #
                  </th>
                  <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t('attendans.AcademicNumber')}
                  </th>
                  <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t('assignmentt.StudentName')}
                  </th>
                  <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t('attendans.Class')}
                  </th>
                  <th className="px-3 py-2 text-xs sm:text-sm md:text-base">
                  {t('assignmentt.Status')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record, index) => (
                  <tr
                    key={record._id}
                    className={`${
                      index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                    } dark:hover:bg-DarkManager/70 hover:bg-[#117C90]/70 dark:text-black`}
                  >
                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                      {record.academic_number}
                    </td>
                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                      {record.student_id?.fullName}
                    </td>
                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                      {record.class_id?.className}
                    </td>
                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center font-poppins text-gray-500">
          {t('attendanse.Noattendance')}
        </div>
      )}
    </div>
  );
};

export default GetAttendanceClass;
