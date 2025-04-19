import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAssignedSubjects,
  updateAssignedSubject,
} from "../AdminRedux/AssignSubjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchSemesters } from "../AdminRedux/AssignSubjectSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
const EditAssignedSubject = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [gradeName, setGradeName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semesterName, setSemesterName] = useState("");

  const dispatch = useDispatch();
  const { assignedSubjects } = useSelector((state) => state.assignSubject);
  const { grades } = useSelector((state) => state.grades);
  const { subjects } = useSelector((state) => state.subject);
  const { semesters } = useSelector((state) => state.assignSubject);

  useEffect(() => {
    // Fetch the required data when the page loads
    dispatch(fetchAssignedSubjects());
    dispatch(fetchGrades());
    dispatch(fetchSubjects());
    dispatch(fetchSemesters());
  }, [dispatch]);

  useEffect(() => {
    // Find the subject by ID and set the form fields with the current data
    const subject = assignedSubjects.find((subject) => subject._id === id);
    if (subject) {
      const gradeObject = grades.find((g) => g._id === subject.grade);
      setGradeName(gradeObject ? gradeObject.gradeName : "");
      setSubjectName(subject.subject || "");
      setSemesterName(subject.term || "");

      // Set the academic year based on the selected semester
      const selectedSemester = semesters.find(
        (semester) => semester.semesterName === subject.term,
      );
      if (selectedSemester) {
        setAcademicYear(
          selectedSemester.academicYear_id?.startYear?.toString() || "",
        );
      }
    }
  }, [assignedSubjects, id, grades, semesters]);

  const handleUpdateSubject = (e) => {
    e.preventDefault();

    if (!gradeName || !subjectName || !academicYear || !semesterName) {
      toast.error(t('editAssignedSubject.messages.requiredFields'));
      return;
    }

    const updatedData = { gradeName, subjectName, academicYear, semesterName };

    dispatch(updateAssignedSubject({ id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success(t('editAssignedSubject.messages.success'));
        navigate(-1);
        // navigate("/admin/allsubjects");
      })
      .catch((error) => {
        console.log(error.message ||  t('editAssignedSubject.messages.error'));
      });
  };

  const handleSemesterChange = (e) => {
    const selectedSemester = semesters.find(
      (semester) => semester.semesterName === e.target.value,
    );
    setSemesterName(e.target.value);
    setAcademicYear(
      selectedSemester?.academicYear_id?.startYear?.toString() || "",
    );
  };

  return (
    <div className="mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
      {t('editAssignedSubject.title')}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form onSubmit={handleUpdateSubject} className="m-6">
          {/* Subject Dropdown */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
            {t('editAssignedSubject.labels.subject')}
            </label>
            <select
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">{t('editAssignedSubject.placeholders.subject')}</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.subjectName}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Dropdown */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
            {t('editAssignedSubject.labels.grade')}
            </label>
            <select
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">{t('editAssignedSubject.placeholders.grade')}</option>
              {grades.map((grade, index) => (
                <option key={index} value={grade.gradeName}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
            {t('editAssignedSubject.labels.semester')}
            </label>
            <select
              value={semesterName}
              onChange={handleSemesterChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">{t('editAssignedSubject.placeholders.semester')}</option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester.semesterName}>
                  {semester.semesterName}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden Academic Year Input */}
          <input
            type="hidden"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
             {t('editAssignedSubject.buttons.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAssignedSubject;
