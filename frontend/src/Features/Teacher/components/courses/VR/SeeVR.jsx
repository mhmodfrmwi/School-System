import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVR, deleteVR } from "../../TeacherRedux/VRSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const formatStartTime = (startTime) => {
  const date = new Date(startTime);
  const formattedDate = date.toISOString().split("T")[0]; // التاريخ
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // الوقت
  return `${formattedDate} (${formattedTime})`;
};
const SeeVR = () => {
  const { grade_subject_semester_id } = useParams();
  const { t ,i18n} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const { teacherVirtualRooms, error } = useSelector(
    (state) => state.teacherVirtualRooms,
  );
  console.log("Redux State:", teacherVirtualRooms, "Error:", error);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (grade_subject_semester_id) {
      setIsLoading(true);
      dispatch(fetchVR(grade_subject_semester_id))
        .unwrap()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [dispatch, grade_subject_semester_id]);

  const handleDelete = async (id) => {
    if (!id || id.length !== 24) {
      toast.error("Invalid VR ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this VR?")) {
      try {
        const resultAction = await dispatch(deleteVR(id));

        if (deleteVR.fulfilled.match(resultAction)) {
          dispatch(fetchVR(grade_subject_semester_id));
        } else {
          toast.error(resultAction.payload || "Failed to delete material");
        }
      } catch (error) {
        toast.error(error.message || "An unexpected error occurred");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/teacher/edit-vr/${id}`);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-full xl:w-full">
          <div className="ml-8 flex flex-col">
            <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
              {t("dashboardteacher.VirtualClassrooms")}
            </h1>
            <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[210px]"></div>
          </div>
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mt-7">
              {isLoading ? (
                <p className="text-center font-poppins text-lg">
                  Loading virtual rooms...
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90] dark:shadow-DarkManager">
                    <thead className="bg-[#117C90] text-white dark:bg-DarkManager">
                      <tr>
                        <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                          {t("tablesheader.Title")}
                        </th>
                        <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                          {t("tablesheader.StartTime")}
                        </th>
                        <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                          {t("tablesheader.Duration")}
                        </th>
                        <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                          {t("tablesheader.Link")}
                        </th>
                        <th className={`px-3 py-2 text-${isRTL ? 'right' : 'left'} font-poppins text-xs font-medium sm:text-sm md:text-base`}>
                          {t("tablesheader.Actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="font-poppins">
                      {teacherVirtualRooms.length > 0 ? (
                        teacherVirtualRooms.map((room, index) => (
                          <tr
                            key={room._id}
                            className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:text-black dark:hover:bg-DarkManager/70`}
                          >
                            <td className="px-3 py-2">{room.title}</td>
                            <td className="px-3 py-2">
                              {formatStartTime(room.startTime)}
                            </td>
                            <td className="px-3 py-2">{room.duration}</td>
                            <td className="px-3 py-2">
                              <a
                                href={room.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#20606b] hover:underline"
                              >
                                {t("tablesheader.ViewFile")}
                              </a>
                            </td>
                            <td className={`px-3 py-2 text-xs sm:text-sm md:text-base ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                              <button
                                onClick={() => handleEdit(room._id)}
                                className="text-[#117C90] hover:text-[#244856] dark:text-DarkManager"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                onClick={() => handleDelete(room._id)}
                                className="text-[#E74833] hover:text-[#244856]"
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-9 text-center">
                            No Virtual Rooms Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeVR;
