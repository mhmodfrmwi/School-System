import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherVirtualRooms } from "../../../Teacher/components/TeacherRedux/VirtualRoomsSlice";
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

    return (
        <>
            <section>
                {/* Quick Menu */}
                <div className="flex items-center ml-4 mt-6 md:ml-16 md:mt-10 py-4">
                    <p className="mr-2 w-2 h-8 border-l-8 border-[#BC6FFB] rounded-lg"></p>
                    <button className="text-xl md:text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
                        Quick Menu
                    </button>
                </div>

                {/* Input Fields */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6 px-4">
                    <div className="grid grid-cols-1 ml-8 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-6">
                        <input
                            type="text"
                            name="fullName"
                            className="p-2 h-10 w-full sm:w-40 md:w-48 font-poppins text-sm bg-white rounded-md"
                            style={{
                                border: "2px solid transparent",
                                borderRadius: "20px",
                                backgroundImage:
                                    "linear-gradient(white, white), linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB)",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                            }}
                            placeholder="Title"
                            required
                        />
                        <input
                            type="text"
                            name="fullName"
                            className="p-2 h-10 w-full sm:w-40 md:w-48 font-poppins text-sm bg-white rounded-md"
                            style={{
                                border: "2px solid transparent",
                                borderRadius: "20px",
                                backgroundImage:
                                    "linear-gradient(white, white), linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB)",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                            }}
                            placeholder="Course"
                            required
                        />
                        <input
                            type="text"
                            name="fullName"
                            className="p-2 h-10 w-full sm:w-40 md:w-48 font-poppins text-sm bg-white rounded-md"
                            style={{
                                border: "2px solid transparent",
                                borderRadius: "20px",
                                backgroundImage:
                                    "linear-gradient(white, white), linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB)",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                            }}
                            placeholder="Starting Time"
                            required
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mr-9 justify-center sm:justify-end mt-6">
                        <button className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-2xl px-4 py-2 text-xs sm:text-sm text-white">
                            Search
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="mx-auto my-10 w-full max-w-7xl px-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse rounded-2xl border-2 border-pink-300 shadow-lg">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                                    <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Title</th>
                                    <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Course</th>
                                    <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Starting Time</th>
                                    <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Duration</th>
                                    <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Link</th>
                                    <th className="border border-[#FFA4A4] px-4 py-2 text-left text-xs sm:text-base md:text-lg">Action</th>
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
                                        <tr key={room._id} className="hover:bg-gray-100">
                                            <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{room.title}</td>
                                            <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{room.subjectName}</td>
                                            <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{formatStartTime(room.startTime)}</td>
                                            <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">{room.duration} min</td>
                                            <td className="border border-[#FFA4A4] px-4 py-2 text-xs sm:text-sm md:text-sm">
                                                <a href={room.link} target="_blank" rel="noopener noreferrer" className="text-[#BC6FFB] hover:text-[#244856]">
                                                    Join
                                                </a>
                                            </td>
                                            <td className="border flex items-center justify-center border-[#FFA4A4] px-4 py-2">
                                                <button className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-2xl px-4 py-2 text-xs text-white sm:text-sm">
                                                    Enter
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VirtualRooms;
