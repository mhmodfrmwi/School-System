import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./AuthRedux/loginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logoorangee 1.png";
import Img2 from "../../assets/loginImg2.png";
import SpinnerMini from "@/ui/SpinnerMini";
import { useTranslation } from "react-i18next";
import Toggles from "./Toggles";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { loading } = useSelector((state) => state.login);
  const role =
    useSelector((state) => state.role.role) || localStorage.getItem("role");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.error(t("login.roleError"));
      localStorage.removeItem("token");
      navigate("/role");
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      if (role === "parent") {
        navigate("/parent/parent-kids");
      } else {
        navigate(`/${role}`);
      }
    }
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
            <h1 className="mb-8 text-center text-3xl font-semibold text-orange-500 dark:text-[#E0AAEE]">
              {t("login.title")}
            </h1>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("login.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("login.emailPlaceholder")}
                  className="w-full rounded-lg border border-orange-300 bg-white p-3 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-[#AE45FB] dark:bg-[#281459] dark:text-[#E0AAEE] dark:focus:border-[#E0AAEE] dark:focus:ring-[#3A1D7A]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("login.password")}
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.passwordPlaceholder")}
                  className="w-full rounded-lg border border-orange-300 bg-white p-3 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-[#AE45FB] dark:bg-[#281459] dark:text-[#E0AAEE] dark:focus:border-[#E0AAEE] dark:focus:ring-[#3A1D7A]"
                  required
                />
              </div>

              <div
                className={i18n.language === "ar" ? "text-left" : "text-right"}
              >
                <a
                  href="/"
                  className="text-sm text-orange-500 hover:underline dark:text-[#E0AAEE]"
                >
                  {t("login.forgotPassword")}
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-lg bg-orange-500 p-3 font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-[#AE45FB] dark:hover:bg-[#9A35E7] dark:focus:ring-[#E0AAEE]"
              >
                {loading ? <SpinnerMini /> : t("login.submit")}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                {t("login.orLoginWith")}
              </p>
              <div className="flex justify-center space-x-4">
                <button className="me-2 flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 hover:bg-gray-50 dark:border-[#AE45FB] dark:bg-[#281459] dark:hover:bg-[#3A1D7A]">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/25/Microsoft_icon.svg"
                    alt="Microsoft"
                    className="h-6 w-6"
                  />
                </button>
                <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 hover:bg-gray-50 dark:border-[#AE45FB] dark:bg-[#281459] dark:hover:bg-[#3A1D7A]">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://www.google.com/favicon.ico";
                    }}
                    alt="Google"
                    className="h-6 w-6"
                  />
                </button>
              </div>
            </div>
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

export default Login;
