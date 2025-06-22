import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClasses } from "../AdminRedux/classSlice";
import { editClassTeacher, fetchClassTeacherById } from "../AdminRedux/classTeacherSlice";
import { useTranslation } from "react-i18next";

const EditClassTeacherForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data from the Redux store
  const { classes } = useSelector((state) => state.classes);
  const { selectedClassTeacher} = useSelector((state) => state.classTeacher);

  // State to hold the form data
  const [formData, setFormData] = useState({
    teacherSubject: "",
    classAcademicYear: "",
  });

  useEffect(() => {
    // Fetch class teacher data by ID
    dispatch(fetchClassTeacherById(id));
    dispatch(fetchClasses());
  }, [dispatch, id]);

  useEffect(() => {
    // Populate form data when selectedClassTeacher is available
    if (selectedClassTeacher) {
      setFormData({
        teacherSubject: `${selectedClassTeacher.teacherId._id}-${selectedClassTeacher.subjectId._id}`,
        classAcademicYear: `${selectedClassTeacher.classId._id}-${selectedClassTeacher.academicYear_id._id}`,
      });
    }
  }, [selectedClassTeacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const [classId] = formData.classAcademicYear.split("-");

    // Get the full objects for names from selectedClassTeacher and classes
    const selectedClass = classes.find((cls) => cls._id === classId);
    const academicYearObj = selectedClass?.academicYear_id;

    const updatedClassTeacher = {
      classId,
      teacherName: selectedClassTeacher?.teacherId?.fullName || "",
      subjectName: selectedClassTeacher?.subjectId?.subjectName || "",
      academicYear: `${academicYearObj?.startYear}-${academicYearObj?.endYear}` || "",
    };

    dispatch(editClassTeacher({ id, updatedClassTeacher }))
      .unwrap()
      .then(() => {
        navigate(`/admin/allteachers/${selectedClassTeacher?.teacherId?._id || id}`);
      })
      .catch((error) => {
        console.error("Error updating class teacher", error);
        console.log("🚀 updatedClassTeacher:", updatedClassTeacher);
      });
  };


  return (
    <div className="mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        {t("edit.classteacher")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Teacher-Subject Field (Read-Only) */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("teacherdata.TeacherSubject")}
            </label>
            <input
              type="text"
              name="teacherSubjectDisplay"
              value={`${selectedClassTeacher?.teacherId?.fullName || ""} - ${selectedClassTeacher?.subjectId?.subjectName || ""}`}
              readOnly
              className="w-full rounded-2xl border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 dark:bg-[#0f6b7c] dark:text-white"
            />
            {/* Hidden input to keep teacherSubject value */}
            <input
              type="hidden"
              name="teacherSubject"
              value={formData.teacherSubject}
            />
          </div>

          {/* Class-Academic Year Field */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              {t("teacherdata.ClassAcademicYear")}
            </label>
            <select
              name="classAcademicYear"
              value={formData.classAcademicYear}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">
                {t("teacherdata.SelectClassAcademicYear")}
              </option>
              {classes?.map((cls) => (
                <option
                  key={cls._id}
                  value={`${cls._id}-${cls.academicYear_id._id}`}
                >
                  {cls.gradeId.gradeName}-{cls.className} -
                  {cls.academicYear_id.startYear} -{" "}
                  {cls.academicYear_id.endYear}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("placeholders.SaveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassTeacherForm;