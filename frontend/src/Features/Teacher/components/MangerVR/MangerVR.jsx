import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVirtualRooms, fetchCompletedRooms, fetchMissedRooms, markRoomAsViewed, clearError } from "../TeacherRedux/VirtualRoomsMangerSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const VirtualRoomsManger = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const { t } = useTranslation();
    const itemsPerPage = 3;
    const dispatch = useDispatch();
    const { virtualRooms, completedRooms, missedRooms, loading, error } = useSelector(
      (state) => state.virtualRoomsmanger
    );
  
    const [activeTab, setActiveTab] = useState("all");
  
    useEffect(() => {
      Promise.all([
        dispatch(fetchVirtualRooms()), 
        dispatch(fetchCompletedRooms()), 
        dispatch(fetchMissedRooms()) 
      ]).then(() => {
        setInitialLoading(false);
      }).catch(() => {
        setInitialLoading(false);
      });
    }, [dispatch]);
  
    useEffect(() => {
      if (error) {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          dispatch(clearError());
        });
      }
    }, [error, dispatch]);
  
    const handleViewRoom = (roomId) => {
      dispatch(markRoomAsViewed(roomId));
    };
  
    const displayedRooms =
      activeTab === "completed"
        ? completedRooms
        : activeTab === "missed"
          ? missedRooms
          : virtualRooms;
  
    const totalPages = Math.ceil(displayedRooms.length / itemsPerPage);
  
    const paginatedRooms = displayedRooms.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    return (
      <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-3 mb-20">
        {/* Main Content */}
        <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">{t('virtualRooms.main.title')}</h1>
  
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button
              variant={activeTab === "all" ? "outline" : "solid"}
              className={`${activeTab === "all"
                ? "bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90] text-white"
                : "border border-gray-500 text-gray-800"
                } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("all")}
            >
            {t('virtualRooms.main.allTab')} ({virtualRooms.length})
            </Button>
  
            <Button
              variant={activeTab === "completed" ? "outline" : "solid"}
              className={`${activeTab === "completed"
                ? "bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90] text-white"
                : "border border-gray-500 text-gray-800"
                } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("completed")}
            >
            {t('virtualRooms.main.completedTab')}({completedRooms?.length || 0})
            </Button>
  
            <Button
              variant={activeTab === "missed" ? "outline" : "solid"}
              className={`${activeTab === "missed"
                ? "bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90] text-white"
                : "border border-gray-500 text-gray-800"
                } px-4 md:px-6 py-2 rounded-full`}
              onClick={() => setActiveTab("missed")}
            >
              {t('virtualRooms.main.missedTab')}  ({missedRooms?.length || 0})
            </Button>
          </div>
  
          {/* Secondary Loading State (for actions after initial load) */}
          {loading && !initialLoading && (
            <div className="flex items-center justify-center text-center text-gray-500 mt-10">
              <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
              <p className="text-gray-700 text-lg font-semibold">{t('virtualRooms.main.loading')}...</p>
            </div>
          )}
  
          {/* No Virtual Rooms Message */}
          {!initialLoading && !loading && displayedRooms.length === 0 && (
            <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center">
              <CardContent className="text-center p-4 text-gray-600">
                {t('virtualRooms.main.noRooms')}
              </CardContent>
            </Card>
          )}
  
          {/* Virtual Room Cards */}
          {!initialLoading && !loading && displayedRooms.length > 0 && (
            <div className="space-y-4">
              {paginatedRooms.map((room, index) => (
                <Card key={room._id} className="border border-gray-200 rounded-xl shadow-sm">
                  <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#cacaca] rounded-full text-[#117C90] font-bold">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </div>
                      <div>
                        <h2 className="text-base md:text-lg font-semibold text-gray-800">{room.title}</h2>
                        <p className="text-md text-gray-700">{t('virtualRooms.main.teacher')} : {room.managerId.fullName} </p>
                        <p className="text-sm text-gray-600">{t('virtualRooms.main.duration')} : {room.duration} </p>
                        <p className="text-sm text-gray-400">{new Date(room.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-gray-500">
                      <Button
                        variant="solid"
                        className={`text-white px-3 py-2 rounded-lg ${
                          room.status === "completed" || room.studentAttendanceStatus === "attended" || room.studentAttendanceStatus === "missed"
                            ? "bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90] cursor-not-allowed"
                            : "bg-gradient-to-r from-[#117C90] via-[#117C90] to-[#117C90]"
                        }`}
                        disabled={room.status === "completed" || room.studentAttendanceStatus === "attended" || room.studentAttendanceStatus === "missed"}
                        onClick={() => {
                          if (room.status !== "completed" && room.studentAttendanceStatus !== "attended" && room.studentAttendanceStatus !== "missed") {
                            window.open(room.link, "_blank");
                            handleViewRoom(room._id);
                          }
                        }}
                      >
                        {room.studentAttendanceStatus === "attended"
                          ? t('virtualRooms.roomStatus.attended')
                          : room.studentAttendanceStatus === "missed"
                          ? t('virtualRooms.roomStatus.missed')
                          : room.status === "completed"
                          ?  t('virtualRooms.roomStatus.completed')
                          : t('virtualRooms.roomStatus.enter')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
  
          {/* Pagination Controls */}
          {!initialLoading && !loading && displayedRooms.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-4 mb-4 mt-10">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="text-gray-800 font-medium">
                {t('virtualRooms.main.page')} {currentPage} {t('virtualRooms.main.of')} {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default VirtualRoomsManger;