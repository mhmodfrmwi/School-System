import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/ui/Loader";
import {
  fetchMaterialsInLibrary,
  deleteMaterialInLibrary,
} from "../TeacherRedux/teacherLibrarySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const MaterialsInLibrary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  const {
    teacherLibrary = [],
    loading,
    error,
  } = useSelector((state) => state.teacherLibrary || {});
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    dispatch(fetchMaterialsInLibrary(id));
  }, [dispatch, id]);

  const handleDelete = async (materialId) => {
    try {
      await dispatch(deleteMaterialInLibrary(materialId));
      toast.success("Material deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete material: " + err.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col p-4 font-poppins">
      <div className=" ">
        <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div className="">
              <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl dark:text-DarkManager">
                {t('libraryt.AllMaterialsLibrary')}
              </h1>
              <p className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[150px] dark:bg-DarkManager"></p>
            </div>

            <div
              className={`flex w-52 cursor-pointer items-center justify-center rounded-3xl bg-[#117C90] dark:bg-DarkManager py-2 font-medium text-white focus:outline-none ${isRTL ? 'sm:mr-auto' : 'sm:ml-auto'}`}
              onClick={() => navigate("/teacher/library-form")}
            >
              {t('libraryt.AddItem')}
            </div>
          </div>
          <div className="mt-7">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] dark:border-DarkManager shadow-md shadow-[#117C90]">
                <thead className="bg-[#117C90] dark:bg-DarkManager text-white">
                  <tr>
                    <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                    {t('libraryItem.title')}
                    </th>
                    <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                    {t('libraryItem.description')}
                    </th>
                    <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                    {t('libraryItem.type')}
                    </th>
                    <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                      {t('examst.Grade')}
                    </th>
                    <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                    {t('libraryItem.subject')}
                    </th>
                    <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                    {t('tablesheader.Actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teacherLibrary.length > 0 ? (
                    teacherLibrary.map((material, index) => (
                      <tr
                        key={material._id}
                        className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-DarkManager/70`}
                      >
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base dark:text-DarkManager">
                          {material.title}
                        </td>
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base dark:text-DarkManager">
                          {material.description}
                        </td>
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base dark:text-DarkManager">
                          {material.type}
                        </td>
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base dark:text-DarkManager">
                          {material.grade_subject_semester_id?.grade_subject_id
                            ?.gradeId?.gradeName || "N/A"}
                        </td>
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base  dark:text-DarkManager">
                          {material.grade_subject_semester_id?.grade_subject_id
                            ?.subjectId?.subjectName || "N/A"}
                        </td>
                        <td className={`px-3 py-2 text-xs sm:text-sm md:text-base ${isRTL ? 'space-x-reverse' : ''} space-x-2 dark:text-DarkManager`}>
                          <a
                            href={material.item_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#20606b] hover:underline"
                          >
                            <FontAwesomeIcon icon={faEye} className="text-lg" />
                          </a>
                          <button
                            onClick={() => handleDelete(material._id)}
                            className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="text-lg"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-9 text-center font-poppins">
                        No Materials Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsInLibrary;
