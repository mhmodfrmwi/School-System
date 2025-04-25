import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Loader from "../../../../ui/Loader";

import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects } from "../../../Admin/components/AdminRedux/subjectSlice";
import { useTranslation } from "react-i18next";
import { useEditExamSchedule, useExamSchedule } from "../hooks/schedule";

const UpdateExamSchedule = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { subjects = [] } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const {
    managerExamSchedule,
    isLoading: isFetching,
    isError,
    error,
  } = useExamSchedule(id);

  const { mutate: editExamSchedule, isLoading: isEditing } =
    useEditExamSchedule();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subjects: [
        { subject_id: "", exam_date: "", start_time: "", end_time: "" },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "subjects",
  });

  useEffect(() => {
    if (managerExamSchedule) {
      reset({
        subjects: managerExamSchedule.subjects?.map((subject) => ({
          subject_id: subject.subject_id?._id, // Use the subject ID
          exam_date: subject.exam_date?.split("T")[0], // Format date for input
          start_time: subject.start_time,
          end_time: subject.end_time,
        })),
      });
    }
  }, [managerExamSchedule, reset]);

  const onSubmit = (formData) => {
    editExamSchedule({ id, formData });
  };

  if (isFetching || isEditing) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative mx-auto my-10 w-[90%] font-poppins md:w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        {t("schedulem.Edit")}{" "}
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-DarkManager2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
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
                  {t("schedulem.Subject")}
                </label>
                <Controller
                  name={`subjects[${index}].subject_id`}
                  control={control}
                  rules={{ required: "Subject is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:placeholder-white"
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
                  {t("schedulem.ExamDate")}
                </label>
                <Controller
                  name={`subjects[${index}].exam_date`}
                  control={control}
                  rules={{ required: "Exam Date is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:placeholder-white"
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
                  {t("schedulem.StartTime")}
                </label>
                <Controller
                  name={`subjects[${index}].start_time`}
                  control={control}
                  rules={{ required: "Start Time is required" }}
                  render={({ field }) => (
                    <input
                      type="time"
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:placeholder-white"
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
                  {t("schedulem.EndTime")}
                </label>
                <Controller
                  name={`subjects[${index}].end_time`}
                  control={control}
                  rules={{ required: "End Time is required" }}
                  render={({ field }) => (
                    <input
                      type="time"
                      {...field}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:placeholder-white"
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
              {t("schedulem.Addothersubjects")}
            </button>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              {t("tablesheader.Update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExamSchedule;
