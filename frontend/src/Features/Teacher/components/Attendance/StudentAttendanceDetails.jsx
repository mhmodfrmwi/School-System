import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchClassAttendance } from "../TeacherRedux/takeAttendanceSlice";
import Loader from "@/ui/Loader";
import { useTranslation } from 'react-i18next';
function StudentAttendanceDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const student = location.state?.student;

  const dispatch = useDispatch();
  const { attendanceRecords = [], status } = useSelector(
    (state) => state.attendanceTeacher || {},
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchClassAttendance({ id }));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return (
      <div className="text-center text-red-500">
        Failed to load attendance details.
      </div>
    );
  }

  const studentRecords = attendanceRecords.filter(
    (record) => record.student_id._id === id,
  );

  const attendanceStats = studentRecords.reduce((acc, record) => {
    const formattedDate = new Date(record.date).toISOString().split("T")[0];

    if (!acc[formattedDate]) {
      acc[formattedDate] = { isAbsent: false, isPresent: false };
    }

    if (record.status === "A") {
      acc[formattedDate].isAbsent = true;
    } else if (record.status === "P") {
      acc[formattedDate].isPresent = true;
    }

    return acc;
  }, {});

  const totalAbsences = Object.values(attendanceStats).filter(
    (r) => r.isAbsent && !r.isPresent,
  ).length;
  const totalAttendances = Object.values(attendanceStats).filter(
    (r) => r.isPresent && !r.isAbsent,
  ).length;

  return (
    <div className="mx-auto w-full max-w-2xl p-6 font-poppins">
      <h2 className="mb-6 text-center text-2xl font-bold text-[#117C90] dark:text-DarkManager">
      {t("attendans.AttendanceDetails")} {student?.fullName || "Unknown"}
      </h2>

      <div className="rounded-lg border bg-white p-4 shadow-md dark:text-black">
        <p className="mb-2">
          <strong>{t("attendans.AcademicNumber")}:</strong> {student?.academicNumber || "N/A"}
        </p>
        <p className="mb-2">
          <strong>{t("attendans.Class")}:</strong> {student?.className || "Unknown"}
        </p>
        <p className="mb-2">
          <strong>{t("attendans.TotalAbsences")}:</strong> {totalAbsences}
        </p>
        <p className="mb-2">
          <strong>{t("attendans.TotalAttendances")}:</strong> {totalAttendances}
        </p>
      </div>

      {Object.keys(attendanceStats).length > 0 ? (
        <div className="mt-6 max-h-[300px] overflow-auto border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#117C90] text-white dark:bg-DarkManager">
                <th className="border p-2">{t("attendans.Date")}</th>
                <th className="border p-2"> {t("attendans.Status")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendanceStats).map(
                ([date, { isAbsent, isPresent }]) => (
                  <tr key={date} className="border text-center dark:text-black">
                    <td className="border p-2">{date}</td>
                    <td className="border p-2 font-bold">
                      {isAbsent ? (
                        <span className="text-red-500">Absent</span>
                      ) : isPresent ? (
                        <span className="text-green-500">Present</span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-500">
          No attendance records found.
        </div>
      )}
    </div>
  );
}

export default StudentAttendanceDetails;
