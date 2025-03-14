import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubmissionGrade } from '../../TeacherRedux/AssignmentSlice';
import { toast } from 'react-toastify'; // استيراد مكتبة التوست

const EditGradeModal = ({ isOpen, onClose, submissionId, currentGrade, totalMarks }) => {
    const [grade, setGrade] = useState(currentGrade || '');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (grade && !isNaN(grade)) {
            if (parseFloat(grade) > totalMarks) {
                toast.error('Grade cannot exceed the total marks of the assignment');
                return;
            }
            dispatch(updateSubmissionGrade({ submissionId, grade }))
                .unwrap()
                .then(() => {
                    onClose(); 
                })
                .catch((error) => {
                    toast.error(error.message || 'Failed to update grade'); 
                });
        } else {
            toast.error('Please enter a valid grade.'); 
        }
    };

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold text-[#244856] mb-4">Edit Grade</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Grade</label>
                        <input
                            type="number"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#117C90] text-white rounded-md hover:bg-[#0f6b7c] transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGradeModal;