import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postQuestionBank } from "../../TeacherRedux/QuestionBankSlice";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

const QuestionForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { gradeSubjectSemesterId } = useParams();

  const [formData, setFormData] = useState({
    grade_subject_semester_id: gradeSubjectSemesterId,
    questionType: "MCQ",
    questionText: "",
    answer: "",
    choices: ["", "", "", ""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "questionType") {
      setFormData((prevState) => ({
        ...prevState,
        answer: value === "MCQ" ? prevState.choices[0] : "",
      }));
    }
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...formData.choices];
    updatedChoices[index] = value;

    setFormData((prevState) => ({
      ...prevState,
      choices: updatedChoices,
      answer:
        prevState.questionType === "MCQ" &&
        prevState.answer === prevState.choices[index]
          ? value
          : prevState.answer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.questionText.trim()) {
      toast.error("Question text is required!");
      return;
    }

    if (
      formData.questionType === "MCQ" &&
      formData.choices.some((choice) => !choice.trim())
    ) {
      toast.error("All MCQ choices must be filled!");
      return;
    }

    if (!formData.answer || formData.answer.trim() === "") {
      toast.error("Answer field is required!");
      return;
    }

    const dataToSend = {
      grade_subject_semester_id: formData.grade_subject_semester_id,
      questionType: formData.questionType,
      questionText: formData.questionText,
      answer: formData.answer,
      ...(formData.questionType === "MCQ" && { choices: formData.choices }),
    };

    dispatch(postQuestionBank(dataToSend))
      .unwrap()
      .then(() => {
        setFormData({
          grade_subject_semester_id: gradeSubjectSemesterId,
          questionType: "MCQ",
          questionText: "",
          answer: "",
          choices: ["", "", "", ""],
        });
        toast.success("Question uploaded successfully!");
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          {t("tablesheader.UploadQuestion")}
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
      </div>

      <div className="mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
          <div>
            <label className="block font-medium">
              {t("tablesheader.questionType")} :
            </label>
            <select
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
            >
              <option value="MCQ">{t("tablesheader.MultipleChoice")}</option>
              <option value="True/False">{t("tablesheader.TrueFalse")}</option>
              <option value="Short Answer">
                {t("tablesheader.ShortAnswer")}
              </option>
              <option value="Essay">{t("tablesheader.Essay")}</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">
              {t("tablesheader.Question")}:
            </label>
            <input
              type="text"
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>

          {formData.questionType === "MCQ" && (
            <div>
              <label className="block font-medium">
                {t("tablesheader.Choices")}:
              </label>
              {formData.choices.map((choice, index) => (
                <input
                  key={index}
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  className="mb-3 w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                  placeholder={`Choice ${index + 1}`}
                  required
                />
              ))}

              <label className="mt-4 block font-medium">
                {t("tablesheader.CorrectAnswer")}:
              </label>
              <select
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              >
                <option value="">{t("tablesheader.SelectAnswer")}</option>
                {formData.choices.map((choice, index) => (
                  <option key={index} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.questionType === "True/False" && (
            <div>
              <label className="block font-medium">
                {t("tablesheader.Answer")}:
              </label>
              <select
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              >
                <option value="">Select</option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>
          )}

          {(formData.questionType === "Short Answer" ||
            formData.questionType === "Essay") && (
            <div>
              <label className="block font-medium">
                {t("tablesheader.Answer")}:
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                rows={formData.questionType === "Essay" ? 5 : 2}
                required
              ></textarea>
            </div>
          )}

          <button
            type="submit"
            className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-poppins font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            {t("tablesheader.Upload")}
          </button>
        </form>
      </div>
    </>
  );
};

export default QuestionForm;
