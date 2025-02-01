import { useState } from "react";
import ScheduleToggle from "./SelectPage";

const WeeklySchedule = () => {
   

    return (
        <>
            <ScheduleToggle />
            <div className="col-span-2 flex flex-col justify-between ms-5">
                <div className="text-xl sm:text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold ms-7 mt-5">
                    Weekly Schedule  2024-10-20 to 2024-10-26
                </div>
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>
            </div>



            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        <div className="mx-auto w-full max-w-7xl px-4">
                            <div className="flex justify-end items-center my-6">
                                <button className="bg-gradient-to-r from-[#105E6A] to-[#117C90] rounded-2xl px-3 sm:px-4 py-1 sm:py-2 text-xs text-white sm:text-sm md:text-base">
                                    Export as PDF
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default WeeklySchedule;