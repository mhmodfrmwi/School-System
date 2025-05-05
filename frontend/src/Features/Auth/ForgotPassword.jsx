import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import logo from "../../assets/logoorangee 1.png";
import SpinnerMini from "@/ui/SpinnerMini";
import Toggles from "./Toggles";
import Img2 from "../../assets/loginImg2.png";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isLoading = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      dir="ltr"
      className="flex min-h-[100vh] bg-[#FEDDC6] font-poppins dark:bg-[#13082F]"
    >
      <div className="flex w-full flex-col rounded-sm bg-[#e6b28c] dark:bg-[#13082F] md:w-1/2">
        <div className="sticky top-0 z-10 grid grid-cols-1 bg-[#e6b28c] p-4 dark:bg-[#13082F] lg:grid-cols-2">
          <img src={logo} alt="Logo" className="mx-auto h-14" />
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
              {t("forgotPassword.backToLogin")}
            </button>

            <h1 className="mb-2 text-3xl font-semibold text-orange-500 dark:text-[#E0AAEE]">
              {t("forgotPassword.title")}
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              {t("forgotPassword.subtitle")}
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("forgotPassword.emailLabel")}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("forgotPassword.emailPlaceholder")}
                    className={`w-full rounded-lg border border-orange-300 bg-white p-3 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-[#AE45FB] dark:bg-[#281459] dark:text-[#E0AAEE] dark:focus:border-[#E0AAEE] dark:focus:ring-[#3A1D7A] ${
                      i18n.language === "ar" ? "pr-10" : "pl-10"
                    }`}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-orange-500 p-3 font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-[#AE45FB] dark:hover:bg-[#9A35E7] dark:focus:ring-[#E0AAEE]"
              >
                {isLoading ? <SpinnerMini /> : t("forgotPassword.submitButton")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative hidden md:block md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEDCC5] to-[#FEDDC6] dark:from-[#1E0B3B] dark:to-[#13082F]">
          <img
            src={Img2}
            alt="Learning Illustration"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
