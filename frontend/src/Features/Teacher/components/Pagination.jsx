import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pageNumbers = [];
  const pageLimit = 3;
  let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  let endPage = Math.min(totalPages, startPage + pageLimit - 1);

  if (endPage - startPage < pageLimit - 1) {
    startPage = Math.max(1, endPage - pageLimit + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4 pt-4 mb-6">
      <button
        onClick={handlePrevPage}
        className={`px-3 py-2 text-center rounded-lg ${
          currentPage === 1
            ? "text-[#117C90] cursor-not-allowed dark:text-[#043B44]"
            : "bg-[#90AEAE] text-white hover:bg-[#117C90] dark:bg-[#90AEAE] dark:hover:bg-[#043B44]"
        }`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-center rounded-lg mx-0 text-sm ${
            currentPage === page
              ? "bg-[#117C90] text-white dark:bg-[#043B44]"
              : "bg-transparent text-[#117C90] hover:bg-[#117C90] hover:text-white dark:text-[#043B44] dark:hover:bg-[#043B44] dark:hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        className={`px-3 py-2 text-center rounded-lg ${
          currentPage === totalPages
            ? "text-[#117C90] cursor-not-allowed dark:text-[#043B44]"
            : "bg-[#90AEAE] text-white hover:bg-[#117C90] dark:bg-[#90AEAE] dark:hover:bg-[#043B44]"
        }`}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;