import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../TeacherRedux/QuestionBankSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const EditQuestion = () => {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const myQuestions = useSelector((state) => state.questionbank.questionbank);
  const questionToEdit = myQuestions.find((q) => q._id === questionId);

  const [formData, setFormData] = useState({
    questionType: questionToEdit?.questionType || "MCQ",
    questionText: questionToEdit?.questionText || "",
    answer: questionToEdit?.answer || "",
    choices: questionToEdit?.choices || ["", "", "", ""],
  });

  useEffect(() => {
    if (questionToEdit) {
      setFormData({
        questionType: questionToEdit.questionType,
        questionText: questionToEdit.questionText,
        answer: questionToEdit.answer,
        choices: questionToEdit.choices || ["", "", "", ""],
      });
    }
  }, [questionToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      questionType: formData.questionType,
      questionText: formData.questionText,
      answer: formData.answer,
      ...(formData.questionType === "MCQ" && { choices: formData.choices }),
    };

    dispatch(updateQuestion({ questionId, formData: dataToSend }))
      .unwrap()
      .then(() => {
        toast.success("Question updated successfully!");
        navigate(-1);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update question");
      });
  };

  return (
    <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
      <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
        {t("tablesheader.EditQuestion")}
      </h1>
      <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>

      <div className="mx-auto w-[100%] rounded-xl bg-gray-100 p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
          <div>
            <label className="block font-medium">
              {t("tablesheader.questionType")}:
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
                required
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
            {t("tablesheader.Update")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
