import React from "react";
import PropTypes from "prop-types";

export default function Navbar(props) {
  const navbarBg = props.mode === "dark" ? "rgba(13, 17, 23, 0.9)" : "#5D4037";

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{ backgroundColor: navbarBg, backdropFilter: "blur(10px)" }}
    >
      <div className="container-fluid">
        <span className="navbar-brand fw-bold text-white">{props.title}</span>

        {/* ADDED: Three-line/dots button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ADDED: id="navbarSupportedContent" to link with the button above */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span
                className="nav-link text-white"
                style={{ cursor: "pointer" }}
                onClick={() => props.setView("home")}
              >
                Home
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link text-white"
                style={{ cursor: "pointer" }}
                onClick={() => props.setView("about")}
              >
                About
              </span>
            </li>
            <li className="nav-item">
              <span
                className="nav-link text-white"
                style={{ cursor: "pointer" }}
                onClick={() => props.setView("contact")}
              >
                Connect
              </span>
            </li>
          </ul>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              style={{ cursor: "pointer" }}
              onClick={props.toggleMode}
            />
            <label
              className="form-check-label text-white"
              htmlFor="flexSwitchCheckDefault"
            >
              {props.mode === "light"
                ? "Enable Dark Mode"
                : "Disable Dark Mode"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
  toggleMode: PropTypes.func,
  setView: PropTypes.func,
};
