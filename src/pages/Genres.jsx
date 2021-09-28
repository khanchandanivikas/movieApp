import React from "react";
import ElementGenres from "../Components/Elements/ElementGenres";

const Genres = (props) => {
  const genreMovies = props.genreMovies;
  const setSelectedMovieId = props.setSelectedMovieId;
  return (
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
  );
};

export default Genres;
