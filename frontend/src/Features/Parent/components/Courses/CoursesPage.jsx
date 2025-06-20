import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { fetchSubjects,} from "../../components/ParentRedux/CoursesSlice";
import {fetchVirtualRooms} from "../../components/ParentRedux/VRSlice"
import { setSelectedKid } from "../../components/ParentRedux/MotivationSlice"; 
import Loader from "../../../../ui/Loader";
import ErrorComponent from "@/ui/ErrorComponent";
import sub1 from "../../../../assets/sub1.png";
import sub2 from "../../../../assets/sub2.png";
import subject from "../../../../assets/child.jpg";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";

const images = [sub1, sub2];

const AllCoursesParent = () => {
  const { t, i18n } = useTranslation();
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const selectedKid = useSelector((state) => state.motivationparent.selectedKid);
  const { subjects, loading, error } = useSelector((state) => state.allSubjectsParent);
  const [activeButton, setActiveButton] = useState(t('courses.allSubjects'));

  useEffect(() => {
    const kidFromStorage = JSON.parse(localStorage.getItem('selectedKid'));
    if (kidFromStorage) {
      dispatch(setSelectedKid(kidFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedKid?._id) {
      dispatch(fetchSubjects());
    }
  }, [dispatch, selectedKid, i18n.language]);

  const buttons = [
    { label: t('courses.allSubjects'), key: "all" },
    ...(subjects || []).map((subject) => ({
      label: subject.subjectName,
      key: subject.subjectName.toLowerCase(),
    })),
  ];

  const filteredSubjects = activeButton === t('courses.allSubjects')
    ? subjects || []
    : (subjects || []).filter((subject) => subject.subjectName === activeButton);

  useEffect(() => {
    setActiveButton(t('courses.allSubjects'));
  }, [i18n.language, t]);

  const renderLoading = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader role={role} />
        </div>
      );
    }
    return null;
  };
const handleStartClick = (subjectId) => {
    dispatch(fetchVirtualRooms(subjectId));
    navigate(`/parent/all-subjects/virtualrooms/${subjectId}`);
  };

  const renderNoSubjects = () => {
    if ((!subjects || subjects.length === 0) && !loading && !error) {
      return (
        <div className="flex flex-col lg:flex-row items-center justify-center text-center mt-16 min-h-[60vh] w-[95%] mx-auto font-poppins gap-8">
          <motion.img
            src={subject}
            alt={t('courses.noSubjectsAlt')}
            className="w-full lg:w-1/2 mb-8 rounded-3xl h-[50vh] lg:h-[75vh] object-cover shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="flex flex-col items-center text-center justify-center p-8 bg-white dark:bg-[#312A5E] rounded-xl shadow-lg w-3/4 lg:w-1/2 lg:ml-12 border border-[#FD813D] dark:border-[#E0AAEE]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {t('courses.noSubjectsTitle')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 w-3/4 text-lg">
              {t('courses.noSubjectsMessage')}
            </p>
            <motion.div
              className="flex space-x-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <div className="w-4 h-4 bg-[#FD813D] dark:bg-[#E0AAEE] rounded-full"></div>
              <div className="w-4 h-4 bg-[#CF72C0] dark:bg-[#C459D9] rounded-full"></div>
              <div className="w-4 h-4 bg-[#BC6FFB] rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-[#FF8C38] via-[#FF6F61] to-[#C459D9] dark:bg-[#13082F] p-6 relative"
      style={{
        backgroundImage: "var(--background-image)",
      }}
    >
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>

      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>

      <div className="relative z-10 mt-16 mb-20 min-h-[68vh] w-[95%] mx-auto">
        {error && (
          <ErrorComponent
            error={error}
            onRetry={() => dispatch(fetchSubjects())}
          />
        )}

        {/** Buttons */}
        {!loading && !error && !renderNoSubjects() && (
          <div className="my-10 ms-10 grid w-[70%] grid-cols-2 font-semibold sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 gap-4">
            {buttons.map((button) => (
              <button
                key={button.key}
                className={`cursor-pointer font-poppins rounded-3xl py-2 font-medium transition duration-300 ${
                  activeButton === button.label
                    ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white"
                    : "bg-transparent text-orange-500 dark:text-[#E0AAEE] hover:bg-gradient-to-r hover:from-[#FD813D] hover:via-[#CF72C0] hover:to-[#BC6FFB] dark:hover:bg-gradient-to-r dark:hover:from-[#CE4EA0] dark:hover:via-[#BF4ACB] dark:hover:to-[#AE45FB] hover:text-white"
                }`}
                onClick={() => setActiveButton(button.label)}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}

        {/** No Subjects */}
        {renderNoSubjects()}

        {/** Loading */}
        {renderLoading()}

        {/** Courses */}
        <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            !error &&
            filteredSubjects.map((subject, index) => (
              <div
                key={subject.id}
                className="rounded-lg shadow-lg bg-white dark:bg-[#312A5E] overflow-hidden"
              >
                <div
                  className="h-32 bg-cover bg-center flex p-3 text-white text-lg font-semibold"
                  style={{
                    backgroundImage: `url(${images[index % images.length]})`,
                  }}
                >
                  {subject.subjectName}
                </div>

                <div className="p-4 text-gray-700 dark:text-gray-300">
                  <div className="mb-4 font-poppins">
                    {subject.gradeName}, {subject.academicYear},{" "}
                    {subject.semesterName}
                  </div>
                  <div className="ms-1 w-50 rounded-xl mb-4 border-t-2 border-[#868686] dark:border-[#E0AAEE]"></div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center font-poppins bg-blue-300 dark:bg-[#C459D9] justify-center w-7 h-7 rounded-full mr-4">
                        <FontAwesomeIcon
                          className="text-blue-600 dark:text-white"
                          icon={faCalendar}
                        />
                      </div>
                      <div>
                        <span className="font-poppins">{t('courses.lastUpdate')}:</span>
                        <span className="font-poppins">
                          {new Date(subject.updatedAt).toLocaleString(i18n.language)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="bg-blue-100 dark:bg-[#C459D9] font-poppins text-blue-600 dark:text-white py-1 px-3 rounded-md border border-blue-600 dark:border-[#E0AAEE]"
                      onClick={() => handleStartClick(subject.id)}

                    >
                      {t('courses.startButton')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AllCoursesParent);