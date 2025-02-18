import React from "react";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerVRForm = () => {
   

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col w-[80%] mx-auto px-4 md:px-6 lg:px-0">
                <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                    Upload VR
                </h1>
                <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[130px]"></div>
            </div>
            <div className="mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">
                <form className="space-y-4">
                    <div>
                        <label className="block font-poppins font-medium">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-poppins font-medium">Start Time </label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-poppins font-medium">Duration </label>
                        <input
                            type="number"
                            name="duration"
                            className="w-full font-poppins text-gray-600 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-poppins font-medium">Link </label>
                        <input
                            type="text"
                            name="link"
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

export default ManagerVRForm;
