import React from "react";
import { useHistory } from "react-router-dom";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../Style/Movies.css";

const ElementRecommended = (props) => {
  let history = useHistory();
  const recommendedMovie = props.element;
  const percentage = (recommendedMovie.vote_average / 10) * 100;
  var url = `https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`;
  const setSelectedMovieId = props.setSelectedMovieId;
  const handleSelectedMovie = () => {
    setSelectedMovieId(recommendedMovie.id);
    history.push("/selected");
  };

  return (
    <Flippy
      onClick={handleSelectedMovie}
      flipOnHover={true}
      flipOnClick={false}
      flipDirection="horizontal"
    >
      <FrontSide>
        <img className="slider-img" src={url} alt="recommended" />
      </FrontSide>
      <BackSide style={{ backgroundColor: "#37474F" }}>
        <div className="slider-back">
          <p className="slider-text">{recommendedMovie.title}</p>
          <div style={{ width: "100px", height: "100px" }}>
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
            />
          </div>
          <p className="slider-text">{recommendedMovie.release_date}</p>
        </div>
      </BackSide>
    </Flippy>
  );
};

export default ElementRecommended;
