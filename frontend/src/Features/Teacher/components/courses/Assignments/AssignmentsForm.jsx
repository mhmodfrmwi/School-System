import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAssignment } from '../../TeacherRedux/AssignmentSlice'; 
import { useParams } from 'react-router-dom';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignmentForm = () => {
    const dispatch = useDispatch();
    const { classId, gradeSubjectSemesterId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        total_marks: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('Authentication required. Please log in.');
            return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const created_by = decodedToken.id;
        const payload = {
            ...formData,
            created_by,
        };

        dispatch(createAssignment({ gradeSubjectSemesterId, classId, ...payload }));
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
                <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                    Upload Assignment
                </h1>
                <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[240px]"></div>
            </div>

            <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Due Date</label>
                    <input
                        type="datetime-local"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Total Marks</label>
                    <input
                        type="number"
                        name="total_marks"
                        value={formData.total_marks}
                        onChange={handleChange}
                        className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-[#117C90] text-white font-poppins rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
                    >
                    Create Assignment
                </button>
            </form>
            </div>
        </>
    );
};

export default AssignmentForm;