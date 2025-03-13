import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDegreesBySemester } from "../StudentRedux/gradesStudentSlice";
import Loader from "@/ui/Loader";

function GradesForSemester() {
  const { semesterDegrees, loading } = useSelector(
    (state) => state.studentGrades,
  );

  const role = sessionStorage.getItem("role");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDegreesBySemester());
  }, [dispatch]);

  const navigate = useNavigate();

  if (loading) return <Loader role={role} />;

  return (
    <div className="mx-auto w-[90%]">
      <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
        <div className="m-auto mb-6 mt-10 grid grid-cols-1 gap-1 rounded-3xl bg-gray-100 sm:grid-cols-2">
          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] py-2 font-medium text-white focus:outline-none"
            onClick={() => navigate("/student/grades-for-semester")}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
              1
            </span>
            Grades for Semester
          </button>

          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-medium text-transparent focus:outline-none"
            onClick={() => navigate("/student/grades-for-allyears")}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
              2
            </span>
            Grades All Years
          </button>
        </div>

        {/* Table displaying semester grades */}
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full rounded-lg bg-white shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                <th className="px-4 py-3 text-left">Subject Name</th>
                <th className="px-4 py-3 text-left">Midterm Degree</th>
                <th className="px-4 py-3 text-left">Max Midterm Degree</th>
                <th className="px-4 py-3 text-left">Final Degree</th>
                <th className="px-4 py-3 text-left">Max Final Degree</th>
                <th className="px-4 py-3 text-left">Score Subject</th>
                <th className="px-4 py-3 text-left">Max Score Subject</th>
              </tr>
            </thead>
            <tbody>
              {semesterDegrees?.length > 0 ? (
                semesterDegrees?.map((item) => {
                  // Calculate Score Subject and Max Score Subject
                  const scoreSubject =
                    (item.midterm?.examGrade || 0) +
                    (item.final?.examGrade || 0);
                  const maxScoreSubject =
                    (item.midterm?.finalDegree || 0) +
                    (item.final?.finalDegree || 0);

                  return (
                    <tr key={item.subjectId} className="border-b">
                      <td className="px-4 py-3">{item.subjectName}</td>
                      <td className="px-4 py-3">
                        {item.midterm?.examGrade ? item.midterm.examGrade : "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item.midterm?.finalDegree
                          ? item.midterm.finalDegree
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item.final?.examGrade ? item.final.examGrade : "-"}
                      </td>
                      <td className="px-4 py-3">
                        {item.final?.finalDegree ? item.final.finalDegree : "-"}
                      </td>
                      <td className="px-4 py-3">{scoreSubject}</td>
                      <td className="px-4 py-3">{maxScoreSubject}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-3 text-center text-lg text-gray-500"
                  >
                    No degrees available for this semester.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GradesForSemester;
