import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateMaterial, fetchMaterials } from "../TeacherRedux/PdfMaterialSlice";
import { useTranslation } from "react-i18next";

const EditMaterial = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedMaterial = useSelector((state) =>
    state.pdfMaterials.pdfMaterials.find((mat) => mat._id === materialId),
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "PDF",
    file_url: "", 
    class_id: "",
    grade_subject_semester_id: "",
  });

  useEffect(() => {
    if (!selectedMaterial) {
      dispatch(fetchMaterials());
    } else {
      setFormData({
        title: selectedMaterial.title || "",
        description: selectedMaterial.description || "",
        type: selectedMaterial.type || "PDF",
        file_url: selectedMaterial.file_url || "", 
        class_id: selectedMaterial.class_id || "",
        grade_subject_semester_id: selectedMaterial.grade_subject_semester_id || "",
      });
    }
  }, [dispatch, materialId, selectedMaterial]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!materialId) {
        throw new Error("Material ID is missing!");
      }

      const payload = {
        materialId,
        formData: {
          ...formData,
          title: formData.title,
          description: formData.description,
          type: formData.type,
          file_url: formData.file_url, 
          class_id: formData.class_id,
          grade_subject_semester_id: formData.grade_subject_semester_id
        }
      };

      const result = await dispatch(updateMaterial(payload));

      if (result.error) {
        throw new Error(result.error.message || "Update failed");
      }

      navigate(-1); 
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update material");
    }
  };

  return (
    <>
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          {t("tablesheader.EditMaterial")}
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[190px]"></div>
      </div>
      <div className="mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Title")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium dark:text-white">
              {t("tablesheader.Description")}{" "}
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-poppins font-medium">
              {t("tablesheader.Type")}
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
            >
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>
          {formData.type !== "Link" && (
            <div>
              <label className="block font-poppins font-medium dark:text-white">
                {t("tablesheader.FileUrl")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="file_url" 
                value={formData.file_url}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {t("tablesheader.Update")}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditMaterial;