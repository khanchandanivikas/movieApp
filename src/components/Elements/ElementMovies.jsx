import React from "react";
import { useHistory } from "react-router-dom";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../Style/Movies.css";

const ElementMovies = (props) => {
  let history = useHistory();
  const movie = props.movie;
  const mov = movie.id;
  const percentage = Math.ceil((movie.vote_average / 10) * 100);
  var url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const setSelectedMovieId = props.setSelectedMovieId;
  const handleSelectedMovie = () => {
    setSelectedMovieId(movie.id);
    setTimeout(() => {
      history.push(`/selected/${mov}`);
    }, 500);
  };
  return (
    <Flippy
      onClick={handleSelectedMovie}
      flipOnHover={true}
      flipOnClick={false}
      flipDirection="horizontal"
    >
      <FrontSide>
        <img className="slider-img" src={url} alt="upcoming" />
      </FrontSide>
      <BackSide style={{ backgroundColor: "#37474F" }}>
        <div className="slider-back">
          <p className="slider-text">{movie.title}</p>
          <div style={{ width: "100px", height: "100px" }}>
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
            />
          </div>
          <p className="slider-text">{movie.release_date}</p>
        </div>
      </BackSide>
    </Flippy>
  );
};

export default ElementMovies;
