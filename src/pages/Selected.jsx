import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../Style/Selected.css";
import Recommended from "../Components/Recommended";

const Selected = (props) => {
  const selectedMovie = props.selectedMovie;
  const recomendedMovies = props.recomendedMovies;
  const setSelectedMovieId = props.setSelectedMovieId;
  var url = `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`;
  const percentage = (selectedMovie.vote_average / 10) * 100;
  return (
    <div>
      <div className="selected-container">
        <div className="selected-img-container">
          <img className="selected-img" src={url} alt="selected movie" />
        </div>
        <div className="selected-text">
          <h1>{selectedMovie.title}</h1>
          <h2 className="selected-title">{selectedMovie.tagline}</h2>
          {/* <div className="selected-genre-list">
            {selectedMovie.genres.length > 0 && selectedMovie.genres.map((genre) => {
              return <p className="selected-genre-text">{genre.name}</p>;
            })}
          </div> */}
          <h4>
            <span>{selectedMovie.release_date}</span>{" "}
            <span>{selectedMovie.runtime}Mins</span>
          </h4>
          <div style={{ width: "100px", height: "100px", padding: "5px" }}>
            <CircularProgressbar
              value={percentage}
              text={`${selectedMovie.vote_average}`}
            />
          </div>
          <h3>OVERVIEW</h3>
          <p>{selectedMovie.overview}</p>
        </div>
      </div>
      <h2 style={{ margin: "3rem 1rem" }}>RECOMMENDED</h2>
      <Recommended
        key={recomendedMovies.id}
        recomendedMovies={recomendedMovies}
        setSelectedMovieId={setSelectedMovieId}
      />
    </div>
  );
};

export default Selected;
