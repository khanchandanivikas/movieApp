import React from "react";
import ElementMovies from "../components/elements/ElementMovies";
import Pagination from "../components/Pagination";

const Popular = (props) => {
  const movieList = props.movieList;
  const setSelectedMovieId = props.setSelectedMovieId;
  const prev = props.prev;
  const next = props.next;
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;
  return (
    <div>
      <div className="movie-list">
        {movieList.map((movie) => {
          return (
            <ElementMovies
              key={movie.id}
              movie={movie}
              setSelectedMovieId={setSelectedMovieId}
            />
          );
        })}
      </div>
      <Pagination
        prev={prev}
        next={next}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Popular;
