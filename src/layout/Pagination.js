

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ totalPages, currentPage, searchParams }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setLoading(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    router.push(`/properties?${newParams.toString()}`);
    setLoading(false);
  };

  // Generate pages array
  const getPages = () => {
    const maxVisible = 4;
    let start = Math.max(1, currentPage - 1); // sliding window
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if less than maxVisible pages at end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  if (totalPages <= 1) return null;

  return (
    <nav className="theme-pagination">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(1)}>«</div>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(currentPage - 1)}>{"<"}</div>
        </li>

        {pages.map((p,index) => (
          <li key={index} className={`page-item ${p === currentPage ? "active" : ""}`}>
            <div className="page-link" onClick={() => goToPage(p)}>{loading && p===currentPage ? "...": p}</div>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(currentPage + 1)}>{">"}</div>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <div className="page-link" onClick={() => goToPage(totalPages)}>»</div>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
