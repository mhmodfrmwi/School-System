import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchAssignedSubjects,
  deleteAssignedSubject,
} from "../AdminRedux/AssignSubjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Loader from "@/ui/Loader";
import SubjectsHeader from "./AssignSubjectHeader";
import Pagination from "../Pagination";

const AssignedSubjects = () => {
  const dispatch = useDispatch();
  const { assignedSubjects, loading: loadingSubjects } = useSelector(
    (state) => state.assignSubject
  );
  const { grades, loading: loadingGrades } = useSelector(
    (state) => state.grades
  );
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
        if (subject[filterOption]) {
          return subject[filterOption]?.toLowerCase().includes(lowerSearchText);
        }
        return false; // If filterOption is not found in the subject
      }
      // Default search on subject name
      return (
        subject.subject.toLowerCase().includes(lowerSearchText) ||
        subject.gradeName?.toLowerCase().includes(lowerSearchText) ||
        subject.term?.toLowerCase().includes(lowerSearchText)
      );
    });

  // Add grade name to the subjects
  const subjectsWithGradeName = filteredSubjects.map((subject) => {
    const gradeName =
      grades?.find((g) => g._id === subject.grade)?.gradeName || "Unknown";
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

  // Show loading state while data is being fetched
  if (loadingSubjects || loadingGrades) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Show empty div while loading subjects
  if (loadingSubjects) {
    return <div className="w-full h-full"></div>; // Empty div during loading
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
                <table className="w-full table-auto border-collapse overflow-hidden rounded-[1rem] bg-[#FBE9D1] shadow-md shadow-[#117C90]">
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
                          className={`${
                            index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                          } hover:bg-[#117C90]/70`}
                        >
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {subject.subject}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                            {subject.gradeName}
                          </td>
                          <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
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
                          className="rounded-lg bg-[#F7FAFC] py-28 text-center shadow-md border-2 border-[#E3E8F1]"
                        >
                          <p className="text-lg font-semibold text-gray-600">
                            No Subjects Found
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            It seems like there are no subjects in the database at the moment.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {paginatedSubjects.length > 0 ? (
                <div className="mt-7 flex justify-center lg:justify-end">
                  <Pagination
                    totalItems={subjectsWithGradeName.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedSubjects;
