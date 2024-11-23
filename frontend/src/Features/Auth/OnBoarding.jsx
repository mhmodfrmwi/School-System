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

function OnBoarding() {
  const images = [img1, img2, img3];
  const navigate = useNavigate();

  return (
    <div>
      <header className="my-5 flex h-14 items-center justify-between border-b-2 border-Color2OnBoarding">
        <img src={logo} className="mb-5 ms-5 h-16 w-52" alt="Logo" />
        <button className="mr-5 flex h-10 w-40 items-center justify-center rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[3px]">
          <div
            className="flex h-full w-full items-center justify-center rounded-full bg-white text-xl font-semibold text-black"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        </button>
      </header>
      <main>
        <Carousel className="mx-auto mb-5 h-[80vh] w-[85vw]">
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative h-full w-full">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="mx-auto h-[80vh] w-full rounded-[50px]"
                    sizes="90vw"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <div className="mx-auto mb-12 grid gap-4 sm:grid-cols-2">
          <div className="mx-auto">
            {" "}
            <h1 className="mb-3 ms-14 bg-gradient-to-r from-Color1OnBoarding to-Color4OnBoarding bg-clip-text font-semibold text-transparent">
              Start a journey with us
            </h1>
            <p className="mb-3 ms-14 w-32 border-b-4 border-Color4OnBoarding"></p>
            <p className="ms-10 p-5 font-semibold">
              Welcome to our platform! Our website is designed to help you get
              started smoothly, providing essential resources and a clear
              understanding of our values, We're here to support you every step
              of the way as you embark on this journey with us.
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
            {" "}
            <h1 className="mb-6 mr-5 ms-6 flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[1.5px] transition duration-300 sm:ms-14 md:w-72">
              Your journey start here
            </h1>
            <p className="ms-10 p-5 font-semibold">
              Studying is the foundation of success, building knowledge and
              skills that open doors to future opportunities. Dedication to
              learning fosters growth, resilience, and the confidence needed to
              achieve your goals
            </p>
            <p className="ms-14 mt-4 font-semibold text-blue-500">
              Click here to{" "}
              <button onClick={() => navigate("/login")}>login&rarr; </button>
            </p>
          </div>
        </div>
      </main>
      <footer>
        <div className="m-5 grid gap-10 rounded-lg bg-[#EEE8F6] p-5 sm:grid-cols-2 xl:grid-cols-3">
          <div className="mx-auto mt-14">
            <img src={img5} alt="logoImage not found" />
            <h2 className="ms-6 text-[#3D52A1] lg:ms-24">Learn,Graw,Success</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#826FB5]">
            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>

              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Empower Growth
              </h2>
            </div>

            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>
              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Inspire Learning
              </h2>{" "}
            </div>

            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>
              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Discover Kowledge
              </h2>
            </div>

            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>
              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Imagine More
              </h2>
            </div>

            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>
              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Unlock
              </h2>
            </div>

            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>
              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Dream Big
              </h2>
            </div>

            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>
              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Explore Ideas
              </h2>
            </div>
            <div className="flex items-center">
              <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px]">
                <p className="h-[100%] w-[100%] rounded-full bg-white"></p>
              </p>
              <h2 className="ms-4 text-[10px] font-semibold md:text-sm">
                Achieve Greatness
              </h2>
            </div>
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
