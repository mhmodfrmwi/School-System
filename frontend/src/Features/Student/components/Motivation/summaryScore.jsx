import React from "react";
import about2 from "../../../../assets/about2.png";

function SummaryScore() {
    return (
        <div className="bg-white p-6  grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
                <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
                    Summary Of Your Score
                </button>
                <p className="ms-1 w-24 rounded-xl mb-4 border-t-4 border-[#BC6FFB]"></p>
                <p className="text-gray-700 font-poppins mb-4">
                    Every member starts his/her journey with green membership card, in each semester
                    you will start earning points from the first day in the semester. Your final score
                    at the end of the semester will determine the type of card you deserve to use
                    it throughout the next semester as recognition for your efforts.
                </p>
                <section className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></div>
                    <p className="text-sm font-poppins"> If you are among the top <strong>55%</strong>  in your school, you will deserve Learnova <strong className="text-green-500 text-lg font-bold"> Green</strong>  card.</p>
                </section>
                <section className="flex items-center space-x-4">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></div>
                <p className="text-sm font-poppins"> If you are among the top <strong>40%</strong>  in your school, you will deserve Learnova  <strong className="text-orange-400 text-lg font-bold"> Golden</strong>  card.</p>
                </section>
                <section className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></div>
                    <p className="text-sm font-poppins">  If you are among the top <strong>5%</strong> in your school, you truly deserve the <strong className="text-gray-500 text-lg font-bold"> Diamond</strong>  card.</p>
                </section>
               
            </div>
            <div className="flex justify-center items-center">
                <img
                    src={about2}
                    alt="Score Illustration"
                    className=" w-70 h-80 "
                />
            </div>
        </div>

    );
}

export default SummaryScore;
