import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  currentPage: number;
  numberOfPages: number;
  onPageChange?: (page: number) => void;
};

const Pagination = (props: Props) => {
  const { currentPage, numberOfPages, onPageChange } = props;
  const router = useRouter();
  const pathName = usePathname();
  const params = useSearchParams();
  const current = new URLSearchParams(Array.from(params.entries()));

  const handlePageChange = (page: number) => {
    current.set("page", String(page));
    router.push(`${pathName}?${current.toString()}`);
    onPageChange?.(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numberOfPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(numberOfPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < numberOfPages) {
      if (endPage < numberOfPages - 1) {
        pages.push("...");
      }
      pages.push(numberOfPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="btn btn-sm btn-outline"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        « Previous
      </button>

      <div className="flex gap-1">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-active" : "btn-outline"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        className="btn btn-sm btn-outline"
        onClick={handleNext}
        disabled={currentPage === numberOfPages}
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
