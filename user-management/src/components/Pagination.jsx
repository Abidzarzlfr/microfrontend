import React from "react";
import "./Pagination.css"; // Impor berkas CSS untuk gaya pagination

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-container">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
