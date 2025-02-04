import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity.png";

const Activities = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5">
                <div className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-1 font-bold text-transparent ms-7 mt-5">
                    Activities
                </div>
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#BC6FFB] ms-7"></p>
                <div className="mb-6 mt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                        className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white focus:outline-none"
                        onClick={() => navigate("/student/activities")}
                    >
                        School Hubs
                    </button>

                    <button
                        className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent"
                        onClick={() => navigate("/student/activities/contests")}
                    >
                        Trips
                    </button>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mt-5 gap-4">
                    <div className="flex flex-col sm:flex-row w-full md:w-2/3 gap-4">
                        <div className="flex flex-col w-full border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                            <h3 className="font-bold font-poppins text-xl text-[#CF72C0] ">مسابقة شهر رمضان</h3>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Registration Start:</p>
                                <p className="text-sm font-semibold font-poppins">19 October, 2024 2:20 PM</p>
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Ends:</p>
                                <p className="text-sm font-semibold font-poppins">20 October, 2024 4:20 PM</p>
                            </div>
                            {/* الأزرار تحت النص وفي المنتصف */}
                            <div className="flex flex-col items-center gap-4 mt-4">
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white"
                                    onClick={() => navigate("/student/activities/detailes")}
                                >
                                    Details
                                </button>
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent"
                                    onClick={() => navigate("/student/activities/prizes")}
                                >
                                    Prizes
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col w-full border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                            <h3 className="font-bold text-xl font-poppins text-[#CF72C0]">مسابقة القرأن الكريم</h3>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Registration Start:</p>
                                <p className="text-sm font-semibold font-poppins">25 October, 2024 5:20 PM</p>
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Ends:</p>
                                <p className="text-sm font-semibold font-poppins">1 November, 2024 5:20 PM</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 mt-4">
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white"
                                    onClick={() => navigate("/student/activities/detailes")}
                                >
                                    Details
                                </button>
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent"
                                    onClick={() => navigate("/student/activities/prizes")}
                                >
                                    Prizes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* الصورة */}
                    <div className="w-full sm:w-1/3 mt-5 md:mt-0 flex justify-center">
                        <img
                            src={activityImage}
                            alt="Activities"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activities;
