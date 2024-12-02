// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeTeacher,
//   fetchTeachers,
//   clearMessage,
// } from "../AdminRedux/teacherSlice";
// import Pagination from "../Pagination";
// import Header from "../Teachers/teacherHeader";

// const TeacherTable = () => {
//   const { teachers = [], message, loading } = useSelector(
//     (state) => state.teachers || {}
//   );
//   const dispatch = useDispatch();

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const [searchText, setSearchText] = useState("");
//   const [filterOption, setFilterOption] = useState("");

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedTeacherId, setSelectedTeacherId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchTeachers());
//   }, [dispatch]);

//   const filteredTeachers = teachers.filter((teacher) => {
//     const lowerSearchText = searchText.toLowerCase();
//     if (filterOption) {
//       return (
//         teacher[filterOption]?.toLowerCase().includes(lowerSearchText)
//       );
//     }
//     return (
//       teacher.name.toLowerCase().includes(lowerSearchText) ||
//       teacher.email.toLowerCase().includes(lowerSearchText)
//     );
//   });

//   const paginatedTeachers = filteredTeachers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleDelete = (id) => {
//     setSelectedTeacherId(id);
//     setShowConfirm(true);
//   };

//   const confirmDelete = () => {
//     dispatch(removeTeacher(selectedTeacherId));
//     setShowConfirm(false);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSearchChange = (search) => {
//     setSearchText(search);
//   };

//   const handleFilterChange = (filter) => {
//     setFilterOption(filter);
//   };

//   useEffect(() => {
//     if (message) {
//       setTimeout(() => {
//         dispatch(clearMessage());
//       }, 5000);
//     }
//   }, [message, dispatch]);

//   return (
//     <div className="mx-auto px-4 lg:px-0">
//       <Header
//         onSearchChange={handleSearchChange}
//         onFilterChange={handleFilterChange}
//       />
  
//       {message && (
//         <div className="mb-4 mt-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-3 text-green-800 shadow-md">
//           {message}
//         </div>
//       )}
  
//       <div className="mt-7">
//         <table className="w-full table-auto border-collapse rounded-2xl bg-[#FBE9D1]">
//           <thead className="bg-[#FFFFFF] text-black shadow-md shadow-[#117C90]">
//             <tr>
//               <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
//                 Name
//               </th>
//               <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
//                 Subject
//               </th>
//               <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
//                 Class
//               </th>
//               <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
//                 Email
//               </th>
//               <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
//                 Gender
//               </th>
//               <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedTeachers.length > 0 ? (
//               paginatedTeachers.map((teacher, index) => (
//                 <tr
//                   key={teacher.id}
//                   className={`${
//                     index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
//                   } hover:bg-[#117C90]/70`}
//                 >
//                   <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
//                     <span className="truncate font-poppins">{teacher.name}</span>
//                   </td>
//                   <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
//                     {teacher.subject}
//                   </td>
//                   <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
//                     {teacher.class}
//                   </td>
//                   <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
//                     {teacher.email}
//                   </td>
//                   <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
//                     {teacher.gender}
//                   </td>
//                   <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
//                     <button
//                       aria-label="Edit teacher"
//                       onClick={() => {}}
//                       className="text-[#117C90] transition duration-300 hover:text-[#244856]"
//                     >
//                       <i className="far fa-edit text-lg" />
//                     </button>
//                     <button
//                       aria-label="Delete teacher"
//                       onClick={() => handleDelete(teacher.id)}
//                       className="text-[#E74833] transition duration-300 hover:text-[#244856]"
//                     >
//                       <i className="far fa-trash-alt text-lg" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="rounded-lg bg-[#FFEBEB] py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
//                 >
//                   <span className="font-poppins">No Teachers Found</span>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
  
//         <div className="mt-7 flex justify-center lg:justify-end">
//           <Pagination
//             totalItems={filteredTeachers.length}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherTable;












import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTeacher,
  fetchTeachers,
  clearMessage,
} from "../AdminRedux/teacherSlice";
import Pagination from "../Pagination";
import Header from "../Teachers/teacherHeader";

const TeacherTable = () => {
  const { teachers = [], message, loading } = useSelector(
    (state) => state.teachers || {}
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  // Fetch teachers on mount
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Filter teachers based on search and filter options
  const filteredTeachers = teachers.filter((teacher) => {
    const lowerSearchText = searchText.toLowerCase();
    if (filterOption) {
      return (
        teacher[filterOption]?.toLowerCase().includes(lowerSearchText)
      );
    }
    return (
      teacher.name.toLowerCase().includes(lowerSearchText) ||
      teacher.email.toLowerCase().includes(lowerSearchText)
    );
  });

  // Paginate teachers based on current page
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete teacher
  const handleDelete = (id) => {
    setSelectedTeacherId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(removeTeacher(selectedTeacherId));
    setShowConfirm(false);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (search) => {
    setSearchText(search);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  }, [message, dispatch]);

  return (
    <div className="mx-auto px-4 lg:px-0">
      <Header
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      {message && (
        <div className="mb-4 mt-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-3 text-green-800 shadow-md">
          {message}
        </div>
      )}

      <div className="mt-7">
        <table className="w-full table-auto border-collapse rounded-2xl bg-[#FBE9D1]">
          <thead className="bg-[#FFFFFF] text-black shadow-md shadow-[#117C90]">
            <tr>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Name
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Subject
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Class
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Email
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Gender
              </th>
              <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeachers.length > 0 ? (
              paginatedTeachers.map((teacher, index) => (
                <tr
                  key={teacher.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                  } hover:bg-[#117C90]/70`}
                >
                  <td className="flex items-center px-3 py-2 text-xs sm:text-sm md:text-base">
                    <span className="truncate font-poppins">{teacher.name}</span>
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.subject}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.class}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.email}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm md:text-base">
                    {teacher.gender}
                  </td>
                  <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                    <button
                      aria-label="Edit teacher"
                      onClick={() => {}}
                      className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-edit text-lg" />
                    </button>
                    <button
                      aria-label="Delete teacher"
                      onClick={() => handleDelete(teacher.id)}
                      className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                    >
                      <i className="far fa-trash-alt text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="rounded-lg bg-[#FFEBEB] py-12 text-center text-xs text-[#244856] sm:text-sm md:text-base"
                >
                  <span className="font-poppins">No Teachers Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-7 flex justify-center lg:justify-end">
          <Pagination
            totalItems={filteredTeachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {showConfirm && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-medium">Are you sure you want to delete this teacher?</h3>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 rounded-md text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherTable;
