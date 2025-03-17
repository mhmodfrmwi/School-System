import React from "react";
import about2 from "../../../../assets/about2.png";

function SummaryScore() {
  return (
    <div className="grid grid-cols-1 items-center gap-6 bg-white p-6 lg:grid-cols-2">
      <div className="p-4">
        <button className="cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-xl font-bold text-transparent sm:text-2xl">
          Summary Of Your Score
        </button>

        <p className="mb-4 ms-1 w-16 rounded-xl border-t-4 border-[#BC6FFB] sm:w-24"></p>

        <p className="mb-4 font-poppins text-sm text-gray-700 sm:text-base">
          Every member starts his/her journey with a green membership card. In
          each semester, you will start earning points from the first day. Your
          final score at the end of the semester will determine the type of card
          you deserve to use throughout the next semester as recognition for
          your efforts.
        </p>

        <section className="mb-4 flex items-center space-x-4">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm">
            If your points are between <strong>0 and 250</strong> in your
            school, you will be eligible for the Learnova{" "}
            <strong className="text-base font-bold text-green-500 sm:text-lg">
              Green
            </strong>{" "}
            Card.
          </p>
        </section>

        <section className="mb-4 flex items-center space-x-4">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm">
            If your points are between <strong>251 to 400</strong> in your
            school, you will be eligible for the Learnova{" "}
            <strong className="text-base font-bold text-yellow-500 sm:text-lg">
              Golden
            </strong>{" "}
            Card.
          </p>
        </section>

        <section className="mb-4 flex items-center space-x-4">
          <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] sm:h-4 sm:w-4"></div>
          <p className="font-poppins text-xs sm:text-sm">
            If your points are <strong>401 or more</strong> in your school, you
            will be eligible for the Learnova{" "}
            <strong className="text-base font-bold text-[#6a6969] sm:text-lg">
              Diamond
            </strong>{" "}
            Card.
          </p>
        </section>
      </div>
      <div className="flex items-center justify-center">
        <img src={about2} alt="Score Illustration" className="w-70 h-80" />
      </div>
    </div>
  );
}

export default SummaryScore;
