import React, { useEffect } from "react";
import ActivityToggle from "./SelectPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrips, clearMessage } from "../TeacherRedux/TripsSlice";
import { useNavigate } from "react-router-dom";
const Trips = () => {
    const navigate = useNavigate();
    const { trips, message, loading } = useSelector((state) => state.trips);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                dispatch(clearMessage());
            }, 5000);
        }
    }, [message, dispatch]);


    if (loading) {
        return <div className="w-full h-full"></div>; 
    }

    const handleAddActivity = () => {
        navigate("/teacher/contests/activity-form");
    };


    return (
        <>
            <ActivityToggle />
            <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
                <div className="flex flex-col">
                    <h1 className="text-lg font-poppins font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                        Admins
                    </h1>
                    <div className="mt-1 rounded-t-md bg-[#244856] h-[4px] w-[90px]"></div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">


                    <button onClick={handleAddActivity}
                        className="rounded-md bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
                    >
                        Add Admin
                    </button>
                </div>
            </div>

            <div className="flex flex-col p-4">
                <div className="flex-1">
                    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                        <div className="mx-auto w-full max-w-7xl px-4">

                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse rounded-2xl border-2 border-[#117C90] shadow-lg">
                                    <thead>
                                        <tr className="bg-[#105E6A] text-white text-xs sm:text-sm md:text-base">
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">Title</th>
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">Coach</th>
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">Start Date</th>
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">End Date</th>
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">Seats</th>
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">Fees</th>
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">Requirements</th>
                                            <th className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trips.map((index) => (
                                            <tr key={index} className="hover:bg-gray-100 text-xs sm:text-sm md:text-base">
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2">{index.title}</td>
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2">{index.coach}</td>
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2">{index.startDate}</td>
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2">{index.endDate}</td>
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2">{index.numberOfSeats}</td>
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2">{index.fees}</td>
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2">{index.requirements}</td>
                                                <td className="border font-poppins border-[#117C90] px-2 sm:px-4 py-2 flex justify-center space-x-2">

                                                    <button
                                                        aria-label="Edit contest"
                                                        // onClick={() => handleEdit(index.id)} 
                                                        className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                                    >
                                                        <i className="far fa-edit text-lg" />
                                                    </button>
                                                    <button
                                                        aria-label="Delete contest"
                                                        // onClick={() => handleDelete(index.id)} 
                                                        className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                                    >
                                                        <i className="far fa-trash-alt text-lg" />
                                                    </button>

                                                </td>
                                            </tr>

                                        ))}
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

export default Trips;