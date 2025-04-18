import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterials } from "../../TeacherRedux/PdfMaterialSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SeeAllMaterial = () => {
  const { grade_subject_semester_id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const pdfMaterials = useSelector((state) => state.pdfMaterials.pdfMaterials);

  console.log("grade_subject_semester_id:", grade_subject_semester_id);
  console.log("pdfMaterials:", pdfMaterials);

  useEffect(() => {
    console.log(
      "Fetching materials for grade_subject_semester_id:",
      grade_subject_semester_id,
    );
    if (grade_subject_semester_id) {
      dispatch(fetchMaterials(grade_subject_semester_id));
    }
  }, [dispatch, grade_subject_semester_id]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-full xl:w-full">
          <div className="ml-8 flex flex-col">
            <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
              {t("tablesheader.Materials")}
            </h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[150px]"></div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mt-7">
              <div className="overflow-x-auto">
                <table className="border-re dark: min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-DarkManager">
                  <thead className="bg-[#117C90] text-white dark:bg-DarkManager">
                    <tr>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.Title")}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.Description")}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.Type")}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t("tablesheader.FileUrl")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfMaterials.length > 0 ? (
                      pdfMaterials.map((material, index) => (
                        <tr
                          key={material._id}
                          className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-DarkManager/70`}
                        >
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {material.title}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {material.description}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {material.type}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            <a
                              href={material.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#20606b] hover:underline"
                            >
                              {t("tablesheader.ViewFile")}
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-9 text-center font-poppins"
                        >
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
    </div>
  );
};

export default SeeAllMaterial;
