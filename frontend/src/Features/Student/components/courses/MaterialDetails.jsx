import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialDetails } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MaterialDetails = () => {
  const { subjectId, materialId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materialDetails, loading, error } = useSelector((state) => state.allSubjectsStudent);

  useEffect(() => {
    dispatch(fetchMaterialDetails({ subjectId, materialId }));
  }, [dispatch, subjectId, materialId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-500 mt-10">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!materialDetails) {
    return <p className="text-gray-500 text-center">No material details available.</p>;
  }

  // Get file URL
  const fileUrl = materialDetails?.file_url
    ? materialDetails.file_url.startsWith("http")
      ? materialDetails.file_url
      : `http://localhost:4000${materialDetails.file_url}`
    : null;

  // Detect file type
  const isImage = fileUrl?.match(/\.(jpeg|jpg|png|gif)$/i);
  const isPdf = fileUrl?.match(/\.pdf$/i);
  const isVideo = fileUrl?.match(/\.(mp4|mov|avi|mkv)$/i);
  const isYouTube = fileUrl?.includes("youtube.com") || fileUrl?.includes("youtu.be");
  const isGoogleDocs = fileUrl?.includes("docs.google.com");
  const isGoogleDrive = fileUrl?.includes("drive.google.com");

  // Convert YouTube URL to embed URL
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

  // Convert Google Docs, Sheets, and Slides URLs for embedding
  const getGoogleEmbedUrl = (url) => {
    if (url.includes("docs.google.com")) {
      if (url.includes("/edit")) {
        return url.replace("/edit", "/preview"); // For Docs and Sheets
      }
      if (url.includes("/presentation/d/")) {
        return url.replace("/edit", "/embed?start=false&loop=false&delayms=3000"); // For Slides
      }
    }
    return url;
  };

  return (
    <div className="flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
          {materialDetails.title}
        </h1>
        <Button
          variant="solid"
          className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Material Details */}
        <div className="w-full md:w-1/3">
          <Card className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="p-4">
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">Description</td>
                    <td className="py-2 text-gray-600">{materialDetails.description}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">Type</td>
                    <td className="py-2 text-gray-600">{materialDetails.type}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">Uploaded By</td>
                    <td className="py-2 text-gray-600">{materialDetails.uploaded_by}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">Upload Date</td>
                    <td className="py-2 text-gray-600">{new Date(materialDetails.createdAt).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-gray-700">Size</td>
                    <td className="py-2 text-gray-600">{materialDetails.size || "Unknown"}</td>
                  </tr>
                  {fileUrl && (
                    <tr>
                      <td className="py-2 font-semibold text-gray-700">Download</td>
                      <td className="py-2">
                        <a href={fileUrl} download className="btn btn-success">
                          Download Material
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Media Preview */}
        <div className="w-full md:w-2/3">
          <Card className="border border-gray-200 rounded-xl shadow-sm">
            <CardContent className="p-4">
              {fileUrl ? (
                isYouTube ? (
                  <iframe
                    src={getYouTubeEmbedUrl(fileUrl)}
                    width="100%"
                    height="400px"
                    title="YouTube Video"
                    allowFullScreen
                    className="border rounded"
                  ></iframe>
                ) : isImage ? (
                  <img src={fileUrl} alt={materialDetails.title} className="img-fluid rounded mb-3" />
                ) : isPdf ? (
                  <iframe src={fileUrl} width="100%" height="400px" className="border rounded" title="PDF Document"></iframe>
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
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Download Material
                  </a>
                )
              ) : (
                <p className="text-gray-500">No file available for this material.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
