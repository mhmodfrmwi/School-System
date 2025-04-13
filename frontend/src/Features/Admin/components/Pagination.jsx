import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
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
    <div className="mb-6 mt-4 flex items-center justify-center pt-4">
      <button
        onClick={handlePrevPage}
        className={`rounded-lg px-3 py-2 text-center ${
          currentPage === 1
            ? "cursor-not-allowed text-[#117C90] dark:text-[#043B44]"
            : "bg-[#90AEAE] text-white hover:bg-[#117C90] dark:hover:bg-[#043B44]"
        }`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-0 rounded-lg px-3 py-2 text-center text-sm ${
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
        className={`rounded-lg px-3 py-2 text-center ${
          currentPage === totalPages
            ? "cursor-not-allowed text-[#117C90] dark:text-[#043B44]"
            : "bg-[#90AEAE] text-white hover:bg-[#117C90] hover:text-white dark:bg-[#90AEAE] dark:hover:bg-[#043B44]"
        }`}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
