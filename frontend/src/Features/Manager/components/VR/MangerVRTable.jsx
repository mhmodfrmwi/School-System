import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ManagerVRTable = () => {
    const navigate = useNavigate();
    const GoToForm = (id) => {
        navigate(`/manager/virtual-room-form`);
    };

    return (
        <div className="flex flex-col p-4">
            <div className="flex-1">
                <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-full xl:w-full">
                    <div className="flex ml-8 flex-col">

                        <div className="w-[95%] mb-4 flex flex-col mt-4 space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
                            <div>  <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                                Virtual Room
                            </h1>
                                <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[160px]"></div>
                            </div>
                            <button className="rounded-md bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
                                onClick={() => GoToForm()} >Add Virtual Room</button>
                        </div>
                    </div>
                    <div className="relative w-full px-4 sm:px-6 lg:px-8">
                        <div className="mt-7">

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse  border-2 border-[#117C90] rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
                                    <thead className="bg-[#117C90] text-white">
                                        <tr >
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                                                Title
                                            </th>
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                                                Date
                                            </th>
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                                                Duration
                                            </th>
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                                                Link
                                            </th>
                                            <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr className={` hover:bg-[#117C90]/70 bg-[#F5FAFF]`}>
                                            <td className="px-3 py-2 font-poppins text-xs  sm:text-sm md:text-base">meeting</td>
                                            <td className="px-3 py-2 font-poppins text-xs  sm:text-sm md:text-base">20/5/2024 (9:00 am)</td>
                                            <td className="px-3 py-2 font-poppins text-xs  sm:text-sm md:text-base">3 Hours</td>
                                            <td className="px-3 py-2 font-poppins text-xs  sm:text-sm md:text-base"> open link </td>

                                            <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                                                <button className="text-[#117C90] hover:text-[#244856]">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button className="text-[#E74833] hover:text-[#244856]">
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerVRTable;
