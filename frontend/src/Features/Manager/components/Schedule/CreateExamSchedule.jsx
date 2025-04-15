import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicYears } from "../../../Admin/components/AdminRedux/academicYearSlice";
import { fetchGrades } from "../../../Admin/components/AdminRedux/gradeSlice";
import { fetchTerms } from "../../../Admin/components/AdminRedux/termSlice";
import { fetchSubjects } from "../../../Admin/components/AdminRedux/subjectSlice";
import Loader from "../../../../ui/Loader";
import { useCreateExamSchedule } from "../services/apiSchedule";

const CreateExamSchedule = () => {
  const dispatch = useDispatch();
  const { academicYears = [] } = useSelector((state) => state.academicYears);
  const { grades = [] } = useSelector((state) => state.grades);
  const { terms = [] } = useSelector((state) => state.terms || {});
  const { subjects = [] } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(fetchAcademicYears());
    dispatch(fetchGrades());
    dispatch(fetchTerms());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const { isCreating, createExamSchedule } = useCreateExamSchedule();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      academic_year_id: "",
      semester_id: "",
      grade_id: "",
      subjects: [
        { subject_id: "", exam_date: "", start_time: "", end_time: "" },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "subjects",
  });

  const onSubmit = (formData) => {
    createExamSchedule(
      { formData },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  if (isCreating) return <Loader />;

  return (
    <div className="relative mx-auto my-10 w-[90%] font-poppins md:w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Exam Schedule
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="dark:bg-DarkManager2 rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Academic Year ID */}
          <div className="col-span-2 mb-4 sm:col-span-1">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Academic Year
            </label>
            <Controller
              name="academic_year_id"
              control={control}
              rules={{ required: "Academic Year is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((year) => (
                    <option key={year._id} value={year._id}>
                      {year.startYear} - {year.endYear}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors?.academic_year_id && (
              <p className="mt-1 text-sm text-red-700 dark:text-green-400">
                {errors.academic_year_id.message}
              </p>
            )}
          </div>

          {/* Semester ID */}
          <div className="col-span-2 mb-4 sm:col-span-1">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Semester
            </label>
            <Controller
              name="semester_id"
              control={control}
              rules={{ required: "Semester is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                >
                  <option value="">Select Semester</option>
                  {terms.map((term) => (
                    <option key={term._id} value={term._id}>
                      {term.semesterName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.semester_id && (
              <p className="mt-1 text-sm text-red-600 dark:text-green-400">
                {errors.semester_id.message}
              </p>
            )}
          </div>

          {/* Grade ID */}
          <div className="col-span-2 mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Grade
            </label>
            <Controller
              name="grade_id"
              control={control}
              rules={{ required: "Grade is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                >
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade._id} value={grade._id}>
                      {grade.gradeName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.grade_id && (
              <p className="mt-1 text-sm text-red-600 dark:text-green-400">
                {errors.grade_id.message}
              </p>
            )}
          </div>

          {/* Subjects */}
          {fields.map((subject, index) => (
            <div
              key={subject.id}
              className={`subject-group ${
                index === 0 ? "col-span-2" : "col-span-2 sm:col-span-1"
              }`}
            >
              {/* Subject ID */}
              <div className="mb-4">
                <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                  Subject
                </label>
                <Controller
                  name={`subjects[${index}].subject_id`}
                  control={control}
                  rules={{ required: "Subject is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subject) => (
                        <option key={subject._id} value={subject._id}>
                          {subject.subjectName}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.subjects?.[index]?.subject_id && (
                  <p className="mt-1 text-sm text-red-600 dark:text-green-400">
                    {errors.subjects[index].subject_id.message}
                  </p>
                )}
              </div>

              {/* Exam Date */}
              <div className="mb-4">
                <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                  Exam Date
                </label>
                <Controller
                  name={`subjects[${index}].exam_date`}
                  control={control}
                  rules={{ required: "Exam Date is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                    />
                  )}
                />
                {errors.subjects?.[index]?.exam_date && (
                  <p className="mt-1 text-sm text-red-600 dark:text-green-400">
                    {errors.subjects[index].exam_date.message}
                  </p>
                )}
              </div>

              {/* Start Time */}
              <div className="mb-4">
                <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                  Start Time
                </label>
                <Controller
                  name={`subjects[${index}].start_time`}
                  control={control}
                  rules={{ required: "Start Time is required" }}
                  render={({ field }) => (
                    <input
                      type="time"
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                    />
                  )}
                />
                {errors.subjects?.[index]?.start_time && (
                  <p className="mt-1 text-sm text-red-600 dark:text-green-400">
                    {errors.subjects[index].start_time.message}
                  </p>
                )}
              </div>

              {/* End Time */}
              <div className="mb-4">
                <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                  End Time
                </label>
                <Controller
                  name={`subjects[${index}].end_time`}
                  control={control}
                  rules={{ required: "End Time is required" }}
                  render={({ field }) => (
                    <input
                      type="time"
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                    />
                  )}
                />
                {errors.subjects?.[index]?.end_time && (
                  <p className="mt-1 text-sm text-red-600 dark:text-green-400">
                    {errors.subjects[index].end_time.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Add Subject Button */}
          <div className="col-span-2 mt-6">
            <button
              type="button"
              onClick={() =>
                append({
                  subject_id: "",
                  exam_date: "",
                  start_time: "",
                  end_time: "",
                })
              }
              className="ms-4 rounded-md bg-[#117C90] px-4 py-2 text-white dark:bg-white dark:text-black dark:placeholder-white"
            >
              Add other subjects
            </button>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamSchedule;
