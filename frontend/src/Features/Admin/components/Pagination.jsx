import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle pagination for next and previous buttons
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Generate page numbers with a limit
  const pageNumbers = [];
  const pageLimit = 3; // Show a maximum of 3 page numbers at a time
  let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  let endPage = Math.min(totalPages, startPage + pageLimit - 1);

  if (endPage - startPage < pageLimit - 1) {
    startPage = Math.max(1, endPage - pageLimit + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-1 mt-4 mb-6">
      {/* Previous Button */}
      <button
        onClick={handlePrevPage}
        className={`w-6 h-6 text-center rounded-full ${
          currentPage === 1
            ? "text-[#117C90] cursor-not-allowed"
            : "bg-[#90AEAE] text-white hover:bg-[#117C90]"
        }`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-6 h-6 text-center rounded-full mx-1 text-sm ${
            currentPage === page
              ? "bg-[#117C90] text-white"  // Active page background
              : "bg-transparent text-[#117C90] hover:bg-[#117C90] hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNextPage}
        className={`w-6 h-6 text-center rounded-full ${
          currentPage === totalPages
            ? "text-[#117C90] cursor-not-allowed"
            : "bg-[#90AEAE] text-white hover:bg-[#117C90]"
        }`}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
