import img1 from "../../../../assets/img1.png";
import img2 from "../../../../assets/img2.png";
import img3 from "../../../../assets/img3.png";

const PointsSummary = () => { 
  const points = [
    { label: "Points Earned Today", img: img3, value: "0" },
    { label: "Your Score for this Semester", img: img2, value: "246" },
    { label: "Your Section Score", img: img1, value: "0" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl mt-6">
      <button className="text-2xl font-poppins cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-bold text-transparent">
        Points Summary
      </button>
      <p className="ms-1 w-24 rounded-xl mb-4 border-t-4 border-[#BC6FFB]"></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {points.map((point, index) => (
          <div
            key={index}
            className="relative p-3 rounded-2xl"
          >
            <div className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-2xl p-[3px]">
              <div className="flex justify-between items-center p-4 shadow-md rounded-2xl bg-white">
                <div>
                  <img 
                    src={point.img} 
                    alt={point.label} 
                    className="w-6 h-6 sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                  />
                </div>
                <div>
                  <p className="text-[#244856] font-poppins font-semibold">{point.label}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-poppins text-[#117C90]">{point.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsSummary;
