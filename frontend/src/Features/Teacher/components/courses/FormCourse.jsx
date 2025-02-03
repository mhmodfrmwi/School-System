import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPdfMaterial } from "../TeacherRedux/PdfMaterialSlice";
import { fetchSubjects } from "../../../Admin/components/AdminRedux/subjectSlice";
import { fetchGrades } from "../../../Admin/components/AdminRedux/gradeSlice";
import { fetchTerms } from "../../../Admin/components/AdminRedux/termSlice";
import { fetchAcademicYears } from "../../../Admin/components/AdminRedux/academicYearSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaterialForm = () => {
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.subject.subjects);
  const grades = useSelector((state) => state.grades.grades);
  const terms = useSelector((state) => state.terms.terms);
  const academicYears = useSelector((state) => state.academicYears.academicYears);

  const [formData, setFormData] = useState({
    title: "",
    type: "PDF",
    fileUrl: "",
    academicYear: "",
    grade: "",
    subject: "",
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "academicYear") {
      const formattedYear = value.replace("-", "/");
      console.log("Selected Academic Year:", formattedYear);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validTypes = ["PDF", "Video"];
    if (!validTypes.includes(formData.type)) {
      toast.error("Invalid type selected");
      return;
    }

    if (formData.type !== "Link" && !formData.fileUrl) {
      toast.error("File URL is required for this type");
      return;
    }

    if (!formData.subject) {
      toast.error("Subject is required");
      return;
    }

    if (!formData.semester) {
      toast.error("Semester is required");
      return;
    }

    console.log("Form Data:", formData); 

    dispatch(postPdfMaterial(formData))
      .unwrap()
      .then(() => {
        setFormData({
          title: "",
          type: "PDF",
          fileUrl: "",
          academicYear: "",
          grade: "",
          subject: "",
          semester: "",
        });
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred"); 
      });
  };

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchGrades());
    dispatch(fetchTerms());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Upload Material
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[190px]"></div>
      </div>
      <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-poppins font-medium">Title <span className="text-red-500">*</span></label>
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
            <label className="block font-poppins font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full font-poppins px-4 py-2 border text-gray-600 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Type</option>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
            </select>
          </div>
          {formData.type !== "Link" && (
            <div>
              <label className="block font-poppins font-medium">File URL <span className="text-red-500">*</span></label>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-poppins font-medium">Grade</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full font-poppins px-4 py-2 border text-gray-600 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="" disabled>Select grade</option>
                {grades?.map((grade) => (
                  <option key={grade._id} value={grade.gradeName}>
                    {grade.gradeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-poppins font-medium">Subject</label>
              <select
                name="subject" 
                value={formData.subject} 
                onChange={handleChange}
                className="w-full rounded-2xl text-gray-600 font-poppins border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="" disabled>Select subject</option>
                {subjects?.map((subject) => (
                  <option key={subject._id} value={subject.subjectName}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid font-poppins grid-cols-2 gap-4">
            <div>
              <label className="block font-poppins font-medium">Academic Year</label>
              <select
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                className="w-full rounded-2xl text-gray-600 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="" disabled>Select Academic Year</option>
                {academicYears?.map((year) => (
                  <option key={year._id} value={`${year.startYear}-${year.endYear}`}>
                    {year.startYear}-{year.endYear}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-poppins font-medium">Semester</label>
              <select
                name="semester" // تم تغيير semesterName إلى semester
                value={formData.semester} // تم تغيير semesterName إلى semester
                onChange={handleChange}
                className="w-full rounded-2xl border text-gray-600 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="" disabled>Select semester</option>
                {terms
                  .filter((term) => {
                    const academicYearValue = `${term.academicYear_id.startYear}-${term.academicYear_id.endYear}`;
                    return academicYearValue === formData.academicYear;
                  })
                  .map((term) => (
                    <option key={term._id} value={term.semesterName}>
                      {term.semesterName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-[#117C90] text-white font-poppins rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block">
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default MaterialForm;