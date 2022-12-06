import React from "react";
import ElementGenres from "../components/elements/ElementGenres";
import Pagination from "../components/Pagination";

const Genres = (props) => {
  const genreMovies = props.genreMovies;
  const setSelectedMovieId = props.setSelectedMovieId;
  const prev = props.prev;
  const next = props.next;
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;

  return (
    <div>
      <div className="movie-list">
        {genreMovies.map((element) => {
          return (
            <ElementGenres
              key={element.id}
              element={element}
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

export default Genres;
