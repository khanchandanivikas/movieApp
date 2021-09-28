import React from "react";
import ElementMovies from "../Components/Elements/ElementMovies";

const Popular = (props) => {
  const movieList = props.movieList;
  const setSelectedMovieId = props.setSelectedMovieId;
  return (
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
  );
};

export default Popular;
