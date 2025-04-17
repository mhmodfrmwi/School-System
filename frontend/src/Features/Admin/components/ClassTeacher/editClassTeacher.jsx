import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClasses } from "../AdminRedux/classSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice";
import { editClassTeacher } from "../AdminRedux/classTeacherSlice";
import { useTranslation } from 'react-i18next';
const EditClassTeacherForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data from the Redux store
  const { classes } = useSelector((state) => state.classes);
  const { subjects } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teachers);
  const { classTeachers } = useSelector((state) => state.classTeacher);

  // State to hold the form data
  const [formData, setFormData] = useState({
    teacherSubject: "", // Combines teacher and subject
    classAcademicYear: "", // Combines class and academic year
  });

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    // Find the class teacher to edit
    const classTeacherToEdit = classTeachers.find(
      (teacher) => teacher._id === id,
    );
    if (classTeacherToEdit) {
      setFormData({
        teacherSubject: `${classTeacherToEdit.teacherId._id}-${classTeacherToEdit.subjectId._id}`,
        classAcademicYear: `${classTeacherToEdit.classId._id}-${classTeacherToEdit.academicYear_id._id}`,
      });
    }
  }, [classTeachers, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split the combined values back into individual IDs
    const [teacherId, subjectId] = formData.teacherSubject.split("-");
    const [classId] = formData.classAcademicYear.split("-");

    // Find the corresponding names for the IDs
    const selectedTeacher = teachers.find(
      (teacher) => teacher._id === teacherId,
    );
    const selectedSubject = subjects.find(
      (subject) => subject._id === subjectId,
    );
    const selectedClass = classes.find((cls) => cls._id === classId);
    const selectedAcademicYear = classes.find(
      (cls) => cls._id === classId,
    )?.academicYear_id;

    // Prepare the data to match the server's expectations
    const updatedClassTeacher = {
      className: selectedClass?.className || "",
      subjectName: selectedSubject?.subjectName || "",
      teacherName: selectedTeacher?.fullName || "",
      academicYear:
        `${selectedAcademicYear?.startYear}-${selectedAcademicYear?.endYear}` ||
        "",
    };

    dispatch(editClassTeacher({ id, updatedClassTeacher }))
      .unwrap()
      .then(() => {
        navigate(`/admin/allteachers/${id}`);
      })
      .catch((error) => {
        console.error("Error updating class teacher", error);
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
          {/* Teacher-Subject Field */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("teacherdata.TeacherSubject")}
            </label>
            <select
              name="teacherSubject"
              value={formData.teacherSubject}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">{t("teacherdata.SelectTeacherSubject")}</option>
              {teachers?.map((teacher) =>
                subjects?.map((subject) => (
                  <option
                    key={`${teacher._id}-${subject._id}`}
                    value={`${teacher._id}-${subject._id}`}
                  >
                    {teacher.fullName} - {subject.subjectName}
                  </option>
                )),
              )}
            </select>
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
              <option value="">{t("teacherdata.SelectClassAcademicYear")}</option>
              {classes?.map((cls) => (
                <option
                  key={cls._id}
                  value={`${cls._id}-${cls.academicYear_id._id}`}
                >
                  {cls.className} - {cls.academicYear_id.startYear} -{" "}
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
