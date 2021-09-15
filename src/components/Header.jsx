import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/">INICIO</Link>
      <Link to="/auth">AUTHENTICACION</Link>
      <Link to="/crearDestino">CREAR DESTINO</Link>
    </header>
  );
};

export default Header;
