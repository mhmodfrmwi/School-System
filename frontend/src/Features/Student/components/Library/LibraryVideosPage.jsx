import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryItems, fetchLibrarySubjects } from "../StudentRedux/libraryStudentSlice";
import { Card, CardContent } from "@/components/ui/card";

const LibraryVideosPage = () => {
  const dispatch = useDispatch();
  const { generalItems, subjects, loading, error } = useSelector((state) => state.libraryStudent);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    dispatch(fetchLibraryItems());
    dispatch(fetchLibrarySubjects());
  }, [dispatch]);

  const filteredVideos = generalItems.filter(
    (item) => item.type === "VIDEO" && (selectedSubject ? item.grade_subject_semester_id._id === selectedSubject : true)
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 Library Videos</h1>

      {/* Subject Filter */}
      <div className="flex justify-center mb-6">
        <select
          className="w-64 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">🎬 All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.subject} - {subject.grade} ({subject.semester})
            </option>
          ))}
        </select>
      </div>

      {/* Videos List */}
      {loading ? (
       loading
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video._id} className="p-4 shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition">
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-500">👤 Uploaded by: {video.uploaded_by.fullName}</p>
                <a
                  href={video.item_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-semibold mt-2 inline-block"
                >
                  ▶️ Watch Video
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryVideosPage;
