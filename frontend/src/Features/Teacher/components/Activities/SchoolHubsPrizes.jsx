import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherSchoolHubs } from "../TeacherRedux/schoolhubSlice";
import activityImage from "../../../../assets/TeacherIcon/img1.png";
import { useTranslation } from 'react-i18next';

const PrizesActivity = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const { schoolHubs, loading, error } = useSelector((state) => state.teacherSchoolHub);
    const { t } = useTranslation();
   
    useEffect(() => {
        dispatch(getTeacherSchoolHubs());
    }, [dispatch]);

   
    const activity = schoolHubs.find((hub) => hub._id === id);

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>Error: {error}</div>; 
    if (!activity) return <div>No activity found.</div>; 

    const { prizes } = activity;

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5">
                
                <div className="text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold  ms-7 mt-5">
                {t("activityPrizes.title")}

                </div>
               
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>

                <div className="flex flex-col items-center mt-5">
                    <img
                        src={activityImage}
                        alt="Activities"
                        className="mb-4 w-full max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
                    />

                   
                    <div className="w-1/2 mx-auto flex justify-center flex-wrap gap-4 mt-4 p-4">
                        {prizes.map((prize, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#105E6A] hover:shadow-lg hover:shadow-[#117C90] transition-shadow duration-300"
                                style={{ flex: "1 1 calc(50% - 1rem)" }} 
                            >
                                <h3 className="font-bold font-poppins text-lg">{t("activityPrizes.prizeLevel")}  {index + 1}</h3>
                                <p className="text-sm mt-2">{prize}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrizesActivity;