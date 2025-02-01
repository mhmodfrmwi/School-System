import activityImage from "../../../../assets/TeacherIcon/img2.png";

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
            className="mb-6 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"> {/* زيادة المسافة */}
            <div className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#105E6A]">
              <h3 className="font-bold font-poppins text-xl">Level 1</h3>
              <p className="text-md mt-2">Memorize 1 Part.</p>
            </div>
            <div className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#117C90]">
              <h3 className="font-bold font-poppins text-xl">Level 2</h3>
              <p className="text-md mt-2">Memorize 3 Part.</p>
            </div>
            <div className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#105E6A]">
              <h3 className="font-bold font-poppins text-xl">Level 3</h3>
              <p className="text-md mt-2">Memorize 5 Part.</p>
            </div>
            <div className="border rounded-lg p-6 font-poppins text-center bg-[#F5F5F5] shadow-md shadow-[#117C90]">
              <h3 className="font-bold font-poppins text-xl">Level 4</h3>
              <p className="text-md mt-2">Memorize 10 Part.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrizesActivity;
