import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLibraryVideoItems,
  fetchAllGeneralAndMaterialVideos,
  fetchSubjectsWithVideoMaterial,
  fetchMaterialOfSubjectTypeVideo,
  viewLibraryItem,
  viewMaterial,
} from "../StudentRedux/libraryStudentSlice";
import img1 from "../../../../assets/cover22 1.png";
import img2 from "../../../../assets/Rectangle 314.png";
import { Card, CardContent } from "@/components/ui/card";
import { FaSpinner, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../ui/Loader";
import { useTranslation } from "react-i18next";
import backgroundWaves from "@/assets/StudentIcon/bg-color2.png";
import backgroundStars from "@/assets/StudentIcon/bg-color1.png";

// Helper function to extract YouTube Video ID
const extractYouTubeVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  const videoId = extractYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : img2;
};

// Pagination Controls Component
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-200 dark:bg-[#3B1E77] text-black dark:text-[#D1D5DB] rounded disabled:opacity-50"
      >
        &lt;
      </button>
      {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
        const pageNumber = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
        if (pageNumber > totalPages) return null;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 mx-1 ${
              currentPage === pageNumber
                ? "bg-blue-500 dark:bg-[#AE45FB] text-white"
                : "bg-gray-200 dark:bg-[#3B1E77] text-black dark:text-[#D1D5DB]"
            } rounded`}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-200 dark:bg-[#3B1E77] text-black dark:text-[#D1D5DB] rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

const LibraryVideosPage = () => {
  const { t ,i18n} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videoItems, videoSubjects, videoMaterials, generalVideos, loading, error } =
    useSelector((state) => state.libraryStudent);

  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // State for each tab
  const [tabStates, setTabStates] = useState({
    all: {
      currentPage: 1,
      selectedGrade: "",
      selectedSemester: "",
    },
    public: {
      currentPage: 1,
      selectedGrade: "",
      selectedSemester: "",
    },
    subject: {
      currentPage: 1,
      selectedGrade: "",
      selectedSemester: "",
    },
  });

  const itemsPerPage = 8; // Number of items per page

  // Get the current tab's state
  const currentTabState =
    tabStates[
      selectedSubject === "all" ? "all" : selectedSubject === "public" ? "public" : "subject"
    ];
  const { currentPage, selectedGrade, selectedSemester } = currentTabState;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchLibraryVideoItems());
      await dispatch(fetchSubjectsWithVideoMaterial());
      setInitialLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubject === "all") {
      dispatch(fetchAllGeneralAndMaterialVideos());
    } else if (selectedSubject !== "public" && selectedSubject.id) {
      dispatch(fetchMaterialOfSubjectTypeVideo(selectedSubject.id));
    }
  }, [selectedSubject, dispatch]);

  const handleItemClick = (itemId, type) => {
    if (type === "general") dispatch(viewLibraryItem(itemId));
    if (type === "material") dispatch(viewMaterial(itemId));
    navigate(`/student/library/${type}/${itemId}`);
  };

  const displayedMaterials =
    selectedSubject === "all"
      ? generalVideos
      : selectedSubject === "public"
      ? videoItems
      : videoMaterials;

  const filteredMaterials = displayedMaterials.filter((material) => {
    return (
      (!selectedGrade ||
        material.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName ===
          `Grade ${selectedGrade}`) &&
      (!selectedSemester ||
        material.grade_subject_semester_id?.semester_id?.semesterName ===
          `Semester ${selectedSemester}`)
    );
  });

  const { grades, semesters } = (() => {
    const grades = new Set();
    const semesters = new Set();

    filteredMaterials.forEach((material) => {
      if (material.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName) {
        grades.add(
          material.grade_subject_semester_id.grade_subject_id.gradeId.gradeName.replace(
            "Grade ",
            ""
          )
        );
      }
      if (material.grade_subject_semester_id?.semester_id?.semesterName) {
        semesters.add(
          material.grade_subject_semester_id.semester_id.semesterName.replace(
            "Semester ",
            ""
          )
        );
      }
    });

    return {
      grades: Array.from(grades).sort(),
      semesters: Array.from(semesters).sort(),
    };
  })();

  // Paginated data
  const paginatedGeneralItems = videoItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedAllMaterials = generalVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedSubjectMaterials = filteredMaterials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Total pages
  const totalPagesAll = Math.ceil(generalVideos.length / itemsPerPage);
  const totalPagesPublic = Math.ceil(videoItems.length / itemsPerPage);
  const totalPagesSubject = Math.ceil(filteredMaterials.length / itemsPerPage);

  // Show full-page loading during initial data fetch
  if (initialLoading) {
    return (
      <div className="mt-16 mb-20 min-h-screen w-[95%] mx-auto bg-white dark:bg-[#13082F]">
        <Loader role="student" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-8 relative font-poppins">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundStars})`,
        }}
      ></div>
      <div
        className="absolute inset-0 bg-no-repeat bg-cover opacity-0 dark:opacity-100 h-screen"
        style={{
          backgroundImage: `url(${backgroundWaves})`,
        }}
      ></div>
      <div className="flex min-h-screen w-[95%] mx-auto mt-20 mb-20 font-poppins relative z-10">
        {/* Sidebar Toggle Button for Small Screens */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-24 left-5 z-50 p-2 bg-gray-100 dark:bg-[#3B1E77] rounded-lg shadow md:hidden text-black dark:text-[#D1D5DB]"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:relative z-40 w-64 bg-gray-100 dark:bg-[#281459] p-6 border border-gray-200 dark:border-[#E0AAEE] h-fit min-h-[75vh] shadow transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 ${i18n.language === 'ar' ? 'md:ml-8' : ''}`}
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">
            {t("libraryVideos.subjectsTitle")}
          </h2>
          <ul>
            <li
              className="flex items-center cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#3B1E77] rounded"
              onClick={() => {
                setSelectedSubject("all");
                setIsSidebarOpen(!isSidebarOpen);
                setTabStates((prev) => ({
                  ...prev,
                  all: {
                    currentPage: 1,
                    selectedGrade: "",
                    selectedSemester: "",
                  },
                }));
              }}
            >
              <input
                type="radio"
                name="subject"
                checked={selectedSubject === "all"}
                onChange={() => setSelectedSubject("all")}
                className="form-radio h-4 w-4 text-[#BC6FFB] dark:text-[#AE45FB] border-[#BC6FFB] dark:border-[#AE45FB] focus:ring-[#BC6FFB] dark:focus:ring-[#AE45FB]"
              />
              <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">
                {t("libraryVideos.all")}
              </span>
            </li>
            <li
              className="flex items-center cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#3B1E77] rounded"
              onClick={() => {
                setSelectedSubject("public");
                setIsSidebarOpen(!isSidebarOpen);
                setTabStates((prev) => ({
                  ...prev,
                  public: {
                    currentPage: 1,
                    selectedGrade: "",
                    selectedSemester: "",
                  },
                }));
              }}
            >
              <input
                type="radio"
                name="subject"
                checked={selectedSubject === "public"}
                onChange={() => setSelectedSubject("public")}
                className="form-radio h-4 w-4 text-[#BC6FFB] dark:text-[#AE45FB] border-[#BC6FFB] dark:border-[#AE45FB] focus:ring-[#BC6FFB] dark:focus:ring-[#AE45FB]"
              />
              <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">
                {t("libraryVideos.public")}
              </span>
            </li>
            {videoSubjects.map((subject, index) => (
              <li
                key={subject.id || index}
                className="flex items-center cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#3B1E77] rounded"
                onClick={() => {
                  setSelectedSubject(subject);
                  setIsSidebarOpen(!isSidebarOpen);
                  setTabStates((prev) => ({
                    ...prev,
                    subject: {
                      currentPage: 1,
                      selectedGrade: "",
                      selectedSemester: "",
                    },
                  }));
                }}
              >
                <input
                  type="radio"
                  name="subject"
                  checked={selectedSubject === subject}
                  onChange={() => setSelectedSubject(subject)}
                  className="form-radio h-4 w-4 text-[#BC6FFB] dark:text-[#AE45FB] border-[#BC6FFB] dark:border-[#AE45FB] focus:ring-[#BC6FFB] dark:focus:ring-[#AE45FB]"
                />
                <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">
                  {subject.subject}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-4/5 pl-8 relative z-10">
          {loading ? (
            <div className="flex items-center justify-center text-center text-gray-500 dark:text-[#D1D5DB] mt-10">
              <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-[#AE45FB] mb-4 mr-5" />
              <p className="text-gray-700 dark:text-[#D1D5DB] text-lg font-semibold">
                {t("libraryVideos.loading")}
              </p>
            </div>
          ) : error ? (
            <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center bg-white dark:bg-[#281459]">
              <CardContent className="text-center p-4 text-gray-600 dark:text-[#D1D5DB]">
                {error}
              </CardContent>
            </Card>
          ) : (
            <div>
              {/* All Library Section */}
              {selectedSubject === "all" && (
                <div>
                  <div className="flex justify-center items-center md:items-start md:justify-start">
                    <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
                      {t("libraryVideos.libraryTitle")}
                      <span className={`absolute bottom-[-9px] h-[4px] w-[90px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] ${
              i18n.language === 'ar' ? 'right-0' : 'left-0'
            }`}></span>
                    </h2>
                  </div>
                  {!loading && generalVideos.length === 0 ? (
                    <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center bg-white dark:bg-[#281459]">
                      <CardContent className="text-center p-4 text-gray-600 dark:text-[#D1D5DB]">
                        {t("libraryVideos.noVideos")}
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                        {paginatedAllMaterials.map((item, index) => {
                          const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                          return (
                            <div key={item._id} className="mx-auto w-60">
                              <div
                                className="relative w-60 h-[350px] cursor-pointer"
                                onClick={() =>
                                  handleItemClick(
                                    item._id,
                                    item.author ? "general" : "material"
                                  )
                                }
                              >
                                <img
                                  src={img1}
                                  alt="imagenotfound"
                                  className="w-60 h-[350px] object-cover"
                                />
                                <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                                  <h2 className="flex items-center justify-center text-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                                    {item.title}
                                  </h2>
                                  {item.item_url ? (
                                    <div className="relative">
                                      <img
                                        src={getYouTubeThumbnail(item.item_url)}
                                        alt="Video thumbnail"
                                        className="w-60 h-[250px] object-cover"
                                        onError={(e) => (e.target.src = img2)}
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <FaPlay className="text-white text-5xl bg-black bg-opacity-50 p-2" />
                                      </div>
                                    </div>
                                  ) : (
                                    <img
                                      src={img2}
                                      alt="No preview available"
                                      className="w-60 h-[250px] object-cover"
                                    />
                                  )}
                                  <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white dark:bg-[#281459] text-center text-black dark:text-[#D1D5DB]">
                                    {globalIndex}
                                  </p>
                                  <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                                    {item.author || item.uploaded_by?.fullName}
                                  </h3>
                                </div>
                              </div>
                              <h2 className="mt-3 font-semibold text-center w-40 mx-auto text-black dark:text-[#D1D5DB]">
                                {item.grade_subject_semester_id?.grade_subject_id
                                  ?.subjectId?.subjectName || "General"}
                              </h2>
                            </div>
                          );
                        })}
                      </div>
                      <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPagesAll}
                        onPageChange={(page) => {
                          setTabStates((prev) => ({
                            ...prev,
                            all: {
                              ...prev.all,
                              currentPage: page,
                            },
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* General Items Section */}
              {selectedSubject === "public" && (
                <div>
                  <div className="flex justify-center items-center md:items-start md:justify-start">
                    <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
                      {t("libraryVideos.publicLibraryTitle")}
                      <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
                    </h2>
                  </div>
                  {videoItems.length === 0 ? (
                    <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center bg-white dark:bg-[#281459]">
                      <CardContent className="text-center p-4 text-gray-600 dark:text-[#D1D5DB]">
                        {t("libraryVideos.noPublicVideos")}
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                        {paginatedGeneralItems.map((item, index) => {
                          const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                          return (
                            <div key={item._id} className="mx-auto w-60">
                              <div
                                className="relative w-60 h-[350px] cursor-pointer"
                                onClick={() => handleItemClick(item._id, "general")}
                              >
                                <img
                                  src={img1}
                                  alt="imagenotfound"
                                  className="w-60 h-[350px] object-cover"
                                />
                                <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 pb-4 pt-2">
                                  <h2 className="flex items-center justify-center text-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                                    {item.title}
                                  </h2>
                                  {item.item_url ? (
                                    <div className="relative">
                                      <img
                                        src={getYouTubeThumbnail(item.item_url)}
                                        alt="Video thumbnail"
                                        className="w-60 h-[250px] object-cover"
                                        onError={(e) => (e.target.src = img2)}
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <FaPlay className="text-white text-5xl bg-black bg-opacity-50 p-2" />
                                      </div>
                                    </div>
                                  ) : (
                                    <img
                                      src={img2}
                                      alt="No preview available"
                                      className="w-60 h-[250px] object-cover"
                                    />
                                  )}
                                  <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white dark:bg-[#281459] text-center text-black dark:text-[#D1D5DB]">
                                    {globalIndex}
                                  </p>
                                  <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                                    {item.author}
                                  </h3>
                                </div>
                              </div>
                              <h2 className="mt-3 font-semibold text-center w-40 mx-auto text-black dark:text-[#D1D5DB]">
                                {t("libraryVideos.general")}
                              </h2>
                            </div>
                          );
                        })}
                      </div>
                      <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPagesPublic}
                        onPageChange={(page) => {
                          setTabStates((prev) => ({
                            ...prev,
                            public: {
                              ...prev.public,
                              currentPage: page,
                            },
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Subject Materials Section */}
              {selectedSubject !== "public" && selectedSubject !== "all" && (
                <div>
                  <div className="flex flex-row justify-between items-center mb-8">
                    <div className="flex justify-center items-center md:items-start md:justify-start">
                      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] relative">
                        {selectedSubject.subject} {t("libraryVideos.materialsTitle")}
                        <span className="absolute left-0 bottom-[-9px] w-[85px] md:w-[155px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
                      </h2>
                    </div>
                    <div className="flex flex-row gap-4 mt-4 sm:mt-0">
                      {/* Grades Select */}
                      <select
                        className="p-2 border rounded bg-white dark:bg-[#3B1E77] text-gray-700 dark:text-[#D1D5DB] border-gray-300 dark:border-[#E0AAEE]"
                        value={selectedGrade}
                        onChange={(e) => {
                          setTabStates((prev) => ({
                            ...prev,
                            subject: {
                              ...prev.subject,
                              selectedGrade: e.target.value,
                            },
                          }));
                        }}
                      >
                        <option value="">{t("libraryVideos.filters.allGrades")}</option>
                        {grades.map((grade) => (
                          <option key={grade} value={grade}>
                            {t("libraryVideos.filters.grade")} {grade}
                          </option>
                        ))}
                      </select>

                      {/* Semesters Select */}
                      <select
                        className="p-2 border rounded bg-white dark:bg-[#3B1E77] text-gray-700 dark:text-[#D1D5DB] border-gray-300 dark:border-[#E0AAEE]"
                        value={selectedSemester}
                        onChange={(e) => {
                          setTabStates((prev) => ({
                            ...prev,
                            subject: {
                              ...prev.subject,
                              selectedSemester: e.target.value,
                            },
                          }));
                        }}
                      >
                        <option value="">
                          {t("libraryVideos.filters.allSemesters")}
                        </option>
                        {semesters.map((semester) => (
                          <option key={semester} value={semester}>
                            {t("libraryVideos.filters.semester")} {semester}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {filteredMaterials.length === 0 ? (
                    <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center bg-white dark:bg-[#281459]">
                      <CardContent className="text-center p-4 text-gray-600 dark:text-[#D1D5DB]">
                        {t("libraryVideos.noMaterials")} {selectedSubject.subject}
                        {t("libraryVideos.noMaterials2")}
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                        {paginatedSubjectMaterials.map((item, index) => {
                          const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                          return (
                            <div key={item._id} className="mx-auto w-60">
                              <div
                                className="relative w-60 h-[350px] cursor-pointer"
                                onClick={() => handleItemClick(item._id, "material")}
                              >
                                <img
                                  src={img1}
                                  alt="imagenotfound"
                                  className="w-60 h-[350px] object-cover"
                                />
                                <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                                  <h2 className="flex items-center justify-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                                    {item.title}
                                  </h2>
                                  {item.item_url ? (
                                    <div className="relative">
                                      <img
                                        src={getYouTubeThumbnail(item.item_url)}
                                        alt="Video thumbnail"
                                        className="w-60 h-[250px] object-cover"
                                        onError={(e) => (e.target.src = img2)}
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <FaPlay className="text-white text-5xl bg-black bg-opacity-50 p-2" />
                                      </div>
                                    </div>
                                  ) : (
                                    <img
                                      src={img2}
                                      alt="No preview available"
                                      className="w-60 h-[250px] object-cover"
                                    />
                                  )}
                                  <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white dark:bg-[#281459] text-center text-black dark:text-[#D1D5DB]">
                                    {globalIndex}
                                  </p>
                                  <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                                    {item.uploaded_by?.fullName}
                                  </h3>
                                </div>
                              </div>
                              <h2 className="mt-3 font-semibold text-center w-40 mx-auto text-black dark:text-[#D1D5DB]">
                                {item.grade_subject_semester_id?.grade_subject_id
                                  ?.subjectId?.subjectName}{" "}
                                -{" "}
                                {item.grade_subject_semester_id?.grade_subject_id
                                  ?.gradeId?.gradeName}
                              </h2>
                            </div>
                          );
                        })}
                      </div>
                      <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPagesSubject}
                        onPageChange={(page) => {
                          setTabStates((prev) => ({
                            ...prev,
                            subject: {
                              ...prev.subject,
                              currentPage: page,
                            },
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryVideosPage;