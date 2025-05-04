import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import logo from "../../assets/logoooo 1.png";
import img1 from "../../assets/img1slider.jpeg";
import img2 from "../../assets/img2slider.jpeg";
import img3 from "../../assets/img3slider.jpeg";
import img4 from "../../assets/footerOnboarding.png";
import img5 from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toggles from "./Toggles";

function OnBoarding() {
  const images = [img1, img2, img3];
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="font-poppins dark:bg-[#13082F]">
      <header
        dir="ltr"
        className="flex flex-col items-center justify-between border-b-2 border-Color2OnBoarding px-6 py-2 dark:border-[#AE45FB] md:flex-row"
      >
        <div className="flex w-full justify-center sm:justify-start">
          <img
            src={logo}
            className="h-12 w-40 sm:ms-5 sm:h-16 sm:w-52"
            alt="Logo"
          />
        </div>
        <div className="mt-4 flex w-full items-center justify-center gap-4 sm:mt-0 sm:justify-end">
          <div className="flex items-center">
            <Toggles />
          </div>
          <div className="w-full sm:w-auto">
            <button className="flex h-10 w-full items-center justify-center rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[3px] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] sm:w-40">
              <div
                className="flex h-full w-full items-center justify-center rounded-full bg-white font-poppins text-lg font-semibold text-black dark:bg-[#281459] dark:text-[#E0AAEE] sm:text-xl"
                onClick={() => navigate("/role")}
              >
                {t("onboarding.header.login")}
              </div>
            </button>
          </div>
        </div>
      </header>

      <div dir="ltr" className="dark:bg-[#13082F]">
        <Carousel className="mx-auto my-5 h-[80vh] w-[85vw]">
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative h-full w-full">
                  <img
                    src={src}
                    alt={`${t("onboarding.carousel.altText")} ${index + 1}`}
                    className="mx-auto h-[80vh] w-full rounded-[50px]"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 dark:text-[#E0AAEE]" />
          <CarouselNext className="right-2 dark:text-[#E0AAEE]" />
        </Carousel>
      </div>

      <main
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="dark:bg-[#13082F]"
      >
        <div className="mx-auto mb-12 grid gap-4 sm:grid-cols-2">
          <div className="mx-auto">
            <h1 className="mb-1 ms-14 bg-gradient-to-r from-Color1OnBoarding to-Color4OnBoarding bg-clip-text font-poppins text-xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
              {t("onboarding.content.journeyTitle")}
            </h1>
            <p className="mb-3 ms-14 w-32 rounded-xl border-b-4 border-Color1OnBoarding font-poppins dark:border-[#CE4EA0]"></p>
            <p className="ms-10 p-5 font-poppins dark:text-[#E0AAEE]">
              {t("onboarding.content.welcomeText")}
            </p>
          </div>
          <div className="">
            <img
              src={img2}
              className="mx-auto h-48 w-80 xl:ms-64"
              alt="image2 not found"
            />
          </div>
        </div>

        <div className="mx-auto my-8 grid gap-4 sm:grid-cols-2">
          <img
            src={img1}
            className="mx-auto h-48 w-80 sm:ms-14"
            alt="image2 not found"
          />
          <div className="mx-auto">
            <h1 className="mb-6 mr-5 ms-6 flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[1.5px] font-poppins text-white transition duration-300 dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] sm:ms-14 md:w-72">
              {t("onboarding.content.yourJourney")}
            </h1>
            <p className="ms-10 p-5 font-poppins dark:text-[#E0AAEE]">
              {t("onboarding.content.studyText")}
            </p>
            <p className="ms-14 mt-4 font-poppins text-orange-400 dark:text-[#CE4EA0]">
              <button
                className="text-orange-500 dark:text-[#E0AAEE]"
                onClick={() => navigate("/role")}
              >
                {t("onboarding.content.clickToLogin")}
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="dark:bg-[#13082F]"
      >
        <div className="mx-5 grid gap-10 rounded-lg bg-[#EEE8F6] py-5 dark:bg-[#281459] sm:my-0 sm:grid-cols-2 xl:grid-cols-3">
          <div className="mx-auto mt-14">
            <img src={img5} alt="logoImage not found" />
            <h2 className="ms-6 font-poppins text-[#3D52A1] dark:text-[#E0AAEE] lg:ms-24">
              {t("onboarding.footer.slogan")}
            </h2>
          </div>
          <div className="ms-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[#826FB5] dark:text-[#D1D5DB]">
            {t("onboarding.footer.points", { returnObjects: true }).map(
              (point, index) => (
                <div key={index} className="flex items-center">
                  <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                    <p className="h-full w-full rounded-full bg-white dark:bg-[#281459]"></p>
                  </p>
                  <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
                    {point}
                  </h2>
                </div>
              ),
            )}
          </div>
          <div className="flex items-center justify-between">
            <img
              src={img4}
              className="mx-auto h-64 md:w-96"
              alt="imagefooter not found"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OnBoarding;
