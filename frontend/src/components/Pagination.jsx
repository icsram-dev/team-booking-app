export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
      <div className="flex w-full justify-center mb-40 mt-10">
        <button
          onClick={handlePreviousPage}
          className={`flex items-center justify-center px-4 h-10 me-3 text-base font-medium ${currentPage === 1 ? 'text-gray-400 bg-gray-200' : 'text-gray-500 bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          disabled={currentPage === 1}
        >
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          Előző
        </button>
        <button
          onClick={handleNextPage}
          className={`flex items-center justify-center px-4 h-10 text-base font-medium ${currentPage === totalPages ? 'text-gray-400 bg-gray-200' : 'text-gray-500 bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          disabled={currentPage === totalPages}
        >
          Következő
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
    );
  }