import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/cover22 1.png";
import img2 from "../../../../assets/Rectangle 314.png";
function LibraryBooksEnglish() {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <h2 className="ms-20 mt-10 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 text-xl font-semibold text-transparent md:ms-14 lg:ms-28 xl:ms-32">
          My Books
        </h2>
        <p className="ms-20 w-24 rounded-xl border-t-4 border-[#BC6FFB] md:ms-14 lg:ms-28 xl:ms-32"></p>

        <div className="my-10 ms-20 grid w-[80%] grid-cols-2 font-semibold sm:grid-cols-4 md:ms-14 md:grid-cols-5 lg:ms-28 lg:grid-cols-6 xl:ms-28 xl:grid-cols-7">
          <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-3 py-2 text-left font-medium text-transparent">
            {" "}
            All Subjects
          </button>

          <button
            className="w-24 cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-3 py-2 text-left font-medium text-white focus:outline-none"
            onClick={() => navigate("/student/librarybooksenglish")}
          >
            English
          </button>

          <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-3 py-2 text-left font-medium text-transparent">
            {" "}
            Science
          </button>

          <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-3 py-2 text-left font-medium text-transparent">
            {" "}
            Arabic
          </button>

          <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-3 py-2 text-left font-medium text-transparent">
            {" "}
            math
          </button>

          <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-3 py-2 text-left font-medium text-transparent">
            {" "}
            French
          </button>

          <button className="cursor-pointer rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text px-3 py-2 text-left font-medium text-transparent">
            {" "}
            Social Studies
          </button>
        </div>
        <div className="mx-auto w-[95%]">
          <div className="mx-auto grid w-[100%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="mx-auto">
              <div className="relative w-52">
                <img src={img1} alt="imagenotfound" className="w-52" />

                <div className="absolute inset-0 z-10">
                  <h2 className="py-1 text-center font-semibold text-white">
                    English
                  </h2>
                  <img src={img2} className="mx-auto" alt="" />

                  <p className="z-15 absolute left-24 mx-auto mt-[-15px] size-5 rounded-full bg-white text-center text-black">
                    1
                  </p>
                  <h3 className="py-2 text-center text-[10px] text-white">
                    Course books-Part A
                  </h3>
                </div>
              </div>

              <h2 className="mt-3 font-semibold">English Coursebook</h2>
              <h3 className="mb-3 text-[#BFBFBF]">Grade 1</h3>
            </div>

            <div className="mx-auto">
              <div className="relative w-52">
                <img src={img1} alt="imagenotfound" className="w-52" />

                <div className="absolute inset-0 z-10">
                  <h2 className="py-1 text-center font-semibold text-white">
                    English
                  </h2>
                  <img src={img2} className="mx-auto" alt="" />

                  <p className="z-15 absolute left-24 mx-auto mt-[-15px] size-5 rounded-full bg-white text-center text-black">
                    1
                  </p>
                  <h3 className="py-2 text-center text-[10px] text-white">
                    Work books-Part A
                  </h3>
                </div>
              </div>

              <h2 className="mt-3 font-semibold">English Workbook</h2>
              <h3 className="mb-3 text-[#BFBFBF]">Grade 1</h3>
            </div>

            <div className="mx-auto">
              <div className="relative w-52">
                <img src={img1} alt="imagenotfound" className="w-52" />

                <div className="absolute inset-0 z-10">
                  <h2 className="py-1 text-center font-semibold text-white">
                    English
                  </h2>
                  <img src={img2} className="mx-auto" alt="" />

                  <p className="z-15 absolute left-24 mx-auto mt-[-15px] size-5 rounded-full bg-white text-center text-black">
                    1
                  </p>
                  <h3 className="py-2 text-center text-[10px] text-white">
                    Work books-Part A
                  </h3>
                </div>
              </div>

              <h2 className="mt-3 font-semibold">English Workbook</h2>
              <h3 className="mb-3 text-[#BFBFBF]">Grade 3</h3>
            </div>

            <div className="mx-auto">
              <div className="relative w-52">
                <img src={img1} alt="imagenotfound" className="w-52" />

                <div className="absolute inset-0 z-10">
                  <h2 className="py-1 text-center font-semibold text-white">
                    English
                  </h2>
                  <img src={img2} className="mx-auto" alt="" />

                  <p className="z-15 absolute left-24 mx-auto mt-[-15px] size-5 rounded-full bg-white text-center text-black">
                    1
                  </p>
                  <h3 className="py-2 text-center text-[10px] text-white">
                    Course books-Part A
                  </h3>
                </div>
              </div>

              <h2 className="mt-3 font-semibold">English Coursebook</h2>
              <h3 className="mb-3 text-[#BFBFBF]">Grade 2</h3>
            </div>

            <div className="mx-auto">
              <div className="relative w-52">
                <img src={img1} alt="imagenotfound" className="w-52" />

                <div className="absolute inset-0 z-10">
                  <h2 className="py-1 text-center font-semibold text-white">
                    English
                  </h2>
                  <img src={img2} className="mx-auto" alt="" />

                  <p className="z-15 absolute left-24 mx-auto mt-[-15px] size-5 rounded-full bg-white text-center text-black">
                    1
                  </p>
                  <h3 className="py-2 text-center text-[10px] text-white">
                    Course books-Part A
                  </h3>
                </div>
              </div>

              <h2 className="mt-3 font-semibold">English Coursebook</h2>
              <h3 className="mb-3 text-[#BFBFBF]">Grade 6</h3>
            </div>

            <div className="mx-auto">
              <div className="relative w-52">
                <img src={img1} alt="imagenotfound" className="w-52" />

                <div className="absolute inset-0 z-10">
                  <h2 className="py-1 text-center font-semibold text-white">
                    English
                  </h2>
                  <img src={img2} className="mx-auto" alt="" />

                  <p className="z-15 absolute left-24 mx-auto mt-[-15px] size-5 rounded-full bg-white text-center text-black">
                    1
                  </p>
                  <h3 className="py-2 text-center text-[10px] text-white">
                    work books-Part A
                  </h3>
                </div>
              </div>

              <h2 className="mt-3 font-semibold">English Workbook</h2>
              <h3 className="mb-3 text-[#BFBFBF]">Grade 6</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LibraryBooksEnglish;
