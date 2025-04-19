import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSchedual } from "../AdminRedux/scheduleSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchTerms } from "../AdminRedux/termSlice";
import { fetchClasses } from "../AdminRedux/classSlice";
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
function ScheduleForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const teachers = useSelector((state) => state.teachers.teachers);
  const subjects = useSelector((state) => state.subject.subjects);
  const grades = useSelector((state) => state.grades.grades);
  const terms = useSelector((state) => state.terms.terms);
  const classes = useSelector((state) => state.classes.classes);
  const academicYears = useSelector(
    (state) => state.academicYears.academicYears,
  );

  const [formData, setFormData] = useState({
    className: "",
    subjectName: "",
    teacherName: "",
    grade: "",
    academicYear: "",
    day: "",
    startTime: "",
    endTime: "",
    semesterName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };

      if (name === "academicYear") newState.semesterName = "";
      if (name === "subjectName") newState.teacherName = "";
      if (name === "grade") newState.className = "";
      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSchedual(formData))
      .unwrap()
      .then(() => {
        toast.success(t("schedule.form.messages.successAdd"));
        setFormData({
          className: "",
          subjectName: "",
          teacherName: "",
          grade: "",
          academicYear: "",
          day: "",
          startTime: "",
          endTime: "",
          semesterName: "",
        });
      })
      .catch((error) => {
        toast.error(error || t("schedule.form.messages.error"));
      });
  };

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchSubjects());
    dispatch(fetchGrades());
    dispatch(fetchTerms());
    dispatch(fetchClasses());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
      {t("schedule.form.addTitle")}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.academicYear")}
            </label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="" className="dark:text-white" disabled>
              {t("schedule.form.placeholders.selectAcademicYear")}
              </option>
              {academicYears?.map((year) => (
                <option
                  key={year._id}
                  value={`${year.startYear}/${year.endYear}`}
                >
                  {year.startYear} / {year.endYear}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.semester")}
            </label>
            <select
              name="semesterName"
              value={formData.semesterName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="" className="dark:text-white" disabled>
              {t("schedule.form.placeholders.selectSemester")}
              </option>
              {terms
                .filter((term) => {
                  const academicYearValue = `${term.academicYear_id.startYear}/${term.academicYear_id.endYear}`;
                  return academicYearValue === formData.academicYear;
                })
                .map((term) => (
                  <option key={term._id} value={term.semesterName}>
                    {term.semesterName}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.subject")}
            </label>
            <select
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="" className="dark:text-white" disabled>
              {t("schedule.form.placeholders.selectSubject")}
              </option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject.subjectName}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.teacher")}
            </label>
            <select
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="" className="dark:text-white" disabled>
              {t("schedule.form.placeholders.selectTeacher")}

              </option>
              {(() => {
                const selectedSubject = subjects.find(
                  (s) => s.subjectName === formData.subjectName,
                );
                return teachers
                  ?.filter((teacher) =>
                    selectedSubject
                      ? teacher.subjectId.subjectName.includes(
                          selectedSubject.subjectName,
                        )
                      : true,
                  )
                  .map((teacher) => (
                    <option key={teacher._id} value={teacher.fullName}>
                      {teacher.fullName}
                    </option>
                  ));
              })()}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.grade")}
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="" className="dark:text-white" disabled>
              {t("schedule.form.placeholders.selectGrade")}
              </option>
              {grades?.map((grade) => (
                <option key={grade._id} value={grade.gradeName}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.class")}
            </label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="" className="dark:text-white" disabled>
              {t("schedule.form.placeholders.selectClass")}
              </option>
              {(() => {
                const selectedGrade = grades.find(
                  (g) => g.gradeName === formData.grade,
                );
                return classes
                  ?.filter((c) =>
                    selectedGrade ? c.gradeId._id === selectedGrade._id : true,
                  )
                  .map((classItem) => (
                    <option key={classItem._id} value={classItem.className}>
                      {classItem.className}
                    </option>
                  ));
              })()}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.day")}
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            >
              <option value="" className="dark:text-white" disabled>
              {t("schedule.form.placeholders.selectDay")}
              </option>
              <option value="Monday">{t("schedule.form.days.monday")}</option>
              <option value="Tuesday">{t("schedule.form.days.tuesday")}</option>
              <option value="Wednesday">{t("schedule.form.days.wednesday")}</option>
              <option value="Thursday">{t("schedule.form.days.thursday")}</option>
              <option value="Friday">{t("schedule.form.days.friday")}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.from")}
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
            {t("schedule.form.fields.to")}
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              required
            />
          </div>

          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
                {t("schedule.form.submit.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleForm;
