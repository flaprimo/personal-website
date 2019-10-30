import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, subtitle }) => (
  <header className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
      </div>
    </div>
  </header>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};
