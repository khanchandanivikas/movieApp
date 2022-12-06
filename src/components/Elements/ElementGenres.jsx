import React from "react";
import { useHistory } from "react-router-dom";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../style/movies.css";

const ElementGenres = (props) => {
  let history = useHistory();
  const genreMovie = props.element;
  const mov = genreMovie.id;
  const percentage = Math.ceil((genreMovie.vote_average / 10) * 100);
  var url = `https://image.tmdb.org/t/p/w500${genreMovie.poster_path}`;
  const setSelectedMovieId = props.setSelectedMovieId;
  const handleSelectedMovie = () => {
    setSelectedMovieId(genreMovie.id);
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
        <img className="slider-img" src={url} alt="genres" />
      </FrontSide>
      <BackSide style={{ backgroundColor: "#37474F" }}>
        <div className="slider-back">
          <p className="slider-text">{genreMovie.title}</p>
          <div style={{ width: "100px", height: "100px" }}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
          <p className="slider-text">{genreMovie.release_date}</p>
        </div>
      </BackSide>
    </Flippy>
  );
};

export default ElementGenres;
