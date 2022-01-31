import React from "react";
import "../Style/Pagination.css";

const Pagination = (props) => {
  const prev = props.prev;
  const next = props.next;
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;
  return (
    <div className="pagination-container">
      {currentPage - 1 === 0 ? (
        <button style={{ visibility: "hidden" }}></button>
      ) : (
        <button onClick={prev}>
          <i class="fas fa-arrow-left"></i> Page {currentPage - 1}
        </button>
      )}
      {currentPage === totalPages ? (
        <button style={{ visibility: "hidden" }}></button>
      ) : (
        <button onClick={next}>
          Page {currentPage + 1} <i class="fas fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
};

export default Pagination;
