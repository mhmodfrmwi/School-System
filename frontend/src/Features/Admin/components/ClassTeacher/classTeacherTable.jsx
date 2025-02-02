import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClassTeachers, removeClassTeacher } from "../AdminRedux/classTeacherSlice"; 
import { fetchClasses } from "../AdminRedux/classSlice"; 
import { fetchTeachers } from "../AdminRedux/teacherSlice"; // Fetch teachers
import Pagination from "../Pagination";
import Header from "./classTeacherHeader";
import { Link, useParams } from "react-router-dom";

const ClassTeacherTable = () => {
  const { classTeachers = [], loading } = useSelector((state) => state.classTeacher || {});
  const { classes = [] } = useSelector((state) => state.classes || {}); 
  const { teachers = [] } = useSelector((state) => state.teachers || {}); // Fetch teachers from the store
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const { teacherId } = useParams(); // Get teacherId from URL

  useEffect(() => {
    dispatch(fetchClassTeachers());
    dispatch(fetchClasses()); 
    dispatch(fetchTeachers()); // Fetch teachers
  }, [dispatch]);

  const filteredClassTeachers = classTeachers.filter((classTeacher) => {
    const lowerSearchText = searchText.toLowerCase();
  
    if (teacherId) {
      // Filter by teacherId if it's provided in the URL
      return classTeacher.teacherId?._id === teacherId;
    }
  
    if (filterOption) {
      if (filterOption === "class") {
        return classTeacher.classId?.className?.toLowerCase().includes(lowerSearchText);
      }
      if (filterOption === "subject") {
        return classTeacher.subjectId?.subjectName?.toLowerCase().includes(lowerSearchText);
      }
      if (filterOption === "teacher") {
        return classTeacher.teacherId?.fullName?.toLowerCase().includes(lowerSearchText);
      }
      if (filterOption === "academicYear") {
        return (
          classTeacher.academicYear_id?.startYear
            .toString()
            .toLowerCase()
            .includes(lowerSearchText) ||
          classTeacher.academicYear_id?.endYear
            .toString()
            .toLowerCase()
            .includes(lowerSearchText)
        );
      }
    }
  
    // Default search (if no filter selected)
    return (
      classTeacher.classId?.className?.toLowerCase().includes(lowerSearchText) ||
      classTeacher.teacherId?.fullName?.toLowerCase().includes(lowerSearchText) ||
      classTeacher.subjectId?.subjectName?.toLowerCase().includes(lowerSearchText) ||
      classTeacher.academicYear_id?.startYear
        .toString()
        .toLowerCase()
        .includes(lowerSearchText) ||
      classTeacher.academicYear_id?.endYear
        .toString()
        .toLowerCase()
        .includes(lowerSearchText)
    );
  });
  

  const paginatedClassTeachers = filteredClassTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this class teacher?");
    if (confirmDelete) {
      try {
        await dispatch(removeClassTeacher(id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearchChange = (search) => {
    setSearchText(search);
    setCurrentPage(1); 
  };
  const handleFilterChange = (filter) => {
    setFilterOption(filter);
    setCurrentPage(1); 
  };

  const getClassDetails = useMemo(() => {
    return (classId) => {
      const classItem = classes.find((cls) => cls._id === classId);
      if (classItem) {
        return {
          className: classItem.class_name || classItem.className,
          gradeName: classItem.gradeId ? classItem.gradeId.gradeName || classItem.grade_id : "No Grade"
        };
      }
      return { className: "Class not found", gradeName: "No Grade" };
    };
  }, [classes]);

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t._id === teacherId);
    return teacher ? teacher.fullName : "No Teacher Assigned";
  };
  if (loading) {
    return <div className="w-full h-full"></div>; // Empty div during loading
  }
  return (
    <div className="relative w-full px-4 sm:w-full lg:px-0">
      <Header onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

      <div className="mt-7">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-[1rem] shadow-md shadow-[#117C90] bg-[#FBE9D1] overflow-hidden">
            <thead className="bg-[#117C90] text-white">
              <tr>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Class</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Subject</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Teacher</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Academic Year</th>
                <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClassTeachers.length > 0 ? (
                paginatedClassTeachers.map((classTeacher, index) => (
                  <tr key={classTeacher._id} className={`${index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"} hover:bg-[#117C90]/70`}>
                    <td className="px-3 py-2">
                      {getClassDetails(classTeacher.classId._id).className} - {getClassDetails(classTeacher.classId._id).gradeName}
                    </td>
                    <td className="px-3 py-2">{classTeacher.subjectId?.subjectName}</td>
                    <td className="px-3 py-2">{getTeacherName(classTeacher.teacherId?._id)}</td>
                    <td className="px-3 py-2">{classTeacher.academicYear_id?.startYear} - {classTeacher.academicYear_id?.endYear}</td>
                    <td className="px-3 py-2">
                      <div className="inline-flex space-x-2">
                        <Link
                          to={`/admin/edit-class-teacher/${classTeacher._id}`}
                          className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                        >
                          <i className="far fa-edit text-lg" />
                        </Link>
                        <button
                          aria-label="Delete class teacher"
                          onClick={() => handleDelete(classTeacher._id)}
                          className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                        >
                          <i className="far fa-trash-alt text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                <td colSpan="5" className="rounded-lg bg-[#F7FAFC] py-28 text-center shadow-md border-2 border-[#E3E8F1]">
                  <p className="text-lg font-semibold text-gray-600">No Class Teachers Found</p>
                  <p className="text-sm text-gray-500 mt-2">It seems like there are no class teachers in the database at the moment.</p>
                  
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
{paginatedClassTeachers.length > 0 ? (
  
        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredClassTeachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
      </div>
    </div>
  );
};

export default ClassTeacherTable;
