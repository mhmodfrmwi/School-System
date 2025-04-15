import { useParentKids } from "./hooks/useParentKids";
import Loader from "@/ui/Loader";
import { useCreateKid } from "./hooks/useCreateKid";

function ParentKids() {
  const { parentKids, isLoading } = useParentKids();
  const { postKidData, isPosting } = useCreateKid();

  if (isLoading || isPosting) return <Loader role="parent" />;

  const handleSelectKid = async (kid) => {
    try {
      await postKidData({
        id: kid._id,
        email: kid.email,
        role: "student",
        classId: kid.classId,
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="mx-auto w-[90%] px-4 py-6 sm:px-6 lg:px-8">
      <button className="relative my-10 cursor-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-poppins text-2xl font-bold text-transparent dark:bg-gradient-to-r dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
        <span className="absolute bottom-[-9px] left-0 h-[4px] w-[85px] rounded-t-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB]"></span>
        My Children
      </button>
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full border border-[#FFA4A4] bg-white dark:border-[#A3BFFA] dark:bg-[#281459]">
          <thead>
            <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white dark:bg-[#C459D9]">
              <th className="border border-[#FFA4A4] px-4 py-3 text-left font-poppins text-xs dark:border-[#A3BFFA] sm:text-base md:text-lg">
                Full Name
              </th>
              <th className="border border-[#FFA4A4] px-4 py-3 text-left font-poppins text-xs dark:border-[#A3BFFA] sm:text-base md:text-lg">
                Academic Number
              </th>
              <th className="border border-[#FFA4A4] px-4 py-3 text-left font-poppins text-xs dark:border-[#A3BFFA] sm:text-base md:text-lg">
                Email
              </th>
              <th className="border border-[#FFA4A4] px-4 py-3 text-left font-poppins text-xs dark:border-[#A3BFFA] sm:text-base md:text-lg">
                Gender
              </th>
            </tr>
          </thead>
          <tbody>
            {parentKids?.map((item) => {
              const kid = item.student_id;
              return (
                <tr
                  key={kid._id}
                  onClick={() => handleSelectKid(kid)}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1f1142]"
                >
                  <td className="border border-[#FFA4A4] px-4 py-4 font-poppins text-xs text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300 sm:text-sm md:text-sm">
                    {kid.fullName}
                  </td>
                  <td className="border border-[#FFA4A4] px-4 py-4 font-poppins text-xs text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300 sm:text-sm md:text-sm">
                    {kid.academic_number}
                  </td>
                  <td className="border border-[#FFA4A4] px-4 py-4 font-poppins text-xs text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300 sm:text-sm md:text-sm">
                    {kid.email}
                  </td>
                  <td className="border border-[#FFA4A4] px-4 py-4 font-poppins text-xs text-gray-700 dark:border-[#A3BFFA] dark:text-gray-300 sm:text-sm md:text-sm">
                    {kid.gender === "M" ? "Male" : "Female"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParentKids;
