import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryItems, fetchLibrarySubjects, fetchMaterialsForSubject } from "../StudentRedux/libraryStudentSlice";
import { Card, CardContent } from "@/components/ui/card";

const LibraryBooksPage = () => {
  const dispatch = useDispatch();
  const { generalItems, subjects, materials, loading, error } = useSelector((state) => state.libraryStudent);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [allMaterials, setAllMaterials] = useState([]);

  useEffect(() => {
    dispatch(fetchLibraryItems());
    dispatch(fetchLibrarySubjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubject === "all") {
      // Fetch all subjects' materials
      Promise.all(subjects.map((subject) => dispatch(fetchMaterialsForSubject(subject.id))))
        .then((responses) => {
          // Extract payload (actual materials) from each response
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
      (!selectedGrade || book.grade_subject_semester_id.grade_subject_id.gradeId.gradeName === `Grade ${selectedGrade}`) &&
      (!selectedSemester || book.grade_subject_semester_id.semester_id.semesterName === `Semester ${selectedSemester}`)
    );
  });

  return (
    <div className="flex min-h-screen w-[95%] mx-auto mt-12">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
        <h2 className="text-lg font-semibold mb-4">Subjects</h2>
        <ul>
          <li className="cursor-pointer p-2 hover:bg-gray-200 rounded" onClick={() => setSelectedSubject("all")}>
            📖 All
          </li>
          <li className="cursor-pointer p-2 hover:bg-gray-200 rounded" onClick={() => setSelectedSubject("public")}>
            🌍 Public
          </li>
          {subjects.map((subject, index) => (
            <li
              key={subject.id || index}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded"
              onClick={() => setSelectedSubject(subject)}
            >
              {subject.subject}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">📚 Library Books</h1>

        {/* Filters */}
        {selectedSubject !== "all" && selectedSubject !== "public" && (
          <div className="flex justify-center gap-4 mb-6">
            <select className="p-2 border rounded" value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
              <option value="">All Grades</option>
              {[1, 2, 3, 4, 5, 6].map((grade) => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
            <select className="p-2 border rounded" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
              <option value="">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
        )}

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
                <h2 className="text-2xl font-semibold mb-4">📚 Library</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generalItems.map((item) => (
                    <Card key={item._id} className="p-4 shadow-lg border rounded-lg hover:shadow-xl transition">
                      <CardContent>
                        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                        <p className="text-gray-600">📖 Type: {item.type}</p>
                        <a href={item.item_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold mt-2 inline-block">
                          📖 View Item
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredMaterials.map((item) => (
                    <Card key={item._id} className="p-4 shadow-lg border rounded-lg hover:shadow-xl transition">
                      <CardContent>
                        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                        <p className="text-gray-600">📖 Type: {item.type}</p>
                        <a href={item.item_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold mt-2 inline-block">
                          📖 View Item
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* General Items Section */}
            {selectedSubject === "public" && generalItems.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">🌍 Public Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generalItems.map((item) => (
                    <Card key={item._id} className="p-4 shadow-lg border rounded-lg hover:shadow-xl transition">
                      <CardContent>
                        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                        <p className="text-gray-600">📖 Type: {item.type}</p>
                        <a href={item.item_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold mt-2 inline-block">
                          📖 View Item
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Subject Materials Section */}
            {selectedSubject !== "public" && selectedSubject !== "all" && filteredMaterials.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">📚 {selectedSubject.subject} Materials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMaterials.map((book) => (
                    <Card key={book._id} className="p-4 shadow-lg border rounded-lg hover:shadow-xl transition">
                      <CardContent>
                        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                        <p className="text-gray-600">📖 Type: {book.type}</p>
                        <a href={book.item_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold mt-2 inline-block">
                          📖 View Material
                        </a>
                      </CardContent>
                    </Card>
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
