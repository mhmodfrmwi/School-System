import React from "react";
import img4 from "../../../../assets/img4.png";
import img5 from "../../../../assets/img5.png";
import img6 from "../../../../assets/img6.png";
import img7 from "../../../../assets/img7.png";
import { useTranslation } from 'react-i18next';
const NewWayOfLearning = () => {
    const { t } = useTranslation();
    const cards = [
        {
            title: t('motivation.activitiesTitle'),
            description: t('motivation.activitiesDesc'),
            image: img4,
        },
        {
            title: t('motivation.weightTitle'),
            description: t('motivation.weightDesc'),
            image: img5,
        },
        {
            title: t('motivation.gradeTitle'),
            description: t('motivation.gradeDesc'),
            image: img7,
        },
        {
            title: t('motivation.timeTitle'),
            description: t('motivation.timeDesc'),
            image: img6,
        },
    ];

    return (
        <>
            {/* Header Section */}
            <div className="bg-white p-6 rounded-2xl mt-6 grid grid-cols-1 pb-0 gap-6 items-center">
                <div>
                    <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
                    {t('motivation.newWayTitle')}
                    </button>
                    <p className="ms-1 w-24 rounded-xl mb-4 border-t-4 border-[#BC6FFB]"></p>
                    <p className="font-poppins text-lg font-medium  md:text-left px-4 md:px-10">
                    {t('motivation.scoreFactors')}
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
