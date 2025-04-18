import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExam } from "../../TeacherRedux/ExamSlice";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ExamForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { classId, gradeSubjectSemesterId } = useParams();
  const { status } = useSelector((state) => state.exam);

  const [examData, setExamData] = useState({
    title: "",
    description: "",
    type: "Online",
    start_time: "",
    end_time: "",
    duration: 0,
    total_marks: 0,
    exam_questions: [
      {
        question_text: "",
        question_type: "MCQ",
        options: [],
        correct_answer: "",
        marks: 0,
      },
    ],
  });

  const calculateTotalQuestionMarks = (questions) => {
    return questions.reduce(
      (sum, question) => sum + (Number(question.marks) || 0),
      0,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const startTime = new Date(examData.start_time);
    const endTime = new Date(examData.end_time);

    if (startTime <= currentTime) {
      toast.error("Start time must be in the future");
      return;
    }

    if (endTime <= currentTime) {
      toast.error("End time must be in the future");
      return;
    }

    if (endTime <= startTime) {
      toast.error("End time must be after start time");
      return;
    }

    if (
      !examData.title ||
      !examData.start_time ||
      !examData.end_time ||
      (examData.type === "Online" && examData.exam_questions.length === 0)
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (examData.type === "Online") {
      const totalQuestionMarks = calculateTotalQuestionMarks(
        examData.exam_questions,
      );
      if (totalQuestionMarks !== examData.total_marks) {
        toast.error(
          "Total marks of questions must equal the exam's total marks",
        );
        return;
      }
    }

    const updatedQuestions = examData.exam_questions.map((q) => {
      if (!q.question_text || !q.marks) {
        toast.error("Please fill in all required fields for each question");
        throw new Error("Invalid question data");
      }

      if (q.question_type === "MCQ" && (!q.options || q.options.length < 2)) {
        toast.error("MCQ questions require at least 2 options");
        throw new Error("Invalid question data");
      }

      return {
        ...q,
        marks: Number(q.marks),
      };
    });

    const formattedStartTime = new Date(examData.start_time).toISOString();
    const formattedEndTime = new Date(examData.end_time).toISOString();
    const token = sessionStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const created_by = decodedToken.id;

    const payload = {
      ...examData,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      exam_questions: examData.type === "Online" ? updatedQuestions : [],
      created_by,
    };

    try {
      await dispatch(
        createExam({ formData: payload, classId, gradeSubjectSemesterId }),
      ).unwrap();

      toast.success("Exam created successfully!");

      setExamData({
        title: "",
        description: "",
        type: "Online",
        start_time: "",
        end_time: "",
        duration: 0,
        total_marks: 0,
        exam_questions: [
          {
            question_text: "",
            question_type: "MCQ",
            options: [],
            correct_answer: "",
            marks: 0,
          },
        ],
      });
    } catch (error) {
      toast.error(
        `Failed to create exam: ${error.message || error.err || error}`,
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "type" && value === "Offline") {
      setExamData({
        ...examData,
        [name]: value,
        exam_questions: [],
      });
    } else {
      setExamData({
        ...examData,
        [name]:
          name === "duration" || name === "total_marks"
            ? parseInt(value, 10)
            : value,
      });
    }
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...examData.exam_questions];

    if (name === "options") {
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [name]: value.split(","),
      };
    } else {
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [name]: value,
      };
    }

    setExamData({ ...examData, exam_questions: updatedQuestions });
  };

  const addNewQuestion = () => {
    const newQuestion = {
      question_text: "",
      question_type: "MCQ",
      options: [],
      correct_answer: "",
      marks: 0,
    };

    setExamData((prevData) => ({
      ...prevData,
      exam_questions: [...prevData.exam_questions, newQuestion],
    }));
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto flex w-[80%] flex-col px-4 md:px-6 lg:px-0">
        <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Upload Exam
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
      </div>

      <div className="mx-auto w-[80%] rounded-xl bg-gray-100 p-6 shadow-md dark:bg-DarkManager2">
        <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
          <div>
            <label className="block font-medium">
              {t("tablesheader.Title")}:
            </label>
            <input
              type="text"
              name="title"
              value={examData.title}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              {t("tablesheader.Description")}:
            </label>
            <textarea
              name="description"
              value={examData.description}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
            />
          </div>
          <div>
            <label className="block font-medium">
              {t("tablesheader.Type")}:
            </label>
            <select
              name="type"
              value={examData.type}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-medium">{t("examst.Start")}:</label>
              <input
                type="datetime-local"
                name="start_time"
                value={examData.start_time}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>
            <div>
              <label className="block font-medium">{t("examst.Start")}:</label>
              <input
                type="datetime-local"
                name="end_time"
                value={examData.end_time}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-medium">
                {t("examst.Duration")} (minutes):
              </label>
              <input
                type="number"
                name="duration"
                value={examData.duration}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>
            <div>
              <label className="block font-medium">
                {t("assignmentt.Marks")}:
              </label>
              <input
                type="number"
                name="total_marks"
                value={examData.total_marks}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                required
              />
            </div>
          </div>

          {examData.type === "Online" && (
            <>
              {examData.exam_questions.map((q, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border border-gray-300 p-4"
                >
                  <h3 className="mb-2 font-bold text-[#244856] dark:text-white">
                    {t("tablesheader.Question")} {index + 1}
                  </h3>
                  <div>
                    <label className="block font-medium">Question Text:</label>
                    <input
                      type="text"
                      name="question_text"
                      value={q.question_text}
                      onChange={(e) => handleQuestionChange(e, index)}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium">
                      {t("examst.Options")} ({t("examst.commaseparated")}):
                    </label>
                    <input
                      type="text"
                      name="options"
                      value={q.options.join(",")}
                      onChange={(e) => handleQuestionChange(e, index)}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                      placeholder="Option 1, Option 2, Option 3, Option 4"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium">
                      {t("tablesheader.CorrectAnswer")}:
                    </label>
                    <select
                      name="correct_answer"
                      value={q.correct_answer}
                      onChange={(e) => handleQuestionChange(e, index)}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                      required
                    >
                      <option value="">Select correct answer</option>
                      {q.options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium">
                      {t("assignmentt.Marks")}:
                    </label>
                    <input
                      type="number"
                      name="marks"
                      value={q.marks}
                      onChange={(e) => handleQuestionChange(e, index)}
                      className="w-full rounded-2xl border border-gray-300 px-4 py-2 font-poppins text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-DarkManager2 dark:text-white dark:placeholder-white"
                      required
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addNewQuestion}
                className="mt-2 rounded-2xl bg-[#117C90] px-4 py-2 text-white dark:bg-white dark:text-black"
              >
                {t("examst.AddQuestion")}
              </button>
            </>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-2xl bg-[#117C90] px-4 py-2 text-white dark:bg-white dark:text-black"
          >
            {status === "loading" ? "Creating Exam..." : t("examst.CreateExam")}
          </button>
        </form>
      </div>
    </>
  );
};

export default ExamForm;
