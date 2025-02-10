import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterials,deleteMaterial } from "../TeacherRedux/PdfMaterialSlice"; // استدعاء الـ slice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SeeMaterial = () => {
    const { grade_subject_semester_id } = useParams();
    const dispatch = useDispatch();
    const pdfMaterials = useSelector((state) => state.pdfMaterials.pdfMaterials);
  
    useEffect(() => {
      if (grade_subject_semester_id) {
        dispatch(fetchMaterials(grade_subject_semester_id));
      }
    }, [dispatch, grade_subject_semester_id]);
  
    const handleDelete = async (id) => {
        if (!id || id.length !== 24) { 
          toast.error("Invalid Material ID");
          return;
        }
      
        if (window.confirm("Are you sure you want to delete this material?")) {
          try {
            const resultAction = await dispatch(deleteMaterial(id));
      
            if (deleteMaterial.fulfilled.match(resultAction)) {
              toast.success("Material deleted successfully!");
            } else {
              toast.error(resultAction.payload || "Failed to delete material");
            }
          } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
          }
        }
      };
      
      
  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-full xl:w-full">
          <div className="flex flex-col">
            <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
              All Materials
            </h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[150px]"></div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mt-7">
             
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
                  <thead className="bg-[#117C90] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Title
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Description
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Type
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        FileUrl
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfMaterials.length > 0 ? (
                        pdfMaterials.map((material, index) => (
                        <tr
                          key={material._id}
                          className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                        >
                          <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                            {material.title}
                          </td>
                          <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                            {material.description}
                          </td>
                          <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                            {material.type}
                          </td>
                          <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                            <a
                              href={material.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View File
                            </a>
                          </td>
                          <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                            <button className="text-[#117C90] transition duration-300 hover:text-[#244856]">
                              <FontAwesomeIcon icon={faEdit} className="text-lg" />
                            </button>
                            <button
  onClick={() => handleDelete(material._id)}
  className="text-[#E74833] transition duration-300 hover:text-[#244856]"
>
  <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center font-poppins py-9">
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

export default SeeMaterial;
