import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDegreesAllYears } from "../StudentRedux/gradesStudentSlice";
import { useEffect } from "react";

function GradesforAllYears() {
  const { allDegrees } = useSelector((state) => state.studentGrades);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDegreesAllYears());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className="mx-auto w-[90%]">
      <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
        <div className="m-auto mb-6 mt-10 grid grid-cols-1 gap-1 rounded-3xl bg-gray-100 sm:grid-cols-2">
          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text py-2 font-medium text-transparent focus:outline-none"
            onClick={() => navigate("/student/grades-for-semester")}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
              1
            </span>
            Grades for Semester
          </button>

          <button
            className="flex cursor-pointer items-center justify-center rounded-3xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] py-2 font-medium text-white focus:outline-none"
            onClick={() => navigate("/student/grades-for-allyears")}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
              2
            </span>
            Grades All Years
          </button>
        </div>

        <div className="mt-8 overflow-x-auto">
          {allDegrees?.map((yearData) => (
            <div key={yearData.academicYear._id} className="mb-6">
              <h2 className="mb-4 text-2xl font-bold">
                Academic Year {yearData.academicYear.startYear} -{" "}
                {yearData.academicYear.endYear}
              </h2>
              {yearData?.semester ? (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{yearData.semester}</h3>
                  <table className="mt-4 min-w-full rounded-lg bg-white shadow-md">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] text-white">
                        <th className="px-4 py-3 text-left">Subject Name</th>
                        <th className="px-4 py-3 text-left">
                          Midterm Exam Grade
                        </th>
                        <th className="px-4 py-3 text-left">
                          Midterm Final Degree
                        </th>
                        <th className="px-4 py-3 text-left">
                          Final Exam Grade
                        </th>
                        <th className="px-4 py-3 text-left">
                          Final Final Degree
                        </th>
                        <th className="px-4 py-3 text-left">Score Subject</th>
                        <th className="px-4 py-3 text-left">
                          Max Score Subject
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearData.grades?.length > 0 ? (
                        yearData.grades?.map((gradeData) => {
                          const scoreSubject =
                            (gradeData?.midterm?.examGrade || 0) +
                            (gradeData?.final?.examGrade || 0);
                          const maxScoreSubject =
                            (gradeData?.midterm?.finalDegree || 0) +
                            (gradeData?.final?.finalDegree || 0);

                          return (
                            <tr
                              key={gradeData.subjectId._id}
                              className="border-b"
                            >
                              <td className="px-4 py-3">
                                {gradeData.subjectName}
                              </td>
                              <td className="px-4 py-3">
                                {gradeData?.midterm?.examGrade ?? "N/A"}
                              </td>
                              <td className="px-4 py-3">
                                {gradeData?.midterm?.finalDegree ?? "N/A"}
                              </td>
                              <td className="px-4 py-3">
                                {gradeData?.final?.examGrade ?? "N/A"}
                              </td>
                              <td className="px-4 py-3">
                                {gradeData?.final?.finalDegree ?? "N/A"}
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
                            No degrees available for this term.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 text-lg text-gray-500">
                  No grades available for this academic year.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GradesforAllYears;
