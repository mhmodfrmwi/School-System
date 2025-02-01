import { useNavigate } from "react-router-dom";
import ActivityToggle from "./SelectPage"; 

const Activities = () => {
    const navigate = useNavigate();

    return (
        <>
         <ActivityToggle />
            <div className="col-span-2 flex flex-col justify-between ms-5">
                {/* العنوان */}
                <div className="text-2xl font-poppins cursor-text font-bold text-[#105E6A] ms-7 mt-5">
                  School Hubs & Activities
                </div>
                {/* الخط */}
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>

                {/* المعلومات عن المسابقات */}
                <div className="flex flex-col md:flex-row items-center justify-between mt-5 gap-4">
                    {/* الأعمدة الخاصة بالمعلومات */}
                    <div className="flex flex-col sm:flex-row w-full md:w-2/3 gap-4">
                        {/* المسابقة 1 */}
                        <div className="flex flex-col w-full border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                            <h3 className="font-bold font-poppins text-xl text-[#105E6A]">مسابقة شهر رمضان</h3>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Registration Start:</p>
                                <p className="text-sm font-semibold font-poppins">19 October, 2024 2:20 PM</p>
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Ends:</p>
                                <p className="text-sm font-semibold font-poppins">20 October, 2024 4:20 PM</p>
                            </div>
                            {/* الأزرار */}
                            <div className="flex flex-col items-center gap-4 mt-4">
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-[#105E6A] px-5 py-2 text-lg font-medium text-white"
                                    onClick={() => navigate("/teacher/school-hubs/detailes")}
                                >
                                    Details
                                </button>
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl text-[#117C90] border border-[#117C90] px-5 py-2 text-lg font-medium"
                                    onClick={() => navigate("/teacher/school-hubs/prizes")}
                                >
                                    Prizes
                                </button>
                            </div>
                        </div>

                        {/* المسابقة 2 */}
                        <div className="flex flex-col w-full border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                            <h3 className="font-bold text-xl font-poppins text-[#105E6A]">مسابقة القرآن الكريم</h3>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Registration Start:</p>
                                <p className="text-sm font-semibold font-poppins">25 October, 2024 5:20 PM</p>
                            </div>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-poppins">Contest Ends:</p>
                                <p className="text-sm font-semibold font-poppins">1 November, 2024 5:20 PM</p>
                            </div>
                            {/* الأزرار */}
                            <div className="flex flex-col items-center gap-4 mt-4">
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-[#105E6A] px-5 py-2 text-lg font-medium text-white"
                                    onClick={() => navigate("/teacher/school-hubs/detailes")}
                                >
                                    Details
                                </button>
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl text-[#117C90] border border-[#117C90] px-5 py-2 text-lg font-medium"
                                    onClick={() => navigate("/teacher/school-hubs/prizes")}
                                >
                                    Prizes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activities;
