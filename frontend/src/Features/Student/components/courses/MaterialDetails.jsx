import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialDetails } from "../../components/StudentRedux/allSubjectsStudentSlice";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "../../../../ui/Loader";
import subject from "../../../../assets/child.jpg";
import { useTranslation } from 'react-i18next';

const MaterialDetails = () => {
  const { t } = useTranslation();
  const role = sessionStorage.getItem("role");
  const { subjectId, materialId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { materialDetails, loading, error } = useSelector((state) => state.allSubjectsStudent);
  const [mediaLoading, setMediaLoading] = useState(true); // State for media loading

  useEffect(() => {
    dispatch(fetchMaterialDetails({ subjectId, materialId })).then(() => {
      setMediaLoading(false); // Set media loading to false once data is fetched
    });
  }, [dispatch, subjectId, materialId]);

  if (loading) {
    return (
      <div className="mt-16 mb-20 min-h-screen w-[95%] mx-auto">
        <Loader role={role}/>
      </div>
    );
  }

  if (error) {
    Swal.fire({
      title:  t('materialDetails.errors.title'),
      text: error,
      icon: 'error',
      confirmButtonText:  t('materialDetails.errors.confirmButton')
    });
  }

  if (!materialDetails || materialDetails.length === 0) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center text-center mt-16 min-h-[60vh] w-[95%] mb-20 mx-auto font-poppins gap-8">
        <img
          src={subject}
          alt={t('materialDetails.errors.noMaterial.title')}
          className="w-full lg:w-1/2 mb-8 rounded-3xl h-[50vh] lg:h-[70vh] object-cover shadow-lg"
        />
        <div className="flex items-center justify-center w-1/2">
          <Card className="border border-gray-200 rounded-xl shadow-sm w-full max-w-md bg-white/90 backdrop-blur-sm">
            <CardContent className="text-center p-8">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">   {t('materialDetails.errors.noMaterial.title')}</h2>
              <p className="text-gray-600 mb-6">{t('materialDetails.errors.noMaterial.message')}</p>
              <Button
                variant="solid"
                className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(-1)}
              >
               {t('materialDetails.errors.noMaterial.backButton')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
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
    <>
      {materialDetails && (
        <div className="flex flex-wrap font-poppins gap-6 w-[90%] mx-auto mt-16 mb-20">
          {/* Header */}
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]">
              {materialDetails.title}
              <span className="absolute left-0 bottom-[-9px] w-[90px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
            </h1>
            <Button
              variant="solid"
              className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(-1)}
            >
              {t('materialDetails.header.backButton')}
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
                        <td className="py-2 font-semibold text-gray-700">  {t('materialDetails.details.description')}</td>
                        <td className="py-2 text-gray-600">{materialDetails.description}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700"> {t('materialDetails.details.type')}</td>
                        <td className="py-2 text-gray-600">{materialDetails.type}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700"> {t('materialDetails.details.uploadedBy')}</td>
                        <td className="py-2 text-gray-600">{materialDetails.uploaded_by?.fullName || t('materialDetails.details.unknown')}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-gray-700"> {t('materialDetails.details.uploadDate')}</td>
                        <td className="py-2 text-gray-600">{new Date(materialDetails.createdAt).toLocaleString()}</td>
                      </tr>
                      {fileUrl && (
                        <tr>
                          <td className="py-2 font-semibold text-gray-700"> {t('materialDetails.details.download')}</td>
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
                                {t('materialDetails.details.downloadButton')}
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

            {/* Media Preview */}
            <div className="w-full md:w-2/3">
              <Card className="border border-gray-200 rounded-xl shadow-sm">
                <CardContent className="p-4">
                  {mediaLoading ? ( // Show loader while media is loading
                    <div className="flex items-center justify-center h-40">
                      <Loader />
                    </div>
                  ) : fileUrl ? (
                    isYouTube ? (
                      <iframe
                        src={getYouTubeEmbedUrl(fileUrl)}
                        width="100%"
                        height="400px"
                        title={t('materialDetails.mediaTypes.youtube')}
                        allowFullScreen
                        className="border rounded"
                      ></iframe>
                    ) : isImage ? (
                      <img src={fileUrl} alt={materialDetails.title} className="img-fluid rounded mb-3" />
                    ) : isPdf ? (
                      <iframe src={fileUrl} width="100%" height="400px" className="border rounded"  title={t('materialDetails.mediaTypes.pdf')}></iframe>
                    ) : isVideo ? (
                      <video width="100%" controls>
                        <source src={fileUrl} type="video/mp4" />
                        {t('materialDetails.mediaTypes.videoNotSupported')}
                      </video>
                    ) : isGoogleDocs ? (
                      <iframe
                        src={getGoogleEmbedUrl(fileUrl)}
                        width="100%"
                        height="500px"
                        title={t('materialDetails.mediaTypes.googleDoc')}
                        className="border rounded"
                      ></iframe>
                    ) : isGoogleDrive ? (
                      <iframe src={fileUrl.replace("/view", "/preview")} width="100%" height="400px"  title={t('materialDetails.mediaTypes.googleDrive')}></iframe>
                    ) : (
                      <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                       {t('materialDetails.details.downloadButton')}
                      </a>
                    )
                  ) : (
                    <p className="text-gray-500 text-center h-40 flex items-center justify-center">  {t('materialDetails.details.noFile')}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialDetails;