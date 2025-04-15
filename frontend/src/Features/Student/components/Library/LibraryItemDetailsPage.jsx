import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchLibraryItemDetails,
  fetchMaterialDetails,
  clearDetails,
} from "../StudentRedux/libraryStudentSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "../../../../ui/Loader";
import { useTranslation } from "react-i18next";
import backgroundWaves from "../../../../assets/StudentIcon/bg-color2.png";
import backgroundStars from "../../../../assets/StudentIcon/bg-color1.png";

const LibraryItemDetailsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { itemId, type } = useParams();
  const { itemDetails, materialDetails, loading, error } = useSelector(
    (state) => state.libraryStudent
  );

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
      <div className="mt-16 mb-20 min-h-screen w-[95%] mx-auto bg-white dark:bg-[#13082F]">
        <Loader role="student" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm mb-6 h-[450px] flex items-center justify-center bg-white dark:bg-[#281459]">
        <CardContent className="text-center p-4 text-gray-600 dark:text-gray-400">
          {error}
        </CardContent>
      </Card>
    );
  }

  const details = type === "general" ? itemDetails : materialDetails;

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
    <div className="min-h-screen bg-white dark:bg-[#13082F] p-6 relative">
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
      <div className="relative z-10 flex flex-wrap font-poppins gap-6 w-[95%] mx-auto mt-16 mb-20">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="relative text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
            {details?.title || t("libraryItem.title")}
            <span className="absolute left-0 bottom-[-9px] w-[120px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] rounded-t-full"></span>
          </h1>
          <Button
            variant="solid"
            className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] text-white hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(-1)}
          >
            {t("libraryItem.back")}
          </Button>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm bg-white dark:bg-[#281459]">
              <CardContent className="p-4">
                <table className="w-full table-auto">
                  <tbody>
                    {type === "material" && (
                      <tr>
                        <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                          {t("libraryItem.description")}
                        </td>
                        <td className="py-2 text-gray-600 dark:text-gray-400">
                          {details?.description || t("libraryItem.na")}
                        </td>
                      </tr>
                    )}
                    {type === "general" && (
                      <tr>
                        <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                          {t("libraryItem.author")}
                        </td>
                        <td className="py-2 text-gray-600 dark:text-gray-400">
                          {details?.author || t("libraryItem.na")}
                        </td>
                      </tr>
                    )}
                    {type === "material" && (
                      <>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                            {t("libraryItem.grade")}
                          </td>
                          <td className="py-2 text-gray-600 dark:text-gray-400">
                            {details?.grade_subject_semester_id?.grade_subject_id
                              ?.gradeId?.gradeName || t("libraryItem.na")}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                            {t("libraryItem.subject")}
                          </td>
                          <td className="py-2 text-gray-600 dark:text-gray-400">
                            {details?.grade_subject_semester_id?.grade_subject_id
                              ?.subjectId?.subjectName || t("libraryItem.na")}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                            {t("libraryItem.semester")}
                          </td>
                          <td className="py-2 text-gray-600 dark:text-gray-400">
                            {details?.grade_subject_semester_id?.semester_id
                              ?.semesterName || t("libraryItem.na")}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                            {t("libraryItem.academicYear")}
                          </td>
                          <td className="py-2 text-gray-600 dark:text-gray-400">
                            {`${
                              details?.grade_subject_semester_id?.semester_id
                                ?.academicYear_id?.startYear
                            } - ${
                              details?.grade_subject_semester_id?.semester_id
                                ?.academicYear_id?.endYear
                            }` || t("libraryItem.na")}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                        {t("libraryItem.type")}
                      </td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">
                        {details?.type || t("libraryItem.na")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                        {t("libraryItem.uploadedBy")}
                      </td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">
                        {details?.uploaded_by?.fullName || t("libraryItem.unknown")}
                      </td>
                    </tr>
                    {fileUrl && (
                      <tr>
                        <td className="py-2 font-semibold text-gray-700 dark:text-gray-300">
                          {t("libraryItem.download")}
                        </td>
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
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 16V4m0 12l4-4m-4 4l-4-4M4 20h16"
                                />
                              </svg>
                              {t("libraryItem.downloadMaterial")}
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
              <Card className="border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm bg-white dark:bg-[#281459]">
                <CardContent className="p-4">
                  {isYouTube ? (
                    <iframe
                      src={getYouTubeEmbedUrl(fileUrl)}
                      width="100%"
                      height="400px"
                      title="YouTube Video"
                      allowFullScreen
                      className="border rounded dark:border-[#E0AAEE]"
                    ></iframe>
                  ) : isImage ? (
                    <img
                      src={fileUrl}
                      alt={details.title}
                      className="rounded mb-3"
                    />
                  ) : isPdf ? (
                    <iframe
                      src={fileUrl}
                      width="100%"
                      height="400px"
                      title="PDF Document"
                      className="border rounded dark:border-[#E0AAEE]"
                    ></iframe>
                  ) : isVideo ? (
                    <video width="100%" controls>
                      <source src={fileUrl} type="video/mp4" />
                      {t("libraryItem.noSupport")}
                    </video>
                  ) : isGoogleDocs ? (
                    <iframe
                      src={getGoogleEmbedUrl(fileUrl)}
                      width="100%"
                      height="500px"
                      title="Google Document"
                      className="border rounded dark:border-[#E0AAEE]"
                    ></iframe>
                  ) : isGoogleDrive ? (
                    <iframe
                      src={fileUrl.replace("/view", "/preview")}
                      width="100%"
                      height="400px"
                      title="Google Drive File"
                      className="border rounded dark:border-[#E0AAEE]"
                    ></iframe>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] border border-gray-200 dark:border-[#E0AAEE] rounded-xl shadow-sm bg-white dark:bg-[#281459]">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]"
                      >
                        {t("libraryItem.downloadMaterial")}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryItemDetailsPage;