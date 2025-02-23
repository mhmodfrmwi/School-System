import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLibraryItems,
  fetchLibrarySubjects,
  fetchMaterialsForSubject,
  viewLibraryItem,
} from "../TeacherRedux/LibraryTeacherSlice";
import img1 from "../../../../assets/cover22 1.png";
import img2 from "../../../../assets/Rectangle 314.png";
import { Card, CardContent } from "@/components/ui/card";
import { FaSpinner } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Helper function to extract YouTube Video ID
const extractYouTubeVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
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
// Pagination Controls Component
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
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
                currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded`}
            >
              {pageNumber}
              </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

const LibraryTeacherPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teacherGeneralItems, teacherSubjects, teacherMaterials, loading, error } = useSelector(
    (state) => state.libraryTeacher
  );
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [allMaterials, setAllMaterials] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleItemClick = (itemId, type) => {
    dispatch(viewLibraryItem(itemId));
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
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubject === "all") {
      Promise.all(teacherSubjects.map((subject) => dispatch(fetchMaterialsForSubject(subject.id))))
        .then((responses) => {
          const combinedMaterials = responses.map((res) => res.payload).flat();
          setAllMaterials(combinedMaterials);
        })
        .catch((err) => console.error("Error fetching all materials:", err));
    } else if (selectedSubject !== "public" && selectedSubject.id) {
      dispatch(fetchMaterialsForSubject(selectedSubject.id));
    }
  }, [selectedSubject, teacherSubjects, dispatch]);

  const displayedMaterials = selectedSubject === "all" ? allMaterials : teacherMaterials;

  const filteredMaterials = displayedMaterials.filter((book) => {
    return (
      (!selectedGrade || book.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName === `Grade ${selectedGrade}`) &&
      (!selectedSemester || book.grade_subject_semester_id?.semester_id?.semesterName === `Semester ${selectedSemester}`)
    );
  });

  const grades = [...new Set(filteredMaterials.map((item) => item.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName.replace("Grade ", "")))].sort();
  const semesters = [...new Set(filteredMaterials.map((item) => item.grade_subject_semester_id?.semester_id?.semesterName.replace("Semester ", "")))].sort();

  // Combine generalItems and filteredMaterials for "All" section
  const combinedItemsForAll = selectedSubject === "all" ? [...teacherGeneralItems, ...filteredMaterials] : [];

  // Paginated data for each tab
  const paginatedGeneralItems = teacherGeneralItems.slice((currentPagePublic - 1) * itemsPerPage, currentPagePublic * itemsPerPage);
  const paginatedAllMaterials = combinedItemsForAll.slice((currentPageAll - 1) * itemsPerPage, currentPageAll * itemsPerPage);
  const paginatedSubjectMaterials = filteredMaterials.slice((currentPageSubject - 1) * itemsPerPage, currentPageSubject * itemsPerPage);

  // Total pages for each tab
  const totalPagesAll = Math.ceil(combinedItemsForAll.length / itemsPerPage);
  const totalPagesPublic = Math.ceil(teacherGeneralItems.length / itemsPerPage);
  const totalPagesSubject = Math.ceil(filteredMaterials.length / itemsPerPage);

  return (
    <div className="flex min-h-screen w-[95%] mx-auto mt-20 mb-20 font-poppins">
      {/* Sidebar Toggle Button for Small Screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-24 left-5 z-50 p-2 bg-gray-100 rounded-lg shadow md:hidden"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 w-64 bg-gray-100 p-6 border h-fit min-h-[75vh] shadow transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
          Subjects
        </h2>
        <ul>
          <li
            className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded"
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
              className="form-radio h-4 w-4 text-[#BC6FFB] border-[#BC6FFB] focus:ring-[#BC6FFB]"
            />
            <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
              All
            </span>
          </li>
          <li
            className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded"
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
              className="form-radio h-4 w-4 text-[#BC6FFB] border-[#BC6FFB] focus:ring-[#BC6FFB]"
            />
            <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
              Public
            </span>
          </li>
          {teacherSubjects.map((subject, index) => (
            <li
              key={subject.id || index}
              className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded"
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
                className="form-radio h-4 w-4 text-[#BC6FFB] border-[#BC6FFB] focus:ring-[#BC6FFB]"
              />
              <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
                {subject.subject}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 pl-8">
        {loading ? (
          <div className="flex items-center justify-center text-center text-gray-500 mt-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
            <p className="text-gray-700 text-lg font-semibold">Loading...</p>
          </div>
        ) : error ? (
          <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center">
            <CardContent className="text-center p-4 text-gray-600">{error}</CardContent>
          </Card>
        ) : (
          <div>
            {/* All Library Section */}
            {selectedSubject === "all" && (
              <div>
                <div className="flex justify-center items-center md:items-start md:justify-start">
                  <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
                    Library
                    <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
                  </h2>
                </div>
                {combinedItemsForAll.length === 0 ? (
                  <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center">
                    <CardContent className="text-center p-4 text-gray-600">
                      No books available at the moment.
                    </CardContent>
                  </Card>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                      {paginatedAllMaterials.map((item, index) => {
                        const globalIndex = (currentPageAll - 1) * itemsPerPage + index + 1;
                        return (
                          <div key={item._id} className="mx-auto w-60">
                            <div className="relative w-60 h-[350px] cursor-pointer" onClick={() => handleItemClick(item._id, item.author ? "general" : "material")}>
                              <img src={img1} alt="imagenotfound" className="w-60 h-[350px] object-cover" />
                              <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                                <h2 className="flex items-center justify-center text-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                                  {item.title}
                                </h2>
                                {item.type === "Video" ? (
                                  item.item_url ? (
                                    <div className="relative">
                                      <img
                                        src={getYouTubeThumbnail(item.item_url)}
                                        alt="Video thumbnail"
                                        className="w-60 h-[250px] object-cover"
                                        onError={(e) => (e.target.src = img2)} // Fallback to default image
                                      />
                                      {/* Play Icon */}
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <FaPlay className="text-white text-5xl bg-black bg-opacity-50 p-2" />
                                      </div>
                                    </div>
                                  ) : (
                                    <img src={img2} alt="No preview available" className="w-60 h-[250px] object-cover" />
                                  )
                                ) : (
                                  item.item_url ? (
                                    <img
                                      src={getFirstPageAsImage(item.item_url)}
                                      alt="First page preview"
                                      className="w-60 h-[250px] object-cover"
                                      onError={(e) => (e.target.src = img2)} // Fallback to default image
                                    />
                                  ) : (
                                    <img src={img2} alt="No preview available" className="w-60 h-[250px] object-cover" />
                                  )
                                )}
                                <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white text-center text-black">
                                  {globalIndex}
                                </p>
                                <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                                  {item.author || item.type}
                                </h3>
                              </div>
                            </div>
                            <h2 className="mt-3 font-semibold text-center w-40 mx-auto">
                              {item.grade_subject_semester_id?.grade_subject_id?.subjectId?.subjectName || "General"}
                            </h2>
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
                <div className="flex justify-center items-center md:items-start md:justify-start">
                  <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
                    Public Library
                    <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
                  </h2>
                </div>
                {teacherGeneralItems.length === 0 ? (
                  <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center">
                    <CardContent className="text-center p-4 text-gray-600">
                      No books available in the public library at the moment.
                    </CardContent>
                  </Card>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                      {paginatedGeneralItems.map((item, index) => {
                        const globalIndex = (currentPagePublic - 1) * itemsPerPage + index + 1;
                        return (
                          <div key={item._id} className="mx-auto w-60">
                            <div className="relative w-60 h-[350px] cursor-pointer" onClick={() => handleItemClick(item._id, "general")}>
                              <img src={img1} alt="imagenotfound" className="w-60 h-[350px] object-cover" />
                              <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 pb-4 pt-2">
                                <h2 className="flex items-center justify-center text-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                                  {item.title}
                                </h2>
                                {item.type === "Video" ? (
                                  item.item_url ? (
                                    <div className="relative">
                                      <img
                                        src={getYouTubeThumbnail(item.item_url)}
                                        alt="Video thumbnail"
                                        className="w-60 h-[250px] object-cover"
                                        onError={(e) => (e.target.src = img2)} // Fallback to default image
                                      />
                                      {/* Play Icon */}
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <FaPlay className="text-white text-5xl bg-black bg-opacity-50 p-2" />
                                      </div>
                                    </div>
                                  ) : (
                                    <img src={img2} alt="No preview available" className="w-60 h-[250px] object-cover" />
                                  )
                                ) : (
                                  item.item_url ? (
                                    <img
                                      src={getFirstPageAsImage(item.item_url)}
                                      alt="First page preview"
                                      className="w-60 h-[250px] object-cover"
                                      onError={(e) => (e.target.src = img2)} // Fallback to default image
                                    />
                                  ) : (
                                    <img src={img2} alt="No preview available" className="w-60 h-[250px] object-cover" />
                                  )
                                )}
                                <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white text-center text-black">
                                  {globalIndex}
                                </p>
                                <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                                  {item.author}
                                </h3>
                              </div>
                            </div>
                            <h2 className="mt-3 font-semibold text-center w-40 mx-auto">General</h2>
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
                <div className="flex flex-row justify-between items-center mb-8">
                  <div className="flex justify-center items-center md:items-start md:justify-start">
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
                      {selectedSubject.subject} Materials
                      <span className="absolute left-0 bottom-[-9px] w-[85px] md:w-[155px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
                    </h2>
                  </div>
                  <div className="flex flex-row gap-4 mt-4 sm:mt-0">
                    {/* Grades Select */}
                    <select
                      className="p-2 border rounded"
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
                      className="p-2 border rounded"
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
                  <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center">
                    <CardContent className="text-center p-4 text-gray-600">
                      No materials available for {selectedSubject.subject} at the moment.
                    </CardContent>
                  </Card>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                      {paginatedSubjectMaterials.map((item, index) => {
                        const globalIndex = (currentPageSubject - 1) * itemsPerPage + index + 1;
                        return (
                          <div key={item._id} className="mx-auto w-60">
                            <div className="relative w-60 h-[350px] cursor-pointer" onClick={() => handleItemClick(item._id, "material")}>
                              <img src={img1} alt="imagenotfound" className="w-60 h-[350px] object-cover" />
                              <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                                <h2 className="flex items-center justify-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                                  {item.title}
                                </h2>
                                {item.type === "Video" ? (
                                  item.item_url ? (
                                    <div className="relative">
                                      <img
                                        src={getYouTubeThumbnail(item.item_url)}
                                        alt="Video thumbnail"
                                        className="w-60 h-[250px] object-cover"
                                        onError={(e) => (e.target.src = img2)} // Fallback to default image
                                      />
                                      {/* Play Icon */}
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <FaPlay className="text-white text-5xl bg-black bg-opacity-50 p-2" />
                                      </div>
                                    </div>
                                  ) : (
                                    <img src={img2} alt="No preview available" className="w-60 h-[250px] object-cover" />
                                  )
                                ) : (
                                  item.item_url ? (
                                    <img
                                      src={getFirstPageAsImage(item.item_url)}
                                      alt="First page preview"
                                      className="w-60 h-[250px] object-cover"
                                      onError={(e) => (e.target.src = img2)} // Fallback to default image
                                    />
                                  ) : (
                                    <img src={img2} alt="No preview available" className="w-60 h-[250px] object-cover" />
                                  )
                                )}
                                <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white text-center text-black">
                                  {globalIndex}
                                </p>
                                <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                                  {item.type}
                                </h3>
                              </div>
                            </div>
                            <h2 className="mt-3 font-semibold text-center w-40 mx-auto">
                              {item.grade_subject_semester_id?.grade_subject_id?.subjectId?.subjectName} -{" "}
                              {item.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName}
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
  );
};

export default LibraryTeacherPage;