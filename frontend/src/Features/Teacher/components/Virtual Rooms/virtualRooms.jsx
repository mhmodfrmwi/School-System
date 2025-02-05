import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherVirtualRooms, deleteTeacherVirtualRoom } from "../TeacherRedux/VirtualRoomsSlice";
import { useNavigate } from "react-router-dom";

// دالة لتنسيق التاريخ والوقت
const formatStartTime = (startTime) => {
    const date = new Date(startTime);
    const formattedDate = date.toISOString().split('T')[0]; // التاريخ
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // الوقت
    return `${formattedDate} (${formattedTime})`;
};

const VirtualRooms = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // جلب بيانات الجلسات الافتراضية من Redux
    const { teacherVirtualRooms, loading, error } = useSelector((state) => state.teacherVirtualRooms);

    useEffect(() => {
        dispatch(fetchTeacherVirtualRooms());
    }, [dispatch]);

    const handleEdit = (virtualId) => {
        navigate(`/teacher/editvirtualroom/${virtualId}`);
    };

    const handleDelete = (virtualId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contest?");
        if (confirmDelete) {
            dispatch(deleteTeacherVirtualRoom(virtualId));
        }
    };

    const handleAddActivity = () => {
        navigate("/teacher/addvirtualroom");
    };

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5">
                <div className="text-xl sm:text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold ms-7 mt-5">
                    Virtual Rooms
                </div>
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>
            </div>

            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        <div className="mx-auto w-full max-w-7xl px-4">
                            <div className="flex justify-end items-center my-6">
                                <button onClick={handleAddActivity} className="bg-gradient-to-r from-[#105E6A] to-[#117C90] rounded-2xl px-3 sm:px-4 py-1 sm:py-2 text-xs text-white sm:text-sm md:text-base">
                                    Add New Virtual Classrooms
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg">
                                    <thead>
                                        <tr className="bg-[#105E6A] text-white text-xs sm:text-sm md:text-base">
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Title</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Starting Time</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Duration</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Vendor</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Link</th>
                                            <th className="border border-[#117C90] px-2 sm:px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">Loading...</td>
                                            </tr>
                                        ) : error ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-red-500">{error}</td>
                                            </tr>
                                        ) : teacherVirtualRooms.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">No virtual rooms available.</td>
                                            </tr>
                                        ) : (
                                            teacherVirtualRooms.map((room) => (
                                                <tr key={room._id} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base">
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{room.title}</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{formatStartTime(room.startTime)}</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{room.duration} min</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">{room.vendor}</td>
                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2">
                                                        <a href={room.link} target="_blank" rel="noopener noreferrer" className="text-[#117C90] hover:text-[#244856]">
                                                            Join
                                                        </a>
                                                    </td>

                                                    <td className="border border-[#117C90] px-2 sm:px-4 py-2 flex justify-center space-x-2">
                                                        <button
                                                            aria-label="Edit virtual"
                                                            onClick={() => handleEdit(room._id)}
                                                            className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                                        >
                                                            <i className="far fa-edit text-lg" />
                                                        </button>
                                                        <button
                                                            aria-label="Delete virtual"
                                                            onClick={() => handleDelete(room._id)}
                                                            className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                                        >
                                                            <i className="far fa-trash-alt text-lg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VirtualRooms;
