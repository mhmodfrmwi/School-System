import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherSchoolHubs } from "../TeacherRedux/schoolhubSlice"; 
import activityImage from "../../../../assets/TeacherIcon/img2.png";

const DetailesActivity = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
   const { schoolHubs, loading, error } = useSelector((state) => state.teacherSchoolHub);
   
    useEffect(() => {
        dispatch(getTeacherSchoolHubs());
    }, [dispatch]);

   
    const activity = schoolHubs.find((hub) => hub._id === id);

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>Error: {error}</div>;
    if (!activity) return <div>No activity found.</div>; 

    const { details, location } = activity;

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5">
                
                <div className="text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold  ms-7 mt-5">
                    Details
                </div>
                
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>

                
                <div className="flex flex-col items-center mt-5">
                    <img
                        src={activityImage}
                        alt="Activities"
                        className="mb-6 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
                    />

                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 w-full max-w-4xl">
                       
                        <div className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#105E6A]">
                            <h3 className="font-bold font-poppins text-xl">Location</h3>
                            <p className="text-md mt-2">{location}</p>
                        </div>

                       
                        <div className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#117C90]">
                            <h3 className="font-bold font-poppins text-xl">Details</h3>
                            <p className="text-md mt-2">{details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailesActivity;