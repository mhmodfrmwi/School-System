import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchVirtualRooms } from "../ManagerRedux/VRMangerSlice";
import { deleteVR } from "../ManagerRedux/VRMangerSlice"; 
import { toast } from "react-toastify";

const ManagerVRTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { virtualRooms, status, error } = useSelector((state) => state.virtualRooms);

    const formatStartTime = (startTime) => {
        if (!startTime) {
            return "N/A";
        }

        try {
            const date = new Date(startTime);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }

            const formattedDate = date.toISOString().split('T')[0]; // Extract date
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time
            return `${formattedDate} (${formattedTime})`;
        } catch (error) {
            console.error("Error formatting startTime:", error);
            return "Invalid Date";
        }
    };

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchVirtualRooms());
        }
    }, [status, dispatch]);

    useEffect(() => {
        console.log("Virtual Rooms:", virtualRooms);
    }, [virtualRooms]);

    const GoToForm = (id) => {
        navigate(`/manager/virtual-room-form`);
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this virtual room?")) {
            dispatch(deleteVR(id));
        }
        toast.success("virtual room deleted successfully");
    };
    const handleEdit = (id) => {
        navigate(`/manager/edit-virtual-room/${id}`);
    };

    return (
        <div className="flex flex-col p-4">
            <div className="flex-1">
                <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-full xl:w-full">
                    <div className="flex ml-8 flex-col">
                        <div className="w-[95%] mb-4 flex flex-col mt-4 space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
                            <div>
                                <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                                    Virtual Room
                                </h1>
                                <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[160px]"></div>
                            </div>
                            <button
                                className="rounded-md bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
                                onClick={() => GoToForm()}
                            >
                                Add Virtual Room
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full px-4 sm:px-6 lg:px-8">
                        <div className="mt-7">
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse  border-2 border-[#117C90] rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
                                    <thead className="bg-[#117C90] text-white">
                                        <tr>
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
                                        {virtualRooms && virtualRooms.length > 0 ? (
                                            virtualRooms.map((room) => (
                                                <tr key={room._id} className={`hover:bg-[#117C90]/70 bg-[#F5FAFF]`}>
                                                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">{room.title}</td>
                                                    <td className="px-3 py-2">{formatStartTime(room.startTime)}</td>
                                                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                                                        {room.duration} Minutes
                                                    </td>
                                                    <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                                                        <a href={room.link} target="_blank" rel="noopener noreferrer">
                                                            Open Link
                                                        </a>
                                                    </td>
                                                    <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                                                        <button onClick={() => handleEdit(room._id)} className="text-[#117C90] hover:text-[#244856]">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button className="text-[#E74833] hover:text-[#244856]" onClick={() => handleDelete(room._id)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    No virtual rooms found.
                                                </td>
                                            </tr>
                                        )}
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