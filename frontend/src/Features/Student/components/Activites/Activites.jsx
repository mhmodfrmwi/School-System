import { useNavigate } from "react-router-dom";
import activityImage from "../../../../assets/activity.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSchoolHubs, createStudentSchoolHub, getStudentSchoolHubById, deleteStudentSchoolHub } from "../StudentRedux/schoolhubSlice";

const Activities = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { schoolHubs = [], loading } = useSelector((state) => state.studentSchoolHub || {});
    const [participationStatus, setParticipationStatus] = useState({});

    useEffect(() => {
        dispatch(getStudentSchoolHubs());
    }, [dispatch]);

    useEffect(() => {
        schoolHubs.forEach(async (hub) => {
            try {
                const response = await dispatch(getStudentSchoolHubById(hub._id)).unwrap();
                setParticipationStatus((prevState) => ({
                    ...prevState,
                    [hub._id]: response.participated,
                }));
            } catch (error) {
                console.error("Error fetching participation status:", error);
            }
        });
    }, [dispatch, schoolHubs]);

    const handleToggleParticipation = async (hubId) => {
        try {
            if (participationStatus[hubId]) {
                await dispatch(deleteStudentSchoolHub(hubId)).unwrap();
                setParticipationStatus((prevState) => ({
                    ...prevState,
                    [hubId]: false,
                }));
            } else {
                await dispatch(createStudentSchoolHub({ schoolHubId: hubId, schoolHubData: {} })).unwrap();
                setParticipationStatus((prevState) => ({
                    ...prevState,
                    [hubId]: true,
                }));
            }
        } catch (error) {
            console.error("Failed to update participation status:", error.message);
        }
    };

    if (loading) {
        return (
            <div className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-lg rounded-2xl border-2 border-pink-300 text-center">
                <p className="text-gray-700 font-poppins">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5">
                <div className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-1 font-bold text-transparent ms-7 mt-5">
                    Activities
                </div>
                <p className="w-24 rounded-xl mb-2 border-t-4 border-[#BC6FFB] ms-7"></p>

                <div className="mb-6 mt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                        className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-poppins font-medium text-white focus:outline-none"
                        onClick={() => navigate("/student/activities")}
                    >
                        School Hubs
                    </button>
                    <button
                        className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-poppins font-medium text-transparent"
                        onClick={() => navigate("/student/activities/contests")}
                    >
                        Contests
                    </button>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between mt-5 gap-4">
                    <div className="flex flex-col sm:flex-row w-full md:w-2/3 gap-4">
                        {Array.isArray(schoolHubs) && schoolHubs.length > 0 ? (
                            schoolHubs.map((hub) => (
                                <div key={hub._id} className="flex flex-col w-full border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                                    <h3 className="font-bold font-poppins text-xl text-[#CF72C0]">{hub.title}</h3>
                                    <div className="flex flex-col items-center mt-2">
                                        <p className="text-sm font-poppins">Contest Registration Start:</p>
                                        <p className="text-sm font-semibold font-poppins">{new Date(hub.registrationStart).toLocaleString()}</p>
                                    </div>
                                    <div className="flex flex-col items-center mt-2">
                                        <p className="text-sm font-poppins">Contest Ends:</p>
                                        <p className="text-sm font-semibold font-poppins">{new Date(hub.registrationEnd).toLocaleString()}</p>
                                    </div>
                                    <div className="flex flex-col items-center mt-2">
                                        <p className="text-sm font-poppins">Contest Date:</p>
                                        <p className="text-sm font-semibold font-poppins">{new Date(hub.contestDate).toLocaleString()}</p>
                                    </div>

                                    <div className="flex flex-col items-center gap-4 mt-4">
                                        <div className="flex gap-2">
                                            <button
                                                className="cursor-pointer font-poppins rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-lg font-medium text-white transition-transform transform hover:scale-105 shadow-md"
                                                onClick={() => navigate(`/student/activities/detailes/${hub._id}`)}
                                            >
                                                Details
                                            </button>
                                            <button
                                                className="cursor-pointer font-poppins rounded-3xl border border-[#CF72C0] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent transition-transform transform hover:scale-105 shadow-md"
                                                onClick={() => navigate(`/student/activities/prizes/${hub._id}`)}
                                            >
                                                Prizes
                                            </button>
                                        </div>
                                        <button
                                            className={`cursor-pointer font-poppins rounded-3xl border border-[#CF72C0] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-lg font-medium text-transparent transition-transform transform hover:scale-105 shadow-md`}
                                            onClick={() => handleToggleParticipation(hub._id)}
                                        >
                                            {participationStatus[hub._id] ? "Disjoin" : "Join"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center font-poppins bg-[#F9FAFB] min-h-[200px] w-full sm:w-2/3 px-6 sm:px-12 py-10 rounded-lg shadow-lg mt-10 text-center">
                                <p className="text-xl font-semibold text-gray-600 mb-2">No school hubs available.</p>
                                <p className="text-gray-500 mb-4 text-center max-w-lg">
                                    It seems like there are no school hubs available at the moment. Please check back later.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="w-full sm:w-1/3 mt-5 md:mt-0 flex justify-center">
                        <img src={activityImage} alt="Activities" className="w-full max-w-md mx-auto" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activities;
