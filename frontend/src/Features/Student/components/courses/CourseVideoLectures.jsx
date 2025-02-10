import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterials, addToBookmark, fetchBookmarks, fetchSubjects , clearError } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaEye, FaSpinner, FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; 

const VideoSection = () => {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const { materials, bookmarks, loading, error, subjects } = useSelector((state) => state.allSubjectsStudent);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (subjects.length > 0 && subjectId) {
      const subject = subjects.find((subject) => subject.id === subjectId); 
      if (subject) {
        setSubjectName(subject.subjectName);
      }
    }
  }, [subjectId, subjects]);

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchMaterials(subjectId));
      dispatch(fetchBookmarks());
    }
  }, [dispatch, subjectId]);

  
  const handleBookmark = (materialId) => {
    dispatch(addToBookmark(materialId));
  };
  const handleDownload = (materialLink) => {
    window.open(materialLink, "_blank");
  };
  
  const handleViewMaterial = (materialId) => {
    navigate(`/student/material-details/${subjectId}/${materialId}`);
  };
  
  const videoMaterials = materials.filter((material) => material.type === "Video") || [];
  const bookmarkedMaterials = videoMaterials.filter((material) =>
    bookmarks.some((bookmark) => bookmark.material_id._id === material._id)
  );
  const displayedMaterials = activeTab === "bookmarks" ? bookmarkedMaterials : videoMaterials;

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
  

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white md:border-r border-gray-300 p-6 mt-6 md:h-[500px]">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
          {subjectName}
          <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
        </h2>
        <ul className="md:space-y-5 pt-4 flex flex-row gap-3 flex-wrap md:flex-col">
          <li>
            <Button variant="solid" className="md:w-11/12 bg-[#BFBFBF] text-white font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">01</span> Video Lectures
            </Button>
          </li>
          <li>
            <Button
              variant="solid"
              className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg"
              onClick={() => navigate(`/student/allcourses/materials/${subjectId}`)} 
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">02</span> Course Material
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">03</span> Discussion Rooms
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">04</span> Assignments
            </Button>
          </li>
          <li>
            <Button variant="solid" className="md:w-11/12 bg-gray-100 text-gray-700 font-medium py-4 rounded-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] mr-2">05</span> Exams
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:w-3/4 p-4 mt-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Video Lectures</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant={activeTab === "all" ? "outline" : "solid"}
            className={`${
              activeTab === "all"
                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
                : "border border-gray-500 text-gray-800"
            } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("all")}
          >
            All ({videoMaterials.length})
          </Button>
          <Button
            variant={activeTab === "bookmarks" ? "outline" : "solid"}
            className={`${
              activeTab === "bookmarks"
                ? "bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
                : "border border-gray-500 text-gray-800"
            } px-4 md:px-6 py-2 rounded-full`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmarks ({bookmarkedMaterials.length})
          </Button>
        </div>

        {/* Loading Message */}
        {loading && (
          <div className="flex items-center justify-center text-center text-gray-500 mt-10">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
            <p className="text-gray-700 text-lg font-semibold">Loading...</p>
          </div>
        )}

        {/* No Video Materials or Bookmarks Message */}
        {activeTab === "all" && videoMaterials.length === 0 && !loading && !error && (
          <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center">
            <CardContent className="text-center p-4 text-gray-600">
              No video materials available for this subject.
            </CardContent>
          </Card>
        )}
        {activeTab === "bookmarks" && bookmarkedMaterials.length === 0 && !loading && !error && (
          <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[200px] flex items-center justify-center">
            <CardContent className="text-center p-4 text-gray-600">
              You haven't bookmarked any videos yet.
            </CardContent>
          </Card>
        )}

        {/* Lecture Cards */}
        <div className="space-y-4">
          {displayedMaterials.map((material, index) => (
            <Card key={material._id} className="border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="flex flex-wrap justify-between items-center p-4 bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-pink-600 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-gray-800">{material.title}</h2>
                    <p className="text-sm text-gray-600">{material.type}</p>
                    <p className="text-sm text-gray-400">{new Date(material.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-gray-500">
  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full" onClick={() => handleBookmark(material._id)}>
    <FaBookmark className={`text-gray-800 ${material.isBookmarked ? 'text-yellow-500' : ''}`} />
  </div>
  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer" onClick={() => handleViewMaterial(material._id)}>
    <FaEye className="text-blue-600" />
  </div>
  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer" onClick={() => handleDownload(material.file_url)}>
                      <FaDownload className="text-green-600" />
                    </div>
</div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
