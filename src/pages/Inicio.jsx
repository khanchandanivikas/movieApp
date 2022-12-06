import React from "react";
import Upcoming from "../components/Upcoming";
import Popular from "../components/Popular";

const Inicio = (props) => {
  const upcoming = props.upcoming;
  const movieList = props.movieList;
  const searchValue = props.searchValue;
  const setSelectedMovieId = props.setSelectedMovieId;
  const prev = props.prev;
  const next = props.next;
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;
  return (
    <main>
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
        prev={prev}
        next={next}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
};

export default Inicio;
