import React from "react";
import ElementRecommended from "../components/elements/ElementRecommended";

const Recommended = (props) => {
  const recomendedMovies = props.recomendedMovies;
  const setSelectedMovieId = props.setSelectedMovieId;
  return (
    <div className="movie-list">
      {recomendedMovies.map((element) => {
        return (
          <ElementRecommended
            key={element.id}
            element={element}
            setSelectedMovieId={setSelectedMovieId}
          />
        );
      })}
    </div>
  );
};

export default Recommended;
