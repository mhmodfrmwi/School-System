import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchAssignedSubjects, deleteAssignedSubject } from "../AdminRedux/AssignSubjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Loader from "@/ui/Loader";
import SubjectsHeader from "./AssignSubjectHeader";
import Pagination from "../Pagination";
import { toast } from "react-toastify";

const AssignedSubjects = () => {
  const dispatch = useDispatch();
  const { assignedSubjects, loading: loadingSubjects } = useSelector((state) => state.assignSubject);
  const { grade, loading: loadingGrades } = useSelector((state) => state.grades);
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    dispatch(fetchAssignedSubjects());
    dispatch(fetchGrades());
  }, [dispatch]);

  // Apply filter and search
  const filteredSubjects = assignedSubjects
    .filter((subject) => subject.subjectId === id) // Filter by subjectId
    .filter((subject) => {
      const lowerSearchText = searchText.toLowerCase();
      // Apply filter based on filterOption and searchText
      if (filterOption) {
        return subject[filterOption]?.toLowerCase().includes(lowerSearchText);
      }
      // Default search on subject name
      return subject.subject.toLowerCase().includes(lowerSearchText);
    });

  // Add grade name to the subjects
  const subjectsWithGradeName = filteredSubjects.map((subject) => {
    const gradeName = grade.find((g) => g._id === subject.grade)?.gradeName || "Unknown";
    return { ...subject, gradeName };
  });

  // Paginate the subjects
  const paginatedSubjects = subjectsWithGradeName.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteSubject = (_id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      dispatch(deleteAssignedSubject(_id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (search) => {
    setSearchText(search);
  };

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  if (loadingSubjects || loadingGrades) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex-1">
        <div className="mx-auto w-full p-6 sm:w-[80%] md:w-[70%] xl:w-full">
          <div className="lg:px-0">
            <SubjectsHeader
              onSearchChange={handleSearchChange}
              onFilterChange={handleFilterChange}
            />

        <div className="mt-7">
          <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
                  <thead className="bg-[#117C90] text-white">
                    <tr>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Subject
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Grade
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Term
                      </th>
                      <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSubjects.length > 0 ? (
                      paginatedSubjects.map((subject, index) => (
                        <tr
                          key={subject._id || index}
                          className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}
                        >
                          <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                            {subject.subject}
                          </td>
                          <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                            {subject.gradeName}
                          </td>
                          <td className="px-3 py-2 text-xs font-poppins sm:text-sm md:text-base">
                            {subject.term}
                          </td>
                          <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                            <Link
                              to={`/admin/edit-assigned-subject/${subject._id}`}
                              className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                            >
                              <i className="far fa-edit text-lg" />
                            </Link>
                            <button
                              className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                              onClick={() => handleDeleteSubject(subject._id)}
                            >
                              <i className="far fa-trash-alt text-lg" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="rounded-lg bg-[#FFEBEB] py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                        >
                          <span className="font-poppins">No Subjects Found</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-7 flex justify-center lg:justify-end">
                <Pagination
                  totalItems={subjectsWithGradeName.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedSubjects;
