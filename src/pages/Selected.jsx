import React from "react";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../style/selected.css";
import Recommended from "../components/Recommended";
import VideoModal from "../components/VideoModal";

const Selected = (props) => {
  const selectedMovie = props.selectedMovie;
  const selectedMovieTrailer = props.selectedMovieTrailer;
  const selectedMovieGenres = props.selectedMovieGenres;
  const recomendedMovies = props.recomendedMovies;
  const setSelectedMovieId = props.setSelectedMovieId;
  var url = `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`;
  const percentage = Math.ceil((selectedMovie.vote_average / 10) * 100);
  const [videoPopup, setVideoPopup] = useState(false);
  const toggleVideoPopup = () => {
    setVideoPopup(!videoPopup);
  };
  return (
    <div key={selectedMovie.id}>
      <div className="selected-container">
        <div className="selected-img-container">
          <img className="selected-img" src={url} alt="selected movie" />
        </div>
        <div className="selected-text">
          <h1>{selectedMovie.title}</h1>
          <h2 className="selected-title">{selectedMovie.tagline}</h2>
          <div className="selected-genre-list">
            {selectedMovieGenres.map((genre) => {
              return (
                <p key={genre.id} className="selected-genre-text">
                  {genre.name}
                </p>
              );
            })}
          </div>
          <h4>
            <span>{selectedMovie.release_date}</span>{" "}
            <span>{selectedMovie.runtime}Mins</span>
          </h4>
          <div style={{ width: "100px", height: "100px", padding: "5px" }}>
            <CircularProgressbar
              value={percentage}
              text={`${Math.ceil(selectedMovie.vote_average)}`}
            />
          </div>
          <h3>OVERVIEW</h3>
          <p>{selectedMovie.overview}</p>
          <button onClick={toggleVideoPopup}>
            Trailer <i className="fas fa-play"></i>
          </button>
        </div>
      </div>
      <h2 style={{ margin: "3rem 0 3rem 0" }}>RECOMMENDED</h2>
      {recomendedMovies.length > 0 ? (
        <Recommended
          key={recomendedMovies.id}
          recomendedMovies={recomendedMovies}
          setSelectedMovieId={setSelectedMovieId}
        />
      ) : (
        <p>No recommended movies</p>
      )}

      {videoPopup ? (
        <VideoModal
          toggleVideoPopup={toggleVideoPopup}
          selectedMovieTrailer={selectedMovieTrailer}
        />
      ) : null}
    </div>
  );
};

export default Selected;
