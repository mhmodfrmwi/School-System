import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryItems, fetchLibrarySubjects, fetchMaterialsForSubject } from "../StudentRedux/libraryStudentSlice";
import img1 from "../../../../assets/cover22 1.png"; 
import img2 from "../../../../assets/Rectangle 314.png";

const LibraryBooksPage = () => {
  const dispatch = useDispatch();
  const { generalItems, subjects, materials, loading, error } = useSelector((state) => state.libraryStudent);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [allMaterials, setAllMaterials] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  useEffect(() => {
    dispatch(fetchLibraryItems());
    dispatch(fetchLibrarySubjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubject === "all") {
      Promise.all(subjects.map((subject) => dispatch(fetchMaterialsForSubject(subject.id))))
        .then((responses) => {
          const combinedMaterials = responses.map((res) => res.payload).flat();
          setAllMaterials(combinedMaterials);
        })
        .catch((err) => console.error("Error fetching all materials:", err));
    } else if (selectedSubject !== "public" && selectedSubject.id) {
      dispatch(fetchMaterialsForSubject(selectedSubject.id));
    }
  }, [selectedSubject, subjects, dispatch]);

  const displayedMaterials = selectedSubject === "all" ? allMaterials : materials;

  const filteredMaterials = displayedMaterials.filter((book) => {
    return (
      (!selectedGrade || book.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName === `Grade ${selectedGrade}`) &&
      (!selectedSemester || book.grade_subject_semester_id?.semester_id?.semesterName === `Semester ${selectedSemester}`)
    );
  });

  return (
    <div className="flex min-h-screen w-[95%] mx-auto mt-20 mb-20 font-poppins">
      {/* Sidebar Toggle Button for Small Screens */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-24 left-5 z-50 p-2 bg-gray-100 rounded-lg shadow md:hidden"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative z-40 w-64 bg-gray-100 p-6 border h-fit min-h-[75vh] shadow transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
          Subjects
        </h2>
        <ul>
          <li className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded" onClick={() => {
            setSelectedSubject("all");
            setIsSidebarOpen(!isSidebarOpen)}}>
            <input
              type="radio"
              name="subject"
              checked={selectedSubject === "all"}
              onChange={() => setSelectedSubject("all")}
              className="form-radio h-4 w-4 text-[#BC6FFB] border-[#BC6FFB] focus:ring-[#BC6FFB]"
            />
            <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
              All
            </span>
          </li>
          <li className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded" onClick={() =>{
            setSelectedSubject("public");
            setIsSidebarOpen(!isSidebarOpen)}}>
            <input
              type="radio"
              name="subject"
              checked={selectedSubject === "public"}
              onChange={() => setSelectedSubject("public")}
              className="form-radio h-4 w-4 text-[#BC6FFB] border-[#BC6FFB] focus:ring-[#BC6FFB]"
            />
            <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
              Public
            </span>
          </li>
          {subjects.map((subject, index) => (
            <li
              key={subject.id || index}
              className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded"
              onClick={() => {setSelectedSubject(subject);
                setIsSidebarOpen(!isSidebarOpen)
              }}
            >
              <input
                type="radio"
                name="subject"
                checked={selectedSubject === subject}
                onChange={() => setSelectedSubject(subject)}
                className="form-radio h-4 w-4 text-[#BC6FFB] border-[#BC6FFB] focus:ring-[#BC6FFB]"
              />
              <span className="ml-2 text-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-transparent">
                {subject.subject}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 pl-8">
        {/* Books List */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div>
            {/* All library Section */}
            {selectedSubject === "all" && (generalItems.length > 0 || filteredMaterials.length > 0) && (
              <div>
                <div className="flex justify-center items-center md:items-start md:justify-start">
                  <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
                    Library
                    <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                  {generalItems.map((item) => (
                    <div key={item._id} className="mx-auto w-60">
                      <div className="relative w-60 h-[350px]">
                        <img src={img1} alt="imagenotfound" className="w-60 h-[350px] object-cover" />
                        <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 pb-4 pt-2">
                          <h2 className="flex items-center justify-center text-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                            {item.title}
                          </h2>
                          <img src={img2} className="mx-auto h-[250px] object-contain" alt="" />
                          <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white text-center text-black">
                            1
                          </p>
                          <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                            {item.author}
                          </h3>
                        </div>
                      </div>
                      <h2 className="mt-3 font-semibold text-center w-40 mx-auto">General</h2>
                    </div>
                  ))}
                  {filteredMaterials.map((item) => (
                    <div key={item._id} className="mx-auto w-60">
                      <div className="relative w-60 h-[350px]">
                        <img src={img1} alt="imagenotfound" className="w-60 h-[350px] object-cover" />
                        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                          <h2 className="flex items-center justify-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                            {item.title}
                          </h2>
                          <img src={img2} className="mx-auto h-[250px] object-contain" alt="" />
                          <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white text-center text-black">
                            1
                          </p>
                          <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                            {item.type}
                          </h3>
                        </div>
                      </div>
                      <h2 className="mt-3 font-semibold text-center w-40 mx-auto">
                        {item.grade_subject_semester_id?.grade_subject_id?.subjectId?.subjectName} - {item.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Items Section */}
            {selectedSubject === "public" && generalItems.length > 0 && (
              <div>
                <div className="flex justify-center items-center md:items-start md:justify-start">
                  <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
                    Public Library
                    <span className="absolute left-0 bottom-[-9px] w-[85px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                  {generalItems.map((item) => (
                    <div key={item._id} className="mx-auto w-60">
                      <div className="relative w-60 h-[350px]">
                        <img src={img1} alt="imagenotfound" className="w-60 h-[350px] object-cover" />
                        <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 pb-4 pt-2">
                          <h2 className="flex items-center justify-center text-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                            {item.title}
                          </h2>
                          <img src={img2} className="mx-auto h-[250px] object-contain" alt="" />
                          <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white text-center text-black">
                            1
                          </p>
                          <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                            {item.author}
                          </h3>
                        </div>
                      </div>
                      <h2 className="mt-3 font-semibold text-center w-40 mx-auto">General</h2>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subject Materials Section */}
            {selectedSubject !== "public" && selectedSubject !== "all" && filteredMaterials.length > 0 && (
              <div>
                <div className="flex flex-row justify-between items-center mb-8">
                  <div className="flex justify-center items-center md:items-start md:justify-start">
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] relative">
                      {selectedSubject.subject} Materials
                      <span className="absolute left-0 bottom-[-9px] w-[85px] md:w-[155px] h-[4px] bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] rounded-t-full"></span>
                    </h2>
                  </div>
                  <div className="flex flex-row gap-4 mt-4 sm:mt-0">
                    <select
                      className="p-2 border rounded"
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                    >
                      <option value="">All Grades</option>
                      {[1, 2, 3, 4, 5, 6].map((grade) => (
                        <option key={grade} value={grade}>
                          Grade {grade}
                        </option>
                      ))}
                    </select>
                    <select
                      className="p-2 border rounded"
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                      <option value="">All Semesters</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
                  {filteredMaterials.map((item) => (
                    <div key={item._id} className="mx-auto w-60">
                      <div className="relative w-60 h-[350px]">
                        <img src={img1} alt="imagenotfound" className="w-60 h-[350px] object-cover" />
                        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 pt-2">
                          <h2 className="flex items-center justify-center font-semibold text-[15px] text-white line-clamp-2 pb-2 h-[50px]">
                            {item.title}
                          </h2>
                          <img src={img2} className="mx-auto h-[250px] object-contain" alt="" />
                          <p className="z-15 absolute left-28 mx-auto top-[285px] size-5 rounded-full bg-white text-center text-black">
                            1
                          </p>
                          <h3 className="flex items-center justify-center h-[40px] pt-5 text-[13px] text-white line-clamp-1">
                            {item.type}
                          </h3>
                        </div>
                      </div>
                      <h2 className="mt-3 font-semibold text-center w-40 mx-auto">
                        {item.grade_subject_semester_id?.grade_subject_id?.subjectId?.subjectName} - {item.grade_subject_semester_id?.grade_subject_id?.gradeId?.gradeName}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryBooksPage;