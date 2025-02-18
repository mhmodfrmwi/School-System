import { useNavigate } from "react-router-dom";

const Activities = () => {
    const navigate = useNavigate();

    // دالة لتعديل المسابقة
    const handleEdit = (id) => {
        console.log(`Editing contest with ID: ${id}`);
        navigate(`/manager/edit-school-hubs/${id}`);
    };

    // دالة لحذف المسابقة
    const handleDelete = (id) => {
        console.log(`Deleting contest with ID: ${id}`);
    };

    // دالة لإضافة مسابقة جديدة
    const handleAddActivity = () => {
        console.log("Adding new school hub");
        navigate("/manager/add-school-hubs");
    };

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5">
                {/* العنوان وزر الإضافة في نفس الصف */}
                <div className="flex justify-between items-center ms-7 mt-5">
                    <div className="text-2xl font-poppins cursor-text font-bold text-[#105E6A]">
                        School Hubs
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4 mr-4">
                        <button
                            onClick={handleAddActivity}
                            className="rounded-3xl bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
                        >
                            Add School Hubs
                        </button>
                    </div>
                </div>
                <p className="w-36 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>

                <div className="flex flex-col md:flex-row items-center justify-between mt-5 gap-4">
                    <div className="flex flex-col sm:flex-row w-full md:w-2/3 gap-4">
                        
                        {/* مسابقة 1 */}
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
                            <div className="flex flex-row items-center justify-center gap-4 mt-4">
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-[#105E6A] px-5 py-2 text-lg font-medium text-white"
                                    onClick={() => navigate("/manager/school-hubs/detailes")}
                                >
                                    Details
                                </button>
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl text-[#117C90] border border-[#117C90] px-5 py-2 text-lg font-medium"
                                    onClick={() => navigate("/manager/school-hubs/prizes")}
                                >
                                    Prizes
                                </button>

                                {/* أزرار التعديل والحذف */}
                                <div className="flex gap-3 rounded-3xl  border border-[#117C90] px-5 py-2">
                                    <button
                                        aria-label="Edit contest"
                                        onClick={() => handleEdit(1)}
                                        className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                    >
                                        <i className="far fa-edit text-lg" />
                                    </button>
                                    <button
                                        aria-label="Delete contest"
                                        onClick={() => handleDelete(1)}
                                        className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                    >
                                        <i className="far fa-trash-alt text-lg" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* مسابقة 2 */}
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
                            <div className="flex flex-row items-center justify-center gap-4 mt-4">
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl bg-[#105E6A] px-5 py-2 text-lg font-medium text-white"
                                    onClick={() => navigate("/manager/school-hubs/detailes")}
                                >
                                    Details
                                </button>
                                <button
                                    className="cursor-pointer font-poppins rounded-3xl text-[#117C90] border border-[#117C90] px-5 py-2 text-lg font-medium"
                                    onClick={() => navigate("/manager/school-hubs/prizes")}
                                >
                                    Prizes
                                </button>

                                {/* أزرار التعديل والحذف */}
                                <div className="flex gap-3 rounded-3xl  border border-[#117C90] px-5 py-2">
                                    <button
                                        aria-label="Edit contest"
                                        onClick={() => handleEdit(2)}
                                        className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                    >
                                        <i className="far fa-edit text-lg" />
                                    </button>
                                    <button
                                        aria-label="Delete contest"
                                        onClick={() => handleDelete(2)}
                                        className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                    >
                                        <i className="far fa-trash-alt text-lg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activities;