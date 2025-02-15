import img2 from "../../../assets/logo.png";
import img3 from "../../../assets/footerOnboarding.png";

function Footer() {
  return (
    <footer>
      <div className="m-5 grid gap-10 rounded-lg bg-[#EEE8F6] p-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="mx-auto">
          <img src={img2} alt="logoImage not found"  loading="lazy" />
          <h2 className="ms-6 font-poppins text-[#3D52A1] lg:ms-24">
            Learn,Graw,Success
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#826FB5]">
          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
              <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>

            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
              Empower Growth
            </h2>
          </div>

          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
              <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>
            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
              Inspire Learning
            </h2>{" "}
          </div>

          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
              <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>
            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
              Discover Kowledge
            </h2>
          </div>

          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
              <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>
            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
              Imagine More
            </h2>
          </div>

          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
              <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>
            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">Unlock</h2>
          </div>

          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
              <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>
            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
              Dream Big
            </h2>
          </div>

          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
             <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>
            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
              Explore Ideas
            </h2>
          </div>
          <div className="flex items-center">
            <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
              <div className="h-[100%] w-[100%] rounded-full bg-white"></div>
            </p>
            <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
              Achieve Greatness
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <img
            src={img3}
            className="mx-auto h-64 md:w-96"
            alt="imagefooter not found"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;