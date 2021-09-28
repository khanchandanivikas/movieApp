import React from "react";
import { Link, useHistory } from "react-router-dom";
import homeCinema from "../images/homeCinema.png";
import "../Style/Aside.css";

const Aside = (props) => {
  let history = useHistory();
  const genreList = props.genreList;
  const setGenreId = props.setGenreId;
  const hamburger = props.isOpen;
  const handleToggle = props.handleToggle;

  return (
    <div className={hamburger ? "aside-active" : "aside"}>
      <Link to="/">
        <img
          onClick={handleToggle}
          className="cine-logo"
          src={homeCinema}
          alt="cine"
        />
      </Link>
      <ul className="aside-text-list">
        {genreList.map((genre) => {
          const handleGenreSelect = () => {
            setGenreId(genre.id);
            history.push("/genres");
            handleToggle();
          };
          return (
            <li onClick={handleGenreSelect} className="aside-text">
              <i className="far fa-play-circle"></i> {genre.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Aside;
