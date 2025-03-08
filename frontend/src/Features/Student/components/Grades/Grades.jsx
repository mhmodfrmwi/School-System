import { useNavigate } from "react-router-dom";
import img1 from "../../../../assets/gradeshere.png";

function Grades() {
  const navigate = useNavigate();
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
            <p
              className="my-24 w-52 rounded-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] p-3 font-semibold text-white"
              onClick={() => navigate("/student/grades-for-semester")}
            >
              View Your Grades
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Grades;
