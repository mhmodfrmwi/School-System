import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { toast } from "react-toastify";
import { updateMaterial ,fetchMaterials} from "../TeacherRedux/PdfMaterialSlice";  


const EditMaterial = () => {    
    const { materialId } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedMaterial = useSelector((state) =>
      state.pdfMaterials.pdfMaterials.find((mat) => mat._id === materialId)
    );
  
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      type: "PDF",
      fileUrl: "",
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
          fileUrl: selectedMaterial.file_url || "",
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
      console.log("Submitting update:", formData);
  
      try {
        if (!materialId) {
          throw new Error("Material ID is missing!");
        }
  
        const result = await dispatch(updateMaterial({ materialId, formData }));
        console.log("Update result:", result);
  
        if (result.error) {
          throw new Error(result.error.message);
        }
  
        toast.success("Material updated successfully");
        navigate(-1); 
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Failed to update material");
      }
    };
  

  return (
    <>
    <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
    <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
     Edit Material</h1>
     
     <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[190px]"></div>
     </div>
     <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block font-poppins font-medium">
             Title <span className="text-red-500">*</span>
           </label>
           <input
             type="text"
             name="title"
             value={formData.title}
             onChange={handleChange}
             className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
             required
           />
         </div>
         <div>
           <label className="block font-poppins font-medium">Description </label>
           <input
             type="text"
             name="description"
             value={formData.description}
             onChange={handleChange}
             className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
             required
           />
         </div>
         <div>
           <label className="block font-poppins font-medium">Type</label>
           <select
             name="type"
             value={formData.type}
             onChange={handleChange}
             className="w-full font-poppins px-4 py-2 border text-gray-600 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
           >
             <option value="PDF">PDF</option>
             <option value="Video">Video</option>
           </select>
         </div>
         {formData.type !== "Link" && (
           <div>
             <label className="block font-poppins font-medium">
               File URL <span className="text-red-500">*</span>
             </label>
             <input
               type="text"
               name="fileUrl" 
               value={formData.fileUrl}
               onChange={handleChange}
               className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
               required
             />
           </div>
         )}
         <button
           type="submit"
           className="px-6 py-2 bg-[#117C90] text-white font-poppins rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
         >
           Update
         </button>
       </form>
     </div>
     </>
  );
};

export default EditMaterial;
