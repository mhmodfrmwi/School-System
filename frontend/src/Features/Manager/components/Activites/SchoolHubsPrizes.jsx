import activityImage from "../../../../assets/TeacherIcon/img1.png";

const PrizesActivity = () => {
  return (
    <>
      <div className="col-span-2 flex flex-col justify-between ms-5">
        {/* العنوان */}
        <div className="text-2xl font-poppins cursor-text text-[#105E6A] py-1 font-bold  ms-7 mt-5">
          Prizes
        </div>
        {/* الخط */}
        <p className="w-24 rounded-xl mb-2 border-t-4 border-[#117C90] ms-7"></p>

        {/* الصورة */}
        <div className="flex flex-col items-center mt-5">
          <img
            src={activityImage}
            alt="Activities"
            className="mb-4 w-full max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#105E6A]">
              <h3 className="font-bold font-poppins text-lg">Level 1</h3>
              <p className="text-sm mt-2">Certificate of Achievement.</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#117C90]">
              <h3 className="font-bold font-poppins text-lg">Level 2</h3>
              <p className="text-sm mt-2">Certificate and Silver Medal.</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#105E6A]">
              <h3 className="font-bold font-poppins text-lg">Level 3</h3>
              <p className="text-sm mt-2">Certificate and Gold Medal.</p>
            </div>
            <div className="border rounded-lg p-4 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#117C90]">
              <h3 className="font-bold font-poppins text-lg">Level 4</h3>
              <p className="text-sm mt-2">
                Certificate, Gold Trophy, and a special prize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrizesActivity;
