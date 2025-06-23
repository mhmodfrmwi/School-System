import React, { useEffect, useRef } from "react"; // أضفنا useRef
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationEmail, clearError, resetState } from "./AuthRedux/verifyEmailSlice";
import { toast } from "react-toastify";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import logo from "../../assets/logoorangee 1.png";
import SpinnerMini from "@/ui/SpinnerMini";
import Toggles from "./Toggles";
import Img2 from "../../assets/loginImg2.png";
import { useTranslation } from "react-i18next";

const ResendVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { status, message, loading, error } = useSelector((state) => state.verifyEmail);
  const [formData, setFormData] = React.useState({
    email: "",
    model: "Student",
  });

  // استخدام useRef لتتبع ما إذا كانت الرسالة ظهرت من قبل
  const hasShownSuccess = useRef(false);

  useEffect(() => {
    // Reset state when component mounts
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && !hasShownSuccess.current) {
      toast.success(t("resendVerification.successMessage"));
      hasShownSuccess.current = true; // علامة إن الرسالة ظهرت
      setTimeout(() => {
        navigate("/login");
        dispatch(resetState()); // Reset state after navigation
      }, 5000);
    } else if (error) {
      toast.error(error);
    }
  }, [status, error, navigate, t, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resendVerificationEmailHandler = () => {
    if (!formData.email || !formData.email.includes("@")) {
      toast.error(t("resendVerification.invalidEmail"));
      return;
    }
    dispatch(resendVerificationEmail(formData));
    hasShownSuccess.current = false; // إعادة تهيئة الـref لما نرسل طلب جديد
  };

  return (
    <div
      dir="ltr"
      className="flex min-h-[100vh] bg-[#FEDDC6] font-poppins dark:bg-[#13082F]"
    >
      <div className="flex w-full flex-col rounded-sm bg-[#e6b28c] dark:bg-[#13082F] md:w-1/2">
        <div className="sticky top-0 z-10 grid grid-cols-1 bg-[#e6b28c] p-4 dark:bg-[#13082F] lg:grid-cols-2 mx-8 mt-4">
          <img src={logo} alt="Logo" className="mx-auto h-16" />
          <div className="mx-auto">
            <Toggles />
          </div>
        </div>

        <div
          className="flex flex-1 flex-col items-center justify-center p-4 md:p-8"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <div className="w-full max-w-md">
            <button
              onClick={() => navigate(-1)}
              className={`mb-6 flex items-center text-orange-500 hover:text-orange-600 dark:text-[#E0AAEE] dark:hover:text-[#d18af0] ${
                i18n.language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <FaArrowLeft
                className={i18n.language === "ar" ? "ml-2" : "mr-2"}
              />
              {t("resendVerification.backToLogin")}
            </button>

            <h1 className="mb-2 text-3xl font-semibold text-orange-500 dark:text-[#E0AAEE]">
              {t("resendVerification.title")}
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              {t("resendVerification.subtitle")}
            </p>

            <div className="w-full space-y-6">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("resendVerification.emailLabel")}
                </label>
                <div className="relative">
                  <div
                    className={`pointer-events-none absolute inset-y-0 flex items-center ${
                      i18n.language === "ar" ? "right-3" : "left-3"
                    }`}
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  >
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("resendVerification.emailPlaceholder")}
                    className={`w-full rounded-lg border border-orange-300 bg-white p-3 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-[#AE45FB] dark:bg-[#281459] dark:text-[#E0AAEE] dark:focus:border-[#E0AAEE] dark:focus:ring-[#3A1D7A] ${
                      i18n.language === "ar" ? "pr-10" : "pl-10"
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="model"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("resendVerification.accountType")}
                </label>
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className={`w-full rounded-lg border border-orange-300 bg-white p-3 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-[#AE45FB] dark:bg-[#281459] dark:text-[#E0AAEE] dark:focus:border-[#E0AAEE] dark:focus:ring-[#3A1D7A] ${
                    i18n.language === "ar" ? "pr-10" : "pl-10"
                  }`}
                >
                  <option value="Student">{t("resendVerification.student")}</option>
                  <option value="Teacher">{t("resendVerification.teacher")}</option>
                  <option value="Parent">{t("resendVerification.parent")}</option>
                  <option value="Admin">{t("resendVerification.admin")}</option>
                  <option value="Manager">{t("resendVerification.manager")}</option>
                </select>
              </div>

              <button
                onClick={resendVerificationEmailHandler}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-lg bg-orange-500 p-3 font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-[#AE45FB] dark:hover:bg-[#9A35E7] dark:focus:ring-[#E0AAEE]"
              >
                {loading ? <SpinnerMini /> : t("resendVerification.submitButton")}
              </button>

              {status === "success" && (
                <div className="mt-4 rounded-md bg-green-50 p-3 text-green-700">
                  <p>{message}</p>
                  <p className="mt-1 text-sm">{t("resendVerification.redirectMessage")}</p>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 rounded-md bg-red-50 p-3 text-red-700">
                  <p>{message}</p>
                  <button
                    onClick={() => {
                      dispatch(clearError());
                      resendVerificationEmailHandler();
                    }}
                    className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    {t("resendVerification.tryAgain")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden md:block md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEDCC5] to-[#FEDDC6] dark:from-[#1E0B3B] dark:to-[#13082F]">
          <img
            src={Img2}
            alt="Verification Illustration"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;