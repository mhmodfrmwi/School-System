import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLibraryItemDetails, fetchMaterialDetails, clearDetails } from "../TeacherRedux/LibraryTeacherSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";

const LibraryItemDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemId, type } = useParams();
  const { teacherItemDetails, teacherMaterialDetails, loading, error } = useSelector((state) => state.libraryTeacher);

  useEffect(() => {
    if (type === "general") {
      dispatch(fetchLibraryItemDetails(itemId));
    } else if (type === "material") {
      dispatch(fetchMaterialDetails(itemId));
    }

    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, itemId, type]);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mr-5" />
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200 rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center">
        <CardContent className="text-center p-4 text-gray-600">{error}</CardContent>
      </Card>
    );
  }

  const details = type === "general" ? teacherItemDetails : teacherMaterialDetails;

  const fileUrl = details?.item_url || null;

  const isYouTube = fileUrl?.includes("youtube.com") || fileUrl?.includes("youtu.be");
  const isGoogleDrive = fileUrl?.includes("drive.google.com");
  const isImage = fileUrl?.match(/\.(jpeg|jpg|png|gif)$/i);
  const isPdf = fileUrl?.match(/\.pdf$/i);
  const isVideo = fileUrl?.match(/\.(mp4|mov|avi|mkv)$/i);
  const isGoogleDocs = fileUrl?.includes("docs.google.com");

  const getYouTubeEmbedUrl = (url) => {
    let videoId = "";
    const urlObj = new URL(url);

    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.substring(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v");
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const getGoogleEmbedUrl = (url) => {
    if (url.includes("docs.google.com")) {
      if (url.includes("/edit")) {
        return url.replace("/edit", "/preview");
      }
      if (url.includes("/presentation/d/")) {
        return url.replace("/edit", "/embed?start=false&loop=false&delayms=3000");
      }
    }
    return url;
  };

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-[#117C90]">
          {details?.title || "Item Details"}
        </h1>
        <Button
          variant="solid"
          className="bg-[#117C90] text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Card className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="p-4">
              <table className="w-full table-auto">
                <tbody>
                    {type === "material" && (
                       <tr>
                       <td className="py-2 font-semibold text-gray-700">Description</td>
                       <td className="py-2 text-gray-600">{details?.description || "N/A"}</td>
                     </tr> 
                    )}
                    {type === "general" && (
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">Author</td>
                        <td className="py-2 text-gray-600">{details?.author|| "N/A"}</td>
                      </tr>
                    )}
                    {type === "material" && (
                    <>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">Grade</td>
                        <td className="py-2 text-gray-600">{details?.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">Subject</td>
                        <td className="py-2 text-gray-600">{details?.grade_subject_semester_id?.grade_subject_id?.subjectId?.subjectName || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">Semester</td>
                        <td className="py-2 text-gray-600">{details?.grade_subject_semester_id?.semester_id?.semesterName || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700">Academic Year</td>
                        <td className="py-2 text-gray-600">
                          {`${details?.grade_subject_semester_id?.semester_id?.academicYear_id?.startYear} - ${details?.grade_subject_semester_id?.semester_id?.academicYear_id?.endYear}` || "N/A"}
                        </td>
                      </tr>
                    </>
                  )}
                  
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">Type</td>
                    <td className="py-2 text-gray-600">{details?.type || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">Uploaded By</td>
                    <td className="py-2 text-gray-600">{details?.uploaded_by?.fullName || "Unknown"}</td>
                  </tr>
                  
                  {fileUrl && (
  <tr>
    <td className="py-2 font-semibold text-gray-700">Download</td>
    <td className="py-2">
      <a href={fileUrl} download target="_blank" rel="noopener noreferrer">
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 12l4-4m-4 4l-4-4M4 20h16" />
          </svg>
          Download Material
        </Button>
      </a>
    </td>
  </tr>
)}

                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          {fileUrl && (
            <Card className="border border-gray-200 rounded-xl shadow-sm">
              <CardContent className="p-4">
                {isYouTube ? (
                  <iframe src={getYouTubeEmbedUrl(fileUrl)} width="100%" height="400px" title="YouTube Video" allowFullScreen className="border rounded"></iframe>
                ) : isImage ? (
                  <img src={fileUrl} alt={details.title} className="rounded mb-3" />
                ) : isPdf ? (
                  <iframe src={fileUrl} width="100%" height="400px" title="PDF Document" className="border rounded"></iframe>
                ) : isVideo ? (
                  <video width="100%" controls>
                    <source src={fileUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : isGoogleDocs ? (
                    <iframe
                      src={getGoogleEmbedUrl(fileUrl)}
                      width="100%"
                      height="500px"
                      title="Google Document"
                      className="border rounded"
                    ></iframe>
                  ) : isGoogleDrive ? (
                    <iframe src={fileUrl.replace("/view", "/preview")} width="100%" height="400px" title="Google Drive File"></iframe>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] border border-gray-200 rounded-xl shadow-sm
                    ">
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] " >
                      Download Material
                    </a>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryItemDetailsPage;
