import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolHubs, deleteSchoolHub } from "../ManagerRedux/schoolhubSlice";

const Activities = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { schoolHubs, loading, error } = useSelector((state) => state.schoolhub);


    useEffect(() => {
        dispatch(getSchoolHubs());
    }, [dispatch]);


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this school hub?")) {
            await dispatch(deleteSchoolHub(id));
            dispatch(getSchoolHubs());
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="col-span-2 flex flex-col justify-between ms-5">
                <div className="flex justify-between items-center ms-7 mt-5">
                    <div className="text-2xl font-poppins cursor-text font-bold text-[#105E6A]">
                        School Hubs
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4 mr-4">
                        <button
                            onClick={() => navigate("/manager/add-school-hubs")}
                            className="rounded-3xl bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
                        >
                            Add School Hubs
                        </button>
                    </div>
                </div>
                <p className="w-36 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>

                <div className="flex flex-col md:flex-row items-center justify-between mt-5 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4">
                        {schoolHubs.length > 0 ? (
                            schoolHubs.map((hub) => (
                                <div key={hub._id} className="border rounded-lg p-4 text-center bg-[#F5F5F5] shadow-md">
                                    <h3 className="font-bold font-poppins text-xl text-[#105E6A]">{hub.title}</h3>
                                    <div className="flex flex-col items-center mt-2">
                                        <p className="text-sm font-poppins">Contest Registration Start:</p>
                                        <p className="text-sm font-semibold font-poppins"> {new Date(hub.registrationStart).toLocaleString()}</p>
                                    </div>
                                    <div className="flex flex-col items-center mt-2">
                                        <p className="text-sm font-poppins">Contest Ends:</p>
                                        <p className="text-sm font-semibold font-poppins">{new Date(hub.registrationEnd).toLocaleString()}</p>
                                    </div>
                                    <div className="flex flex-col items-center mt-2">
                                        <p className="text-sm font-poppins">Contest Date:</p>
                                        <p className="text-sm font-semibold font-poppins">{new Date(hub.contestDate).toLocaleString()}</p>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-4 mt-4">
                                        <button
                                            className="cursor-pointer font-poppins rounded-3xl bg-[#105E6A] px-4 py-2 text-lg font-medium text-white"
                                            onClick={() => {
                                                navigate(`/manager/school-hubs/detailes/${hub._id}`);
                                            }}
                                        >
                                            Details
                                        </button>
                                        <button
                                            className="cursor-pointer font-poppins rounded-3xl text-[#117C90] border border-[#117C90] px-4 py-2 text-lg font-medium"
                                            onClick={() => {
                                                navigate(`/manager/school-hubs/prizes/${hub._id}`);
                                            }}
                                        >
                                            Prizes
                                        </button>
                                        <div className="flex gap-3 rounded-3xl border border-[#117C90] px-4 py-2">
                                            <button
                                                aria-label="Participants"
                                                onClick={() => {
                                                    navigate(`/manager/school-hubs/participants/${hub._id}`);
                                                }}
                                                className="text-[#117C90] transition duration-300 hover:text-[#0E6B7A]"
                                            >
                                                <i className="fas fa-users text-lg" />
                                            </button>

                                            <button
                                                aria-label="Edit contest"
                                                onClick={() => navigate(`/manager/edit-school-hubs/${hub._id}`)}
                                                className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                                            >
                                                <i className="far fa-edit text-lg" />
                                            </button>
                                            <button
                                                aria-label="Delete contest"
                                                onClick={() => handleDelete(hub._id)}
                                                className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                                            >
                                                <i className="far fa-trash-alt text-lg" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center bg-[#F9FAFB] py-16 rounded-lg shadow-lg mt-10">
                                <p className="text-xl font-semibold text-gray-600 mb-2">No school hubs available.</p>
                                <p className="text-gray-500 mb-4 text-center max-w-xl">
                                    It seems like there are no school hubs available at the moment. Please check back later.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Activities;