import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFilm, faCartPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <FontAwesomeIcon icon={faFilm} /> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartPlus} /> Cart
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
