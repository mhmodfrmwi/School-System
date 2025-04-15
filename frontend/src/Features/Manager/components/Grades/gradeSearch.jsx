import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGradeResults,
  getClassGradeSubjectNames,
} from "../ManagerRedux/gradeSlice";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
function GradeManager() {
  const dispatch = useDispatch();
  const {
    gradeResults,
    classNames,
    gradeNames,
    subjectNames,
    loading,
    notFound,
  } = useSelector((state) => state.gradeManager);
  const [searchData, setSearchData] = useState({
    gradeName: "",
    className: "",
    subjectName: "",
  });
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    dispatch(getClassGradeSubjectNames());
  }, [dispatch]);

  const handleSearch = () => {
    const { gradeName, className, subjectName } = searchData;
    if (gradeName && className && subjectName) {
      setHasSearched(true);
      dispatch(getGradeResults({ gradeName, className, subjectName }));
    } else {
      alert("Please select grade, class, and subject.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportToCSV = () => {
    if (gradeResults && gradeResults.data.students.length > 0) {
      const formattedData = gradeResults.data.students.map((student) => ({
        "Student Name": student.fullName,
        "Academic Number": student.academic_number,
        "Midterm Degree": `${student.midterm} / ${student.midtermFinalDegree}`,
        "Final Degree": `${student.final} / ${student.finalFinalDegree}`,
        "Total Degree": `${student.total} / ${student.totalFinalDegree}`,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      saveAs(data, "students_results.xlsx");
    } else {
      alert("No data to export.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-poppins">
      {/* Search Section */}
      <section className="mx-auto max-w-6xl">
        <h2 className="dark:text-DarkManager mb-4 font-poppins text-3xl font-bold text-[#117C90]">
          Grade Manager
        </h2>
        <div className="dark:bg-DarkManager mb-6 mt-1 h-[4px] w-[120px] rounded-full bg-[#117C90]"></div>

        <div className="dark:bg-DarkManager2 mb-8 rounded-2xl bg-white p-8 shadow-xl">
          <h3 className="mb-6 text-center font-poppins text-2xl font-semibold text-[#117C90] dark:text-white">
            Search for Results
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#117C90] dark:text-white">
                Grade Name
              </label>
              <select
                name="gradeName"
                value={searchData.gradeName}
                onChange={handleInputChange}
                className="dark:focus:ring-DarkManager dark:focus:border-DarkManager mt-1 block w-full rounded-lg border border-[#BDC3C7] p-3 shadow-sm transition-all focus:border-[#117C90] focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              >
                <option value="">Select Grade</option>
                {gradeNames.map((grade, index) => (
                  <option key={index} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#117C90] dark:text-white">
                Class Name
              </label>
              <select
                name="className"
                value={searchData.className}
                onChange={handleInputChange}
                className="dark:focus:ring-DarkManager dark:focus:border-DarkManager mt-1 block w-full rounded-lg border border-[#BDC3C7] p-3 shadow-sm transition-all focus:border-[#117C90] focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              >
                <option value="">Select Class</option>
                {classNames.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#117C90] dark:text-white">
                Subject Name
              </label>
              <select
                name="subjectName"
                value={searchData.subjectName}
                onChange={handleInputChange}
                className="dark:focus:ring-DarkManager dark:focus:border-DarkManager mt-1 block w-full rounded-lg border border-[#BDC3C7] p-3 shadow-sm transition-all focus:border-[#117C90] focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              >
                <option value="">Select Subject</option>
                {subjectNames.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="mt-6 w-full rounded-lg bg-[#117C90] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#0E6A7D] dark:bg-white dark:text-black sm:w-auto"
          >
            Search
          </button>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <>
          {loading ? (
            <div className="text-center font-poppins text-lg text-[#117C90]">
              Loading...
            </div>
          ) : notFound ? (
            <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 text-center shadow-xl">
              <h3 className="dark:text-DarkManager mb-4 text-2xl font-semibold text-[#117C90]">
                No Results Found
              </h3>
              <p className="text-gray-600">
                No data found for the given criteria.
              </p>
            </div>
          ) : gradeResults && gradeResults.data.students.length > 0 ? (
            <div className="flex flex-col p-4">
              <div className="flex-1">
                <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                  <section className="mx-auto max-w-6xl">
                    <h3 className="dark:text-DarkManager mb-6 text-center font-poppins text-2xl font-semibold text-[#117C90]">
                      Results for {gradeResults.data.grade.gradeName} -{" "}
                      {gradeResults.data.subject.subjectName}
                    </h3>
                    <button
                      onClick={handleExportToCSV}
                      className="dark:bg-DarkManager mb-4 rounded-lg bg-[#117C90] px-4 py-2 font-semibold text-white shadow-lg transition-all hover:bg-[#0E6A7D]"
                    >
                      Export to CSV
                    </button>
                    <div className="overflow-x-auto rounded-2xl shadow-xl">
                      <table className="min-w-full bg-white">
                        <thead className="dark:bg-DarkManager bg-[#117C90] text-white">
                          <tr>
                            <th className="px-6 py-4 text-left font-poppins text-sm font-semibold uppercase">
                              Student Name
                            </th>
                            <th className="px-6 py-4 text-left font-poppins text-sm font-semibold uppercase">
                              Academic Number
                            </th>
                            <th className="px-6 py-4 text-left font-poppins text-sm font-semibold uppercase">
                              Midterm Degree
                            </th>
                            <th className="px-6 py-4 text-left font-poppins text-sm font-semibold uppercase">
                              Final Degree
                            </th>
                            <th className="px-6 py-4 text-left font-poppins text-sm font-semibold uppercase">
                              Total Degree
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {gradeResults.data.students.map((student, index) => (
                            <tr
                              key={index}
                              className={`${index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"} dark:hover:bg-DarkManager/10 transition-all hover:bg-[#117C90]/10 dark:text-black`}
                            >
                              <td className="px-6 py-4 font-poppins text-sm">
                                {student.fullName}
                              </td>
                              <td className="px-6 py-4 font-poppins text-sm">
                                {student.academic_number}
                              </td>
                              <td className="px-6 py-4 font-poppins text-sm">
                                {student.midterm} / {student.midtermFinalDegree}
                              </td>
                              <td className="px-6 py-4 font-poppins text-sm">
                                {student.final} / {student.finalFinalDegree}
                              </td>
                              <td className="px-6 py-4 font-poppins text-sm">
                                {student.total} / {student.totalFinalDegree}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 text-center shadow-xl">
              <h3 className="dark:text-DarkManager mb-4 text-2xl font-semibold text-[#117C90]">
                No Results Found
              </h3>
              <p className="text-gray-600">
                No SubjectScore found for the given criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GradeManager;
