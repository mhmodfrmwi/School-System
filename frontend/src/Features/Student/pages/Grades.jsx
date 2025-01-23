import img1 from "./../../../assets/gradeshere.png";
import img4 from "./../../../assets/arabic.png";
import img5 from "./../../../assets/english.png";
import img6 from "./../../../assets/french.png";
import img7 from "./../../../assets/science.png";

function Grades() {
  return (
    <>
      <main>
        <div className=" ">
          <img
            src={img1}
            alt="imgnotfound"
            style={{ objectFit: "cover" }}
            className="relative h-96 w-full md:h-[530px]"
          />
          <div className="z-100 absolute inset-0 left-20 top-40 sm:top-48 lg:top-60">
            <h2 className="font-semibold text-white">
              Take a Look at your Grades.
            </h2>
            <p className="my-24 w-52 rounded-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-3 font-semibold text-white">
              Greate Achievement
            </p>
          </div>
        </div>
      </main>

      <section className="mx-auto mb-20 w-[90%]">
        <div className="my-12 ms-14 w-32 rounded-md border-l-8 border-[#8975BF] sm:ms-10 lg:ms-16">
          <h2 className="mb-3 ms-2 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text font-poppins text-2xl font-semibold text-transparent">
            Grades
          </h2>
        </div>

        <div className="mx-auto grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative mx-auto rounded-xl border-2 border-gray-400">
            <img
              src={img4}
              alt="img4notfound"
              className="h-52 w-72 rounded-t-xl lg:w-96"
            />
            <div className="absolute inset-0 z-10 h-52 w-72 rounded-t-xl bg-[#FD813DBF] lg:w-96">
              <h2 className="mt-20 text-center font-semibold text-white">
                Arabic
              </h2>
            </div>
            <p className="mx-auto my-10 w-40 rounded-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-3 text-center font-semibold text-white">
              View Grades
            </p>
          </div>

          <div className="relative mx-auto rounded-xl border-2 border-gray-400">
            <img
              src={img5}
              alt="img4notfound"
              className="h-52 w-72 rounded-t-xl lg:w-96"
            />
            <div className="absolute inset-0 z-10 h-52 w-72 rounded-t-xl bg-[#FD813DBF] lg:w-96">
              <h2 className="mt-20 text-center font-semibold text-white">
                English
              </h2>
            </div>
            <p className="mx-auto my-10 w-40 rounded-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-3 text-center font-semibold text-white">
              View Grades
            </p>
          </div>

          <div className="relative mx-auto rounded-xl border-2 border-gray-400">
            <img
              src={img6}
              alt="img4notfound"
              className="h-52 w-72 rounded-t-xl lg:w-96"
            />
            <div className="absolute inset-0 z-10 h-52 w-72 rounded-t-xl bg-[#FD813DBF] lg:w-96">
              <h2 className="mt-20 text-center font-semibold text-white">
                French
              </h2>
            </div>
            <p className="mx-auto my-10 w-40 rounded-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-3 text-center font-semibold text-white">
              View Grades
            </p>
          </div>

          <div className="relative mx-auto rounded-xl border-2 border-gray-400">
            <img
              src={img7}
              alt="img4notfound"
              className="h-52 w-72 rounded-t-xl lg:w-96"
            />
            <div className="absolute inset-0 z-10 h-52 w-72 rounded-t-xl bg-[#FD813DBF] lg:w-96">
              <h2 className="mt-20 text-center font-semibold text-white">
                Science
              </h2>
            </div>
            <p className="mx-auto my-10 w-40 rounded-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-3 text-center font-semibold text-white">
              View Grades
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Grades;
