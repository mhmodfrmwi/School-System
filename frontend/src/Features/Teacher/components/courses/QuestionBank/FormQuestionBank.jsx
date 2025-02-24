import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postQuestionBank } from "../../TeacherRedux/QuestionBankSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionForm = () => {
  const dispatch = useDispatch();
  const { gradeSubjectSemesterId } = useParams();

  const [formData, setFormData] = useState({
    grade_subject_semester_id: gradeSubjectSemesterId,
    questionType: "MCQ",
    questionText: "",
    answer: "", // الإجابة الصحيحة
    choices: ["", "", "", ""], // اختيارات MCQ الافتراضية
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // عند اختيار MCQ، تأكد أن الإجابة الصحيحة هي واحدة من الاختيارات
    if (name === "questionType") {
      setFormData((prevState) => ({
        ...prevState,
        answer: value === "MCQ" ? prevState.choices[0] : "", // أول اختيار كإجابة افتراضية
      }));
    }
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...formData.choices];
    updatedChoices[index] = value;

    setFormData((prevState) => ({
      ...prevState,
      choices: updatedChoices,
      answer: prevState.questionType === "MCQ" && prevState.answer === prevState.choices[index]
        ? value // إذا تم تغيير الاختيار الصحيح، يتم تحديث الإجابة الصحيحة أيضًا
        : prevState.answer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Form Data before validation:", formData); // Debugging Step
  
    if (!formData.questionText.trim()) {
      toast.error("Question text is required!");
      return;
    }
  
    if (formData.questionType === "MCQ" && formData.choices.some(choice => !choice.trim())) {
      toast.error("All MCQ choices must be filled!");
      return;
    }
  
    if (!formData.answer || formData.answer.trim() === "") {
      toast.error("Answer field is required!");
      return;
    }
  
    // إنشاء نسخة جديدة من البيانات مع حذف choices لو لم يكن السؤال MCQ
    const dataToSend = {
      grade_subject_semester_id: formData.grade_subject_semester_id,
      questionType: formData.questionType,
      questionText: formData.questionText,
      answer: formData.answer,
      ...(formData.questionType === "MCQ" && { choices: formData.choices }) // إضافة choices فقط عند الحاجة
    };
  
    console.log("Data sent to backend:", dataToSend);
  
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
      <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Upload Question
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
      </div>

      <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
          
          <div>
            <label className="block font-medium">Question Type:</label>
            <select name="questionType" value={formData.questionType} onChange={handleChange} className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]">
              <option value="MCQ">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Short Answer">Short Answer</option>
              <option value="Essay">Essay</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Question Text:</label>
            <input
              type="text"
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          {formData.questionType === "MCQ" && (
            <div>
              <label className="block font-medium">Choices:</label>
              {formData.choices.map((choice, index) => (
                <input
                  key={index}
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  className="w-full mb-3 font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  placeholder={`Choice ${index + 1}`}
                  required
                />
              ))}

              <label className="block font-medium mt-4">Correct Answer:</label>
              <select
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="">Select Correct Answer</option>
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
              <label className="block font-medium">Answer:</label>
              <select name="answer" value={formData.answer} onChange={handleChange} 
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]">
                <option value="">Select</option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>
          )}

          {(formData.questionType === "Short Answer" || formData.questionType === "Essay") && (
            <div>
              <label className="block font-medium">Answer:</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                rows={formData.questionType === "Essay" ? 5 : 2}
                required
              ></textarea>
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-[#117C90] text-white font-poppins rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default QuestionForm;
