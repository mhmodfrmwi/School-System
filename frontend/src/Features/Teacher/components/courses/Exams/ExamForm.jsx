import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExam } from '../../TeacherRedux/ExamSlice';
import { useParams } from 'react-router-dom';

const ExamForm = () => {
  const dispatch = useDispatch();
  const { classId, gradeSubjectSemesterId } = useParams();
  const { status, error } = useSelector((state) => state.exam);

  const [examData, setExamData] = useState({
    title: '',
    description: '',
    type: 'Online',
    start_time: '',
    end_time: '',
    duration: 0,
    total_marks: 0,
    questions: [],
  });

  const [question, setQuestion] = useState({
    question_text: '',
    question_type: 'MCQ',
    options: [],
    correct_answer: '',
    marks: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedQuestions = [...examData.questions];
    if (
      question.question_text.trim() !== '' &&
      (question.question_type === 'Essay' ||
        (question.options.length > 0 && question.correct_answer.trim() !== ''))
    ) {
      updatedQuestions.push(question);
    }

    const payload = {
      ...examData,
      questions: updatedQuestions,
    };

    dispatch(createExam({ formData: payload, classId, gradeSubjectSemesterId }))
      .unwrap()
      .then(() => {

        setExamData({
          title: '',
          description: '',
          type: 'Online',
          start_time: '',
          end_time: '',
          duration: 0,
          total_marks: 0,
          questions: [],
        });

        setQuestion({
          question_text: '',
          question_type: 'MCQ',
          options: [],
          correct_answer: '',
          marks: 0,
        });
      })
      .catch((error) => {
        alert(`Failed to create exam: ${error.message}`);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({
      ...examData,
      [name]: name === "duration" || name === "total_marks" ? parseInt(value, 10) : value,
    });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name === "question_type") {
      setQuestion({
        ...question,
        question_type: value,
        options: value === "True/False" ? ["True", "False"] : [],
        correct_answer: '',
      });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  const handleAddQuestion = () => {
    if (question.question_type === "MCQ" && question.options.length !== 4) {
      alert("MCQ questions must have exactly 4 options.");
      return;
    }

    if (question.question_type !== "Essay" && !question.options.includes(question.correct_answer)) {
      alert("Correct answer must be one of the provided options.");
      return;
    }

    setExamData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, question],
    }));

    setQuestion({
      question_text: '',
      question_type: 'MCQ',
      options: [],
      correct_answer: '',
      marks: 0,
    });
  };

  return (
    <>
      <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
        <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
          Upload Exam
        </h1>
        <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[200px]"></div>
      </div>

      <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
          {/* Exam details fields */}
          <div>
            <label className="block font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={examData.title}
              onChange={handleInputChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              name="description"
              value={examData.description}
              onChange={handleInputChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>
          <div>
            <label className="block font-medium">Type:</label>
            <select
              name="type"
              value={examData.type}
              onChange={handleInputChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-medium">Start Time:</label>
              <input
                type="datetime-local"
                name="start_time"
                value={examData.start_time}
                onChange={handleInputChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <div>
              <label className="block font-medium">End Time:</label>
              <input
                type="datetime-local"
                name="end_time"
                value={examData.end_time}
                onChange={handleInputChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-medium">Duration (minutes):</label>
              <input
                type="number"
                name="duration"
                value={examData.duration}
                onChange={handleInputChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Total Marks:</label>
              <input
                type="number"
                name="total_marks"
                value={examData.total_marks}
                onChange={handleInputChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
          </div>

          {/* Question fields */}
          <div>
            <h3>Add Questions</h3>
            <div>
              <label className="block font-medium">Question Text:</label>
              <input
                type="text"
                name="question_text"
                value={question.question_text}
                onChange={handleQuestionChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Question Type:</label>
              <select
                name="question_type"
                value={question.question_type}
                onChange={handleQuestionChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="MCQ">MCQ</option>
                <option value="True/False">True/False</option>
                <option value="Essay">Essay</option>
              </select>
            </div>
            {question.question_type === 'MCQ' && (
              <div>
                <label className="block font-medium">Options (comma-separated):</label>
                <input
                  type="text"
                  name="options"
                  value={question.options.join(',')}
                  onChange={(e) =>
                    setQuestion({ ...question, options: e.target.value.split(',') })
                  }
                  className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  placeholder="Option 1, Option 2, Option 3, Option 4"
                  required
                />
              </div>
            )}
            {question.question_type === 'True/False' && (
              <div>
                <label className="block font-medium">Options:</label>
                <input
                  type="text"
                  name="options"
                  value={question.options.join(', ')} // Join options with a comma
                  readOnly // Make the input read-only
                  className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl bg-gray-100"
                />
              </div>
            )}
            {question.question_type !== 'Essay' && (
              <div>
                <label className="block font-medium">Correct Answer:</label>
                <select
                  name="correct_answer"
                  value={question.correct_answer}
                  onChange={handleQuestionChange}
                  className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  required
                >
                  <option value="">Select correct answer</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block font-medium">Marks:</label>
              <input
                type="number"
                name="marks"
                value={question.marks}
                onChange={handleQuestionChange}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-2 px-4 py-2 bg-[#117C90] text-white rounded-2xl"
            >
              Add Question
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-4 py-2 bg-[#117C90] text-white rounded-2xl"
          >
            {status === 'loading' ? 'Creating Exam...' : 'Create Exam'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default ExamForm;