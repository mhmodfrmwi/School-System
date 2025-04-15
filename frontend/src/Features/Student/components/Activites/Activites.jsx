import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSchoolHubs, createStudentSchoolHub, getStudentSchoolHubById, deleteStudentSchoolHub } from "../StudentRedux/schoolhubSlice";
import Loader from "@/ui/Loader";
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next';

const Activities = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");
    const dispatch = useDispatch();
    const { schoolHubs = [], loading, error } = useSelector((state) => state.studentSchoolHub || {});
    const [participationStatus, setParticipationStatus] = useState({});

    useEffect(() => {
        dispatch(getStudentSchoolHubs());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title:  t("activities.errors.title"),
                text: error||t("activities.errors.default"),
            });
        }
    }, [error]);

    useEffect(() => {
        if (schoolHubs.length > 0) {
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
        }
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
            Swal.fire({
                icon: 'error',
                title: t("activities.errors.title"),
                text: error.message|| t("activities.errors.default"),
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader role={role} />
            </div>
        );
    }

    return (
        <div className="font-poppins min-h-screen w-[90%] mx-auto mt-16">
            
            <div className="col-span-2 flex flex-col justify-between ms-5">
                {/* Updated Header */}
                <div className="mb-1">
                    <h1 className="relative mb-8 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-3xl font-semibold text-transparent">
                    {t("activities.title")}
                        <span className="absolute bottom-[-9px] left-0 h-[4px] w-[100px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
                    </h1>

                    {/* Updated Buttons Section */}
                    <div className="mb-2 mt-22 flex items-center gap-8">
                        <button
                            className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] py-2 text-lg font-medium text-white focus:outline-none mt-8"
                            onClick={() => navigate("/student/activities")}
                        >
                            {t("activities.tabs.schoolHubs")}
                        </button>
                        <button
                            className="px-5 font-poppins cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-lg font-medium text-transparent mt-8"
                            onClick={() => navigate("/student/activities/contests")}
                        >
                            {t("activities.tabs.contests")}
                        </button>
                    </div>
                </div>

                {/* Updated Grid Layout for School Hubs */}
                <div className="flex flex-col md:flex-row items-start gap- w-full">
                    <div className="w-full mt-8 mb-16">
                        {/* Grid Layout for School Hubs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Array.isArray(schoolHubs) && schoolHubs.length > 0 ? (
                                schoolHubs.map((hub) => (
                                    <div key={hub._id} className="flex flex-col w-full border rounded-lg p-5 text-center bg-[#F5F5F5] shadow-md hover:shadow-lg">
                                        <h3 className="font-bold font-poppins text-xl text-[#CF72C0]">{hub.title}</h3>
                                        <hr className="my-4 border-t border-gray-300" />
                                        <div className="flex flex-col items-center mt-2">
                                            <p className="text-sm font-poppins">{t("activities.hubCard.registrationStart")}:</p>
                                            <p className="text-sm font-semibold font-poppins">{new Date(hub.registrationStart).toLocaleString()}</p>
                                        </div>
                                        <div className="flex flex-col items-center mt-2">
                                            <p className="text-sm font-poppins">{t("activities.hubCard.registrationEnd")}:</p>
                                            <p className="text-sm font-semibold font-poppins">{new Date(hub.registrationEnd).toLocaleString()}</p>
                                        </div>
                                        <div className="flex flex-col items-center mt-2">
                                            <p className="text-sm font-poppins">{t("activities.hubCard.contestDate")}:</p>
                                            <p className="text-sm font-semibold font-poppins">{new Date(hub.contestDate).toLocaleString()}</p>
                                        </div>

                                        <div className="flex flex-col items-center gap-4 mt-4">
                                            <div className="flex gap-2">
                                                <button
                                                    className="cursor-pointer font-poppins rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2 text-sm font-medium text-white transition-transform transform hover:scale-105 shadow-md"
                                                    onClick={() => navigate(`/student/activities/detailes/${hub._id}`)}
                                                >
                                                     {t("activities.hubCard.details")}
                                                </button>
                                                <button
                                                    className="cursor-pointer font-poppins rounded-3xl border border-[#CF72C0] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-sm font-medium text-transparent transition-transform transform hover:scale-105 shadow-md"
                                                    onClick={() => navigate(`/student/activities/prizes/${hub._id}`)}
                                                >
                                                    {t("activities.hubCard.prizes")}
                                                </button>
                                            </div>
                                            <button
                                                className={`cursor-pointer font-poppins rounded-3xl border border-[#CF72C0] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-5 py-2 text-sm font-medium text-transparent transition-transform transform hover:scale-105 shadow-md`}
                                                onClick={() => handleToggleParticipation(hub._id)}
                                            >
                                                {participationStatus[hub._id] ? t("activities.hubCard.disjoin") :  t("activities.hubCard.join")}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center font-poppins bg-[#F9FAFB] min-h-[200px] w-full sm:w-2/3 px-6 sm:px-12 py-10 rounded-lg shadow-lg mt-10 text-center col-span-full">
                                    <p className="text-xl font-semibold text-gray-600 mb-2">{t("activities.hubCard.noHubs")}</p>
                                    <p className="text-gray-500 mb-4 text-center max-w-lg">
                                    {t("activities.hubCard.noHubsMessage")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activities;