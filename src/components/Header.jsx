import React from "react";
import { Turn as Hamburger } from "hamburger-react";
import "../Style/SearchBox.css";

const Header = (props) => {
  const onTextChange = props.onTextChange;
  const isOpen = props.isOpen;
  const handleToggle = props.handleToggle;

  return (
    <div className="search">
      <div className={isOpen ? "hamburger-active" : "hamburger-inactive"}>
        <Hamburger
          color="#37474F"
          rounded
          toggled={isOpen}
          toggle={handleToggle}
        />
      </div>
      <form action="">
        <input
          onChange={onTextChange}
          type="text"
          name="movieName"
          placeholder="Movie Name"
        />
      </form>
    </div>
  );
};

export default Header;
