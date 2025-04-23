import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchStudentsForSubject,
  postAttendance,
} from "../TeacherRedux/takeAttendanceSlice";
import { toast } from "react-toastify";
import Pagination from "../Pagination";
import Loader from "@/ui/Loader";
import { useTranslation } from "react-i18next";

function TakeAttendance() {
  const { studentsforsubject, loading } = useSelector(
    (state) => state.attendanceTeacher,
  );
  const isActive = (path) => location.pathname === path;
  const { t ,i18n} = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const classId = location.state?.classId;

  const [attendance, setAttendance] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    if (classId && id) {
      dispatch(fetchStudentsForSubject({ classId, id }));
    }
  }, [dispatch, classId, id]);

  console.log(studentsforsubject);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!classId || !id) {
      toast.error("Missing class or subject information");
      return;
    }

    try {
      await Promise.all(
        studentsforsubject.map(async (student) => {
          await dispatch(
            postAttendance({
              studentName: student.fullName,
              academicNumber: student.academic_number,
              status: attendance[student._id] ? "P" : "A",
            }),
          ).unwrap();
        }),
      );

      toast.success("Attendance submitted successfully!");
      setAttendance({});
    } catch (error) {
      toast.error(error.message || "Failed to submit attendance");
    }
  };

  return (
    <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
      {loading && <Loader />}

      <div className="mx-auto mt-5 w-full px-4">
        <div className="mx-auto mb-20 flex max-w-[90%] flex-wrap overflow-hidden rounded-full border border-gray-300 bg-[#F5F5F5] md:w-[60%] md:flex-nowrap">
          <button
            onClick={() => navigate(`/teacher/takeattendance/${id}`)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center font-poppins text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm ${
              isActive(`/teacher/takeattendance/${id}`)
                ? "bg-[#008394] font-bold text-white dark:bg-DarkManager"
                : "bg-[#f4f4f4] font-normal text-[#008394] dark:text-DarkManager"
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#117C90] bg-white text-[#117C90] dark:border-DarkManager dark:text-DarkManager">
              1
            </span>
            {t("attendans.TakeAttendance")}
          </button>

          <button
            onClick={() => navigate(`/teacher/attendancereport/${id}`)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-center font-poppins text-xs font-medium transition-all md:px-6 md:py-3 md:text-sm ${
              isActive(`/teacher/attendancereport/${id}`)
                ? "bg-[#008394] font-bold text-white dark:bg-DarkManager"
                : "bg-[#f4f4f4] font-normal text-[#008394] dark:text-DarkManager"
            }`}
          >
            <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white dark:bg-DarkManager">
              2
            </span>
            {t("attendans.AttendanceReport")}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="mx-auto w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] font-poppins shadow-md shadow-[#117C90] dark:shadow-DarkManager">
          <thead className={`bg-[#117C90] text-${isRTL ? 'right' : 'left'} text-white dark:bg-DarkManager`}>
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">{t("assignmentt.StudentName")}</th>
              <th className="px-3 py-2">{t("attendans.AcademicNumberr")}</th>
              <th className="px-3 py-2">{t("examst.Grade")}</th>
              <th className="px-3 py-2">{t("attendans.Classs")}</th>
              <th className="px-3 py-2 text-center">
                {t("assignmentt.Status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsforsubject
              .slice(indexOfFirstStudent, indexOfLastStudent)
              .map((student, index) => (
                <tr
                  key={student._id}
                  className={`dark:text-black ${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70 dark:hover:bg-DarkManager/70`}
                >
                  <td className="px-3 py-2">
                    {indexOfFirstStudent + index + 1}
                  </td>
                  <td className="px-3 py-2">{student.fullName}</td>
                  <td className="px-3 py-2">{student.academic_number}</td>
                  <td className="px-3 py-2">
                    {student.classId?.className || "N/A"}
                  </td>
                  <td className="px-3 py-2">
                    {student.gradeId?.gradeName || "N/A"}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer appearance-none rounded-md border-2 border-gray-400 transition-all checked:border-black checked:bg-black checked:ring-2 checked:ring-gray-600 checked:before:flex checked:before:h-full checked:before:w-full checked:before:items-center checked:before:justify-center checked:before:text-xs checked:before:text-white checked:before:content-['✔'] sm:h-5 sm:w-5 sm:checked:before:text-sm"
                      checked={attendance[student._id] || false}
                      onChange={() => toggleAttendance(student._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-7 flex justify-center lg:justify-end">
        <Pagination
          totalItems={studentsforsubject.length}
          itemsPerPage={studentsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex justify-center">
        <button
          type="submit"
          className="rounded-lg bg-[#117C90] px-6 py-3 font-poppins text-lg font-semibold text-white hover:bg-[#0f6a7d] dark:bg-DarkManager"
        >
          {t("attendans.SubmitAttendance")}
        </button>
      </form>
    </div>
  );
}

export default TakeAttendance;
