import React from "react";
import img4 from "../../../../assets/img4.png";
import img5 from "../../../../assets/img5.png";
import img6 from "../../../../assets/img6.png";
import img7 from "../../../../assets/img7.png";

const NewWayOfLearning = () => {
    const cards = [
        {
            title: "Number of Activities",
            description:
                "The number of activities you interact with, for example, the number of discussions you participate in, the number of video lectures you view, the number of assignments you solve, the number of messages you send, and so on.",
            image: img4,
        },
        {
            title: "Weight",
            description:
                "Each activity you do has a defined weight, for example, the weight of solving an assignment of 40 questions is definitely different from the weight of sending a message to your teacher and so on.",
            image: img5,
        },
        {
            title: "Grade (If Applicable)",
            description:
                "In the exams or homework assignments, for example, the grade/mark you get will affect your score, so if you get the full mark you will get the maximum number of points for this exam/homework.",
            image: img7,
        },
        {
            title: "Time (If Applicable)",
            description:
                "The faster you respond to your activities in Classera, the more points you get. For example, if you got a homework that is launched on Monday and is open until Thursday, if you submit it on Monday you will get up to 25% percent increase in your points, and if you submit it just before the deadline you will not get any extra bonus.",
            image: img6,
        },
    ];

    return (
        <>
            {/* Header Section */}
            <div className="bg-white p-6 rounded-2xl mt-6 grid grid-cols-1 pb-0 gap-6 items-center">
                <div>
                    <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
                        The New Way of Learning
                    </button>
                    <p className="ms-1 w-24 rounded-xl mb-4 border-t-4 border-[#BC6FFB]"></p>
                    <p className="font-poppins text-lg font-medium  md:text-left px-4 md:px-10">
                        Your score is based on many factors, below are the four main factors that affect your score.
                    </p>
                </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 p-4 md:p-8 lg:p-20">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="border-2  min-h-[330px] overflow-hidden hover:shadow-lg transition duration-300"
                        style={{
                            borderImage: "linear-gradient(to right, #FD813D, #CF72C0, #BC6FFB) 1",
                        }}
                    >
                        {/* Card Header */}
                        <div className="bg-gray-200 border-b-2 pb-12 border-[#919191] p-4 flex flex-col items-center">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="h-20 w-20 mb-4 object-contain"
                            />
                            <h2 className="text-lg font-poppins font-bold text-[#db6a2d] text-center">
                                {card.title}
                            </h2>
                        </div>

                        {/* Card Description */}
                        <div className="p-4">
                            <p className="text-gray-600 font-poppins mt-4 text-sm text-center">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NewWayOfLearning;
