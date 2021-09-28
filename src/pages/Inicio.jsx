import React from "react";
import Upcoming from "../Components/Upcoming";
import Popular from "../Components/Popular";

const Inicio = (props) => {
  const upcoming = props.upcoming;
  const movieList = props.movieList;
  const searchValue = props.searchValue;
  const setSelectedMovieId = props.setSelectedMovieId;
  return (
    <div>
      <h2>UPCOMING</h2>
      <Upcoming
        style={{ marginLeft: "7%", paddingTop: "5%", width: "100%" }}
        key={upcoming.id}
        upcoming={upcoming}
        setSelectedMovieId={setSelectedMovieId}
      />
      {searchValue ? <h2>SEARCH</h2> : <h2>POPULAR</h2>}
      {movieList.length === 0 && <h2>No matching searches</h2>}
      <Popular
        setSelectedMovieId={setSelectedMovieId}
        key={movieList.id}
        movieList={movieList}
      />
    </div>
  );
};

export default Inicio;
