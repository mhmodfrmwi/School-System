import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fetchVirtualRooms } from "../ManagerRedux/VRMangerSlice";
import { deleteVR } from "../ManagerRedux/VRMangerSlice";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const ManagerVRTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { virtualRooms, status, error } = useSelector(
    (state) => state.virtualRooms,
  );

  const formatStartTime = (startTime) => {
    if (!startTime) {
      return "N/A";
    }

    try {
      const date = new Date(startTime);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      const formattedDate = date.toISOString().split("T")[0]; // Extract date
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Format time
      return `${formattedDate} (${formattedTime})`;
    } catch (error) {
      console.error("Error formatting startTime:", error);
      return "Invalid Date";
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVirtualRooms());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Virtual Rooms:", virtualRooms);
  }, [virtualRooms]);

  const GoToForm = (id) => {
    navigate(`/manager/virtual-room-form`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this virtual room?")) {
      dispatch(deleteVR(id));
    }
    toast.success("virtual room deleted successfully");
  };
  const handleEdit = (id) => {
    navigate(`/manager/edit-virtual-room/${id}`);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-full xl:w-full">
          <div className="ml-8 flex flex-col">
            <div className="mb-4 mt-4 flex w-[95%] flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:mb-6">
              <div>
                <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                {t('dashboardteacher.VirtualClassrooms')}
                </h1>
                <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[160px]"></div>
              </div>
              <button
                className="dark:bg-DarkManager rounded-md bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
                onClick={() => GoToForm()}
              >
              {t('tablesheader.UploadVirtualRooms')}
              </button>
            </div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mt-7">
              <div className="overflow-x-auto">
                <table className="dark:shadow-DarkManager min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90]">
                  <thead className="dark:bg-DarkManager bg-[#117C90] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      {t('tablesheader.Title')}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      {t('tablesheader.StartTime')}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      {t('tablesheader.Duration')}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      {t('tablesheader.Link')}
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        {t('tablesheader.Actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {virtualRooms && virtualRooms.length > 0 ? (
                      virtualRooms.map((room) => (
                        <tr
                          key={room._id}
                          className={`dark:hover:bg-DarkManager/70 bg-[#F5FAFF] hover:bg-[#117C90]/70 dark:text-black`}
                        >
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {room.title}
                          </td>
                          <td className="px-3 py-2">
                            {formatStartTime(room.startTime)}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {room.duration} Minutes
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            <a
                              href={room.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                            {t('tablesheader.ViewFile')}
                            </a>
                          </td>
                          <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                            <button
                              onClick={() => handleEdit(room._id)}
                              className="dark:text-DarkManager text-[#117C90] hover:text-[#244856]"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="text-[#E74833] hover:text-[#244856]"
                              onClick={() => handleDelete(room._id)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-4 text-center">
                          No virtual rooms found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerVRTable;
