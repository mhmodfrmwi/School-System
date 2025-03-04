import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExamsForTeacher, updateExam } from '../../TeacherRedux/ExamSlice';

const EditExam = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, status, error } = useSelector((state) => state.exam);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Online',
    start_time: '',
    end_time: '',
    duration: 0,
    total_marks: 0,
    exam_questions: [], 
  });

  useEffect(() => {
    dispatch(fetchExamsForTeacher());
  }, [dispatch]);

  useEffect(() => {
    if (exams && exams.length > 0) {
      const examToEdit = exams.find((exam) => exam._id === examId);
      if (examToEdit) {
        const formattedExam = {
          ...examToEdit,
          exam_questions: examToEdit.exam_questions || [], 
          start_time: examToEdit.start_time
            ? new Date(examToEdit.start_time).toISOString().slice(0, 16)
            : '',
          end_time: examToEdit.end_time
            ? new Date(examToEdit.end_time).toISOString().slice(0, 16)
            : '',
        };

        setFormData(formattedExam); 
      }
    }
  }, [exams, examId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.exam_questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setFormData({ ...formData, exam_questions: updatedQuestions });
  
    console.log("Updated Questions:", updatedQuestions); // للتحقق من البيانات
  };
  

  const addNewQuestion = () => {
    setFormData({
      ...formData,
      exam_questions: [
        ...formData.exam_questions,
        { question_text: '', options: [], correct_answer: '', marks: 0 },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting exam data:', formData); // Log formData
    dispatch(updateExam({ examId, examData: formData }))
        .unwrap()
        .then(() => {
            navigate(-1);
        })
        .catch((error) => {
            console.error('Failed to update exam:', error);
        });
};

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
        {/* Exam details fields */}
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
          />
        </div>
        <div>
          <label className="block font-medium">Type:</label>
          <select
            name="type"
            value={formData.type}
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
              value={formData.start_time}
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
              value={formData.end_time}
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
              value={formData.duration}
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
              value={formData.total_marks}
              onChange={handleInputChange}
              className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>
        </div>

        {/* Added Questions */}
        {formData.exam_questions?.map((q, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4">
            <h3 className="font-medium mb-2">Question {index + 1}</h3>
            <div>
              <label className="block font-medium">Question Text:</label>
              <input
                type="text"
                name="question_text"
                value={q.question_text}
                onChange={(e) => handleQuestionChange(e, index)}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Options (comma-separated):</label>
              <input
                type="text"
                name="options"
                value={q.options?.join(',') || ''} // Ensure options is an array
                onChange={(e) => handleQuestionChange(e, index)}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Option 1, Option 2, Option 3, Option 4"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Correct Answer:</label>
              <select
                name="correct_answer"
                value={q.correct_answer}
                onChange={(e) => handleQuestionChange(e, index)}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              >
                <option value="">Select correct answer</option>
                {q.options?.map((option, i) => ( // Ensure options is an array
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Marks:</label>
              <input
                type="number"
                name="marks"
                value={q.marks}
                onChange={(e) => handleQuestionChange(e, index)}
                className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                required
              />
            </div>
          </div>
        ))}

        {/* Add New Question Button */}
        <button
          type="button"
          onClick={addNewQuestion}
          className="mt-2 px-4 py-2 bg-[#117C90] text-white rounded-2xl"
        >
          Add Question
        </button>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-4 py-2 bg-[#117C90] text-white rounded-2xl"
        >
          {status === 'loading' ? 'Updating Exam...' : 'Update Exam'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default EditExam;