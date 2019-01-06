import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark justify-content-end">
      <a className="navbar-brand" href="/">
        React Google Books
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto nav justify-content-end">
      <li>
                <Link to="/"
                  className={
                    window.location.pathname === "/" || window.location.pathname === "/users"
                      ? "nav-link active" : "nav-link"
                  }>
                  Book Search
                </Link>
              </li>

              <li>
                <Link to="/savedBooks"
                  className={
                  window.location.pathname === "/savedBooks"
                      ? "nav-link active" : "nav-link"
                  }>
                  Saved Books
                  </Link>
              </li>
    </ul>
  </div>
    </nav>
  );
  
}

export default Nav;
