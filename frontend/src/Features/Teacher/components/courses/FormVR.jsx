import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTeacherVirtualRoom } from "../TeacherRedux/VRSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VRForm = () => {
    const dispatch = useDispatch();
    const { classId, gradeSubjectSemesterId } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        startTime: "",
        duration: "",
        link: "",
        class_id: classId,
        grade_subject_semester_id: gradeSubjectSemesterId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        console.log("Form Data:", formData);


        dispatch(createTeacherVirtualRoom(formData))
            .unwrap()
            .then(() => {
                setFormData({
                    title: "",
                    startTime: "",
                    duration: "",
                    link: "",
                    class_id: classId,
                    grade_subject_semester_id: gradeSubjectSemesterId,
                });
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
                    Upload VR
                </h1>
                <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[190px]"></div>
            </div>
            <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-poppins font-medium">
                            Title <span className="text-red-500">*</span>
                        </label>
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
                        <label className="block font-poppins font-medium">Start Time </label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-poppins font-medium">Duration </label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-poppins font-medium">Link </label>
                        <input
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                            required
                        />
                    </div>
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

export default VRForm;
