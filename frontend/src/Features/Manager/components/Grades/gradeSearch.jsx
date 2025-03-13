import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGradeResults, getClassGradeSubjectNames } from "../ManagerRedux/gradeSlice";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
function GradeManager() {
  const dispatch = useDispatch();
  const { gradeResults, classNames, gradeNames, subjectNames, loading, notFound } = useSelector(
    (state) => state.gradeManager
  );
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
  
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
      saveAs(data, 'students_results.xlsx');
    } else {
      alert("No data to export.");
    }
  };

  return (
    <div className="p-6 font-poppins bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Search Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-poppins text-[#117C90] mb-4">Grade Manager</h2>
        <div className="mt-1 h-[4px] w-[120px] rounded-full bg-[#117C90] mb-6"></div>

        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <h3 className="text-center font-poppins text-2xl font-semibold text-[#117C90] mb-6">
            Search for Results
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#117C90] mb-2">Grade Name</label>
              <select
                name="gradeName"
                value={searchData.gradeName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#BDC3C7] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#117C90] focus:border-[#117C90] transition-all"
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
              <label className="block text-sm font-medium text-[#117C90] mb-2">Class Name</label>
              <select
                name="className"
                value={searchData.className}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#BDC3C7] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#117C90] focus:border-[#117C90] transition-all"
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
              <label className="block text-sm font-medium text-[#117C90] mb-2">Subject Name</label>
              <select
                name="subjectName"
                value={searchData.subjectName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-[#BDC3C7] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#117C90] focus:border-[#117C90] transition-all"
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
            className="mt-6 w-full sm:w-auto bg-[#117C90] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0E6A7D] transition-all shadow-lg"
          >
            Search
          </button>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <>
          {loading ? (
            <div className="text-center text-[#117C90] font-poppins text-lg">Loading...</div>
          ) : notFound ? (
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-[#117C90] mb-4">No Results Found</h3>
              <p className="text-gray-600">No data found for the given criteria.</p>
            </div>
          ) : gradeResults && gradeResults.data.students.length > 0 ? (
            <div className="flex flex-col p-4">
              <div className="flex-1">
                <div className="mx-auto w-[360px] p-6 sm:w-[550px] md:w-[700px] xl:w-full">
                  <section className="max-w-6xl mx-auto">
                    <h3 className="text-center font-poppins text-2xl font-semibold text-[#117C90] mb-6">
                      Results for {gradeResults.data.grade.gradeName} - {gradeResults.data.subject.subjectName}
                    </h3>
                    <button
                      onClick={handleExportToCSV}
                      className="mb-4 bg-[#117C90] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0E6A7D] transition-all shadow-lg"
                    >
                      Export to CSV
                    </button>
                    <div className="overflow-x-auto rounded-2xl shadow-xl">
                      <table className="min-w-full bg-white">
                        <thead className="bg-[#117C90] text-white">
                          <tr>
                            <th className="py-4 px-6 text-left font-poppins text-sm font-semibold uppercase">
                              Student Name
                            </th>
                            <th className="py-4 px-6 text-left font-poppins text-sm font-semibold uppercase">
                              Academic Number
                            </th>
                            <th className="py-4 px-6 text-left font-poppins text-sm font-semibold uppercase">
                              Midterm  Degree
                            </th>
                            <th className="py-4 px-6 text-left font-poppins text-sm font-semibold uppercase">
                              Final  Degree
                            </th>
                            <th className="py-4 px-6 text-left font-poppins text-sm font-semibold uppercase">
                              Total  Degree
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {gradeResults.data.students.map((student, index) => (
                            <tr
                              key={index}
                              className={`${index % 2 === 0 ? "bg-[#F5F5F5]" : "bg-white"} hover:bg-[#117C90]/10 transition-all`}
                            >
                              <td className="py-4 px-6 text-sm font-poppins">{student.fullName}</td>
                              <td className="py-4 px-6 text-sm font-poppins">{student.academic_number}</td>
                              <td className="py-4 px-6 text-sm font-poppins">
                                {student.midterm} / {student.midtermFinalDegree}
                              </td>
                              <td className="py-4 px-6 text-sm font-poppins">
                                {student.final} / {student.finalFinalDegree}
                              </td>
                              <td className="py-4 px-6 text-sm font-poppins">
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
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-semibold text-[#117C90] mb-4">No Results Found</h3>
              <p className="text-gray-600">No SubjectScore found for the given criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GradeManager;