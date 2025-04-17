import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolHubs, deleteSchoolHub } from "../ManagerRedux/schoolhubSlice";
import { useTranslation } from 'react-i18next';

const Activities = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { schoolHubs, loading, error } = useSelector(
    (state) => state.schoolhub,
  );

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
      <div className="col-span-2 ms-5 flex flex-col justify-between">
        <div className="mt-5 flex items-center justify-between">
          <div className="dark:text-DarkManager cursor-text font-poppins text-2xl font-bold text-[#105E6A]">
          {t("activities.tabs.schoolHubs")}
          </div>
          <div className="mr-4 flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-4">
            <button
              onClick={() => navigate("/manager/add-school-hubs")}
              className="dark:bg-DarkManager rounded-3xl bg-[#117C90] px-4 py-2 font-poppins text-xs text-white transition hover:bg-[#0E6B7A] sm:text-sm"
            >
              {t('schoolhubs.AddSchoolHubs')}
            </button>
          </div>
        </div>
        <p className="dark:border-DarkManager mb-2 w-36 rounded-xl border-t-4 border-[#117C90]"></p>

        <div className="mt-5 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {schoolHubs.length > 0 ? (
              schoolHubs.map((hub) => (
                <div
                  key={hub._id}
                  className="dark:bg-DarkManager2 rounded-lg border bg-[#F5F5F5] p-4 text-center shadow-md dark:text-white"
                >
                  <h3 className="font-poppins text-xl font-bold text-[#105E6A] dark:text-white">
                    {hub.title}
                  </h3>
                  <div className="mt-2 flex flex-col items-center">
                    <p className="font-poppins text-sm">
                    {t("activities.hubCard.registrationStart")}:
                    </p>
                    <p className="font-poppins text-sm font-semibold">
                      {" "}
                      {new Date(hub.registrationStart).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col items-center">
                    <p className="font-poppins text-sm">{t("activities.hubCard.registrationEnd")}:</p>
                    <p className="font-poppins text-sm font-semibold">
                      {new Date(hub.registrationEnd).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col items-center">
                    <p className="font-poppins text-sm">{t("activities.hubCard.contestDate")}:</p>
                    <p className="font-poppins text-sm font-semibold">
                      {new Date(hub.contestDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-row items-center justify-center gap-4">
                    <button
                      className="dark:bg-DarkManager cursor-pointer rounded-3xl bg-[#105E6A] px-4 py-2 font-poppins text-lg font-medium text-white"
                      onClick={() => {
                        navigate(`/manager/school-hubs/detailes/${hub._id}`);
                      }}
                    >
                    {t("activities.hubCard.details")}
                    </button>
                    <button
                      className="cursor-pointer rounded-3xl border border-[#117C90] px-4 py-2 font-poppins text-lg font-medium text-[#117C90] dark:text-white"
                      onClick={() => {
                        navigate(`/manager/school-hubs/prizes/${hub._id}`);
                      }}
                    >
                    {t("activities.hubCard.prizes")}
                    </button>
                    <div className="dark:border-DarkManager flex gap-3 rounded-3xl border border-[#117C90] px-4 py-2">
                      <button
                        aria-label="Participants"
                        onClick={() => {
                          navigate(
                            `/manager/school-hubs/participants/${hub._id}`,
                          );
                        }}
                        className="text-[#117C90] transition duration-300 hover:text-[#0E6B7A] dark:text-white"
                      >
                        <i className="fas fa-users text-lg" />
                      </button>

                      <button
                        aria-label="Edit contest"
                        onClick={() =>
                          navigate(`/manager/edit-school-hubs/${hub._id}`)
                        }
                        className="text-[#117C90] transition duration-300 hover:text-[#244856] dark:text-white"
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
              <div className="mt-10 flex flex-col items-center justify-center rounded-lg bg-[#F9FAFB] py-16 shadow-lg">
                <p className="mb-2 text-xl font-semibold text-gray-600">
                  No school hubs available.
                </p>
                <p className="mb-4 max-w-xl text-center text-gray-500">
                  It seems like there are no school hubs available at the
                  moment. Please check back later.
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
