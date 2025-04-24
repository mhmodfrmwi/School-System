import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLibraryItems,
  fetchLibrarySubjects,
  fetchMaterialsForSubject,
  fetchAllGeneralMaterialVideoPdf,
} from "../TeacherRedux/LibraryTeacherSlice";
import img1 from "../../../../assets/cover22 1.png";
import img2 from "../../../../assets/Rectangle 314.png";
import { Card, CardContent } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// Helper function to extract YouTube Video ID
const extractYouTubeVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  const VideoId = extractYouTubeVideoId(url);
  return VideoId ? `https://img.youtube.com/vi/${VideoId}/0.jpg` : img2;
};

// Helper function to extract file ID
const extractFileId = (url) => {
  const match = url.match(/\/file\/d\/([^/]+)/);
  return match ? match[1] : null;
};

const extractFileIdForGoogleSlides = (url) => {
  const match = url.match(/presentation\/d\/([^/]+)/);
  return match ? match[1] : null;
};

// Helper function to get the first page as an image
const getFirstPageAsImage = (url) => {
  if (!url) return img2;

  // Handle Google Drive Files
  if (url.includes("drive.google.com/file/d/")) {
    const fileId = extractFileId(url);
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h350`;
    }
  }

  // Handle Google Slides
  if (url.includes("docs.google.com/presentation/d/")) {
    const fileId = extractFileIdForGoogleSlides(url);
    if (fileId) {
      return `https://docs.google.com/presentation/d/${fileId}/export/png?id=${fileId}&pageid=p1`;
    }
  }

  // Handle PDFs - Show first page as an image
  if (url.endsWith(".pdf")) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true&a=bi&pagenumber=1`;
  }

  // Handle Images - Just return the image URL
  if (url.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
    return url;
  }

  return img2; // Fallback image
};

// Pagination Controls Component
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-6 flex items-center justify-center font-poppins">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
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
            className={`mx-1 px-4 py-2 ${
              currentPage === pageNumber
                ? "bg-[#117C90] text-white dark:bg-DarkManager"
                : "bg-gray-200"
            } rounded`}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

const LibraryTeacherPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t,i18n } = useTranslation();

  const {
    allGeneralMaterialVideoPdf,
    teacherGeneralItems,
    teacherSubjects,
    teacherMaterials,
    loading,
    error,
  } = useSelector((state) => state.libraryTeacher);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (itemId, type) => {
    navigate(`/teacher/library/${type}/${itemId}`);
  };

  // Pagination states for each tab
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPagePublic, setCurrentPagePublic] = useState(1);
  const [currentPageSubject, setCurrentPageSubject] = useState(1);

  const itemsPerPage = 4; // Number of items per page (changed to 4)

  useEffect(() => {
    dispatch(fetchLibraryItems());
    dispatch(fetchLibrarySubjects());
    dispatch(fetchAllGeneralMaterialVideoPdf());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubject === "all") {
    dispatch(fetchAllGeneralMaterialVideoPdf());
    } else if (selectedSubject !== "public" && selectedSubject.id) {
      dispatch(fetchMaterialsForSubject(selectedSubject.id));
    }
  }, [selectedSubject, teacherSubjects, dispatch]);

  const displayedMaterials =
    selectedSubject === "all" ? allGeneralMaterialVideoPdf : teacherMaterials;

  const filteredMaterials = displayedMaterials.filter((book) => {
    return (
      (!selectedGrade ||
        book.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName ===
          `Grade ${selectedGrade}`) &&
      (!selectedSemester ||
        book.grade_subject_semester_id?.semester_id?.semesterName ===
          `Semester ${selectedSemester}`)
    );
  });

  const grades = [
    ...new Set(
      filteredMaterials.map((item) =>
        item.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName.replace(
          "Grade ",
          "",
        ),
      ),
    ),
  ].sort();
  const semesters = [
    ...new Set(
      filteredMaterials.map((item) =>
        item.grade_subject_semester_id?.semester_id?.semesterName.replace(
          "Semester ",
          "",
        ),
      ),
    ),
  ].sort();

  

  // Paginated data for each tab
  const paginatedGeneralItems = teacherGeneralItems.slice(
    (currentPagePublic - 1) * itemsPerPage,
    currentPagePublic * itemsPerPage,
  );
  const paginatedAllMaterials = allGeneralMaterialVideoPdf.slice(
    (currentPageAll - 1) * itemsPerPage,
    currentPageAll * itemsPerPage,
  );
  const paginatedSubjectMaterials = filteredMaterials.slice(
    (currentPageSubject - 1) * itemsPerPage,
    currentPageSubject * itemsPerPage,
  );

  // Total pages for each tab
  const totalPagesAll = Math.ceil(allGeneralMaterialVideoPdf.length / itemsPerPage);
  const totalPagesPublic = Math.ceil(teacherGeneralItems.length / itemsPerPage);
  const totalPagesSubject = Math.ceil(filteredMaterials.length / itemsPerPage);

  return (
    <>
      <div className="m-auto mb-6 grid w-[90%] grid-cols-1 gap-2 rounded-3xl font-poppins bg-gray-100 md:grid-cols-3">
        <button
          className="flex cursor-pointer items-center justify-center rounded-t-3xl bg-[#117C90] dark:bg-DarkManager py-2 font-medium text-white focus:outline-none md:rounded-3xl"
          onClick={() => navigate("/teacher/teacher-library")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-white text-[#117C90]">
            1
          </span>
          {t('libraryt.Library')}
          </button>

        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF]  py-2 font-medium text-[#117C90] dark:text-DarkManager focus:outline-none"
          onClick={() => navigate("/teacher/all-subjects-library")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] dark:bg-DarkManager text-white">
            2
          </span>
          {t('libraryt.TeacherLibrary')}
          </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] py-2 font-medium text-[#117C90] dark:text-DarkManager focus:outline-none"
          onClick={() => navigate("/teacher/items-in-library")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] dark:bg-DarkManager text-white">
            3
          </span>
          {t('libraryt.GeneralLibrary')}
          </button>
      </div>

      <div className="mx-auto mb-20 mt-20 flex min-h-screen w-[95%] font-poppins">
        {/* Sidebar Toggle Button for Small Screens */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed left-6 top-24 z-50 rounded-lg bg-gray-100 p-2 shadow md:hidden"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed z-40 mt-[-185px] h-fit min-h-[75vh] w-64 transform border bg-gray-100  p-6 shadow transition-transform duration-300 md:relative md:mt-[0px] ${
            isSidebarOpen ? "translate-x-0" : "ms-[-40px] -translate-x-full"
          } md:translate-x-0 ${i18n.language === 'ar' ? 'md:ml-8' : ''}`}
        >
          
          <h2 className="mb-4 text-xl font-bold text-[#117C90] dark:text-DarkManager">
          {t('libraryVideos.subjectsTitle')}
          </h2>
          <ul>
            <li
              className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-200 dark:text-DarkManager"
              onClick={() => {
                setSelectedSubject("all");
                setCurrentPageAll(1); // Reset pagination for "All" tab
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <input
                type="radio"
                name="subject"
                checked={selectedSubject === "all"}
                onChange={() => setSelectedSubject("all")}
                className="form-radio h-4 w-4 border-[#117C90] text-[#117C90] focus:ring-[#117C90] dark:text-DarkManager dark:focus:ring-DarkManager" 
              />
              <span className="ml-2 text-xl text-[#117C90] dark:text-DarkManager">
              {t('libraryVideos.all')}
              </span>
            </li>
            <li
              className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-200"
              onClick={() => {
                setSelectedSubject("public");
                setCurrentPagePublic(1); // Reset pagination for "Public" tab
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <input
                type="radio"
                name="subject"
                checked={selectedSubject === "public"}
                onChange={() => setSelectedSubject("public")}
                className="form-radio h-4 w-4 border-[#117C90] text-[#117C90] focus:ring-[#117C90] dark:text-DarkManager dark:focus:ring-DarkManager"
              />
              <span className="ml-2 text-xl text-[#117C90] dark:text-DarkManager">
              {t('libraryVideos.public')}
              </span>
            </li>
            {teacherSubjects.map((subject, index) => (
              <li
                key={subject.id || index}
                className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-200"
                onClick={() => {
                  setSelectedSubject(subject);
                  setCurrentPageSubject(1); // Reset pagination for "Subject" tab
                  setIsSidebarOpen(!isSidebarOpen);
                }}
              >
                <input
                  type="radio"
                  name="subject"
                  checked={selectedSubject === subject}
                  onChange={() => setSelectedSubject(subject)}
                  className="form-radio h-4 w-4 border-[#117C90] text-[#117C90] focus:ring-[#117C90] dark:text-DarkManager dark:focus:ring-DarkManager"
                />
                <span className="ml-2 text-xl text-[#117C90] dark:text-DarkManager">
                  {subject.subject}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full pl-8">
          {loading ? (
            <div className="mt-10 flex items-center justify-center text-center text-gray-500">
              <FaSpinner className="mb-4 mr-5 animate-spin text-4xl text-[#117C90]" />
              <p className="text-lg font-semibold text-gray-700">Loading...</p>
            </div>
          ) : error ? (
            <Card className="mb-6 flex h-[450px] items-center justify-center rounded-xl border border-gray-200 shadow-sm">
              <CardContent className="p-4 text-center text-gray-600">
                {error}
              </CardContent>
            </Card>
          ) : (
            <div>
              {/* All Library Section */}
              {selectedSubject === "all" && (
                <div>
                  <div className="flex items-center justify-center md:items-start md:justify-start">
                    <h2 className="relative mb-8 text-3xl font-bold text-[#117C90] dark:text-DarkManager">
                      Library
                      <span className="absolute bottom-[-9px] left-0 h-[4px] w-[85px] rounded-t-full bg-[#117C90] dark:bg-DarkManager"></span>
                    </h2>
                  </div>
                  {allGeneralMaterialVideoPdf.length === 0 ? (
                    <Card className="mb-6 flex h-[450px] items-center justify-center rounded-xl border border-gray-200 shadow-sm">
                      <CardContent className="p-4 text-center text-gray-600">
                        No books available at the moment.
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {paginatedAllMaterials.map((item, index) => {
                          const globalIndex =
                            (currentPageAll - 1) * itemsPerPage + index + 1;
                          return (
                            <div key={item._id} className="mx-auto w-56">
                              <div
                                className="relative h-[350px] w-56 cursor-pointer"
                                onClick={() =>
                                  handleItemClick(
                                    item._id,
                                    item.author ? "general" : "material",
                                  )
                                }
                              >
                                <img
                                  src={img1}
                                  alt="imagenotfound"
                                  className="h-[350px] w-60 object-cover"
                                />
                                <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                                  <h2 className="line-clamp-2 flex h-[50px] items-center justify-center pb-2 text-center text-[15px] font-semibold text-white">
                                    {item.title}
                                  </h2>
                                  {item.type === "Video" ? (
                                    item.item_url ? (
                                      <div className="relative">
                                        <img
                                          src={getYouTubeThumbnail(
                                            item.item_url,
                                          )}
                                          alt="Video thumbnail"
                                          className="h-[250px] w-60 object-cover"
                                          onError={(e) => (e.target.src = img2)} // Fallback to default image
                                        />
                                        {/* Play Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <FaPlay className="bg-black bg-opacity-50 p-2 text-5xl text-white" />
                                        </div>
                                      </div>
                                    ) : (
                                      <img
                                        src={img2}
                                        alt="No preview available"
                                        className="h-[250px] w-60 object-cover"
                                      />
                                    )
                                  ) : item.item_url ? (
                                    <img
                                      src={getFirstPageAsImage(item.item_url)}
                                      alt="First page preview"
                                      className="h-[250px] w-60 object-cover"
                                      onError={(e) => (e.target.src = img2)} // Fallback to default image
                                    />
                                  ) : (
                                    <img
                                      src={img2}
                                      alt="No preview available"
                                      className="h-[250px] w-60 object-cover"
                                    />
                                  )}
                                  <p className="z-15 absolute left-28 top-[285px] mx-auto size-5 rounded-full bg-white text-center text-black">
                                    {globalIndex}
                                  </p>
                                  <h3 className="line-clamp-1 flex h-[40px] items-center justify-center pt-5 text-[13px] text-white">
                                    {item.author || item.type}
                                  </h3>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-center gap-4">
                                <h2 className="text-sm font-semibold dark:text-DarkManager">
                                {item.grade_subject_semester_id?.grade_subject_id?.subjectId?.subjectName || "General"}
                                </h2>

  <span className="inline-flex items-center rounded-full bg-[#117C90] dark:bg-DarkManager px-2.5 py-0.5 text-xs font-medium text-white">
    👁️ {item.views} Views
  </span>
</div>



                            </div>
                          );
                        })}
                      </div>
                      <PaginationControls
                        currentPage={currentPageAll}
                        totalPages={totalPagesAll}
                        onPageChange={setCurrentPageAll}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* General Items Section */}
              {selectedSubject === "public" && (
                <div>
                  <div className="flex items-center justify-center md:items-start md:justify-start">
                    <h2 className="relative mb-8 text-3xl font-bold text-[#117C90] dark:text-DarkManager">
                      Public Library
                      <span className="absolute bottom-[-9px] left-0 h-[4px] w-[85px] rounded-t-full bg-[#117C90] dark:bg-DarkManager"></span>
                    </h2>
                  </div>
                  {teacherGeneralItems.length === 0 ? (
                    <Card className="mb-6 flex h-[450px] items-center justify-center rounded-xl border border-gray-200 shadow-sm">
                      <CardContent className="p-4 text-center text-gray-600">
                        No books available in the public library at the moment.
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {paginatedGeneralItems.map((item, index) => {
                          const globalIndex =
                            (currentPagePublic - 1) * itemsPerPage + index + 1;
                          return (
                            <div key={item._id} className="mx-auto w-56">
                              <div
                                className="relative h-[350px] w-56 cursor-pointer"
                                onClick={() =>
                                  handleItemClick(item._id, "general")
                                }
                              >
                                <img
                                  src={img1}
                                  alt="imagenotfound"
                                  className="h-[350px] w-60 object-cover"
                                />
                                <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 pb-4 pt-2">
                                  <h2 className="line-clamp-2 flex h-[50px] items-center justify-center pb-2 text-center text-[15px] font-semibold text-white">
                                    {item.title}
                                  </h2>
                                  {item.type === "Video" ? (
                                    item.item_url ? (
                                      <div className="relative">
                                        <img
                                          src={getYouTubeThumbnail(
                                            item.item_url,
                                          )}
                                          alt="Video thumbnail"
                                          className="h-[250px] w-60 object-cover"
                                          onError={(e) => (e.target.src = img2)} // Fallback to default image
                                        />
                                        {/* Play Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <FaPlay className="bg-black bg-opacity-50 p-2 text-5xl text-white" />
                                        </div>
                                      </div>
                                    ) : (
                                      <img
                                        src={img2}
                                        alt="No preview available"
                                        className="h-[250px] w-60 object-cover"
                                      />
                                    )
                                  ) : item.item_url ? (
                                    <img
                                      src={getFirstPageAsImage(item.item_url)}
                                      alt="First page preview"
                                      className="h-[250px] w-60 object-cover"
                                      onError={(e) => (e.target.src = img2)} // Fallback to default image
                                    />
                                  ) : (
                                    <img
                                      src={img2}
                                      alt="No preview available"
                                      className="h-[250px] w-60 object-cover"
                                    />
                                  )}
                                  <p className="z-15 absolute left-28 top-[285px] mx-auto size-5 rounded-full bg-white text-center text-black">
                                    {globalIndex}
                                  </p>
                                  <h3 className="line-clamp-1 flex h-[40px] items-center justify-center pt-5 text-[13px] text-white">
                                    {item.author}
                                  </h3>
                                </div>
                              </div>
                              <h2 className="mx-auto mt-3 w-40 text-center font-semibold dark:text-DarkManager">
                                General
                              </h2>
                            </div>
                          );
                        })}
                      </div>
                      <PaginationControls
                        currentPage={currentPagePublic}
                        totalPages={totalPagesPublic}
                        onPageChange={setCurrentPagePublic}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Subject Materials Section */}
              {selectedSubject !== "public" && selectedSubject !== "all" && (
                <div>
                  <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
                    <div className="flex items-center justify-center md:items-start md:justify-start">
                      <h2 className="relative text-2xl font-bold text-[#117C90] md:text-3xl dark:text-DarkManager">
                        {selectedSubject.subject} Materials
                        <span className="absolute bottom-[-9px] left-0 h-[4px] w-[85px] rounded-t-full bg-[#117C90] dark:bg-DarkManager md:w-[155px]"></span>
                      </h2>
                    </div>
                    <div className="mt-4 flex flex-row gap-4 sm:mt-0">
                      {/* Grades Select */}
                      <select
                        className="rounded border p-2 dark:text-DarkManager"
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                      >
                        <option value="">All Grades</option>
                        {grades.map((grade) => (
                          <option key={grade} value={grade}>
                            Grade {grade}
                          </option>
                        ))}
                      </select>

                      {/* Semesters Select */}
                      <select
                        className="rounded border p-2 dark:text-DarkManager"
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                      >
                        <option value="">All Semesters</option>
                        {semesters.map((semester) => (
                          <option key={semester} value={semester}>
                            Semester {semester}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {filteredMaterials.length === 0 ? (
                    <Card className="mb-6 flex h-[450px] items-center justify-center rounded-xl border border-gray-200 shadow-sm">
                      <CardContent className="p-4 text-center text-gray-600">
                        No materials available for {selectedSubject.subject} at
                        the moment.
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {paginatedSubjectMaterials.map((item, index) => {
                          const globalIndex =
                            (currentPageSubject - 1) * itemsPerPage + index + 1;
                          return (
                            <div key={item._id} className="mx-auto w-56">
                              <div
                                className="relative h-[350px] w-56 cursor-pointer"
                                onClick={() =>
                                  handleItemClick(item._id, "material")
                                }
                              >
                                <img
                                  src={img1}
                                  alt="imagenotfound"
                                  className="h-[350px] w-60 object-cover"
                                />
                                <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                                  <h2 className="line-clamp-2 flex h-[50px] items-center justify-center pb-2 text-[15px] font-semibold text-white">
                                    {item.title}
                                  </h2>
                                  {item.type === "Video" ? (
                                    item.item_url ? (
                                      <div className="relative">
                                        <img
                                          src={getYouTubeThumbnail(
                                            item.item_url,
                                          )}
                                          alt="Video thumbnail"
                                          className="h-[250px] w-60 object-cover"
                                          onError={(e) => (e.target.src = img2)} // Fallback to default image
                                        />
                                        {/* Play Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <FaPlay className="bg-black bg-opacity-50 p-2 text-5xl text-white" />
                                        </div>
                                      </div>
                                    ) : (
                                      <img
                                        src={img2}
                                        alt="No preview available"
                                        className="h-[250px] w-60 object-cover"
                                      />
                                    )
                                  ) : item.item_url ? (
                                    <img
                                      src={getFirstPageAsImage(item.item_url)}
                                      alt="First page preview"
                                      className="h-[250px] w-60 object-cover"
                                      onError={(e) => (e.target.src = img2)} // Fallback to default image
                                    />
                                  ) : (
                                    <img
                                      src={img2}
                                      alt="No preview available"
                                      className="h-[250px] w-60 object-cover"
                                    />
                                  )}
                                  <p className="z-15 absolute left-28 top-[285px] mx-auto size-5 rounded-full bg-white text-center text-black">
                                    {globalIndex}
                                  </p>
                                  <h3 className="line-clamp-1 flex h-[40px] items-center justify-center pt-5 text-[13px] text-white">
                                    {item.type}
                                  </h3>
                                </div>
                              </div>
                              <h2 className="mx-auto mt-3 w-40 text-center font-semibold dark:text-DarkManager">
                                {
                                  item.grade_subject_semester_id
                                    ?.grade_subject_id?.subjectId?.subjectName
                                }{" "}
                                -{" "}
                                {
                                  item.grade_subject_semester_id
                                    ?.grade_subject_id?.gradeId?.gradeName
                                }
                              </h2>
                            </div>
                          );
                        })}
                      </div>
                      <PaginationControls
                        currentPage={currentPageSubject}
                        totalPages={totalPagesSubject}
                        onPageChange={setCurrentPageSubject}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LibraryTeacherPage;
