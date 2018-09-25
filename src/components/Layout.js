import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { withPrefix } from "gatsby-link";

import Footer from "./Footer";
import Nav from "./Nav";
import "bulma/css/bulma.css";

class Layout extends React.Component {
  render() {
    const { siteTitle, contentTitle, location, children } = this.props;
    const title = `${contentTitle} | ${siteTitle}`;
    const bg = withPrefix("/index-bg.gits-head.svg");
    return (
      <div style={{
        marginTop: "-52px",
        paddingTop: "52px",
        backgroundImage: "url(" + bg + ")",
        backgroundPosition: "center center"
      }}>
        <Helmet>
          <title>{title}</title>
          <html className="has-navbar-fixed-top"/>
        </Helmet>

        <Nav location={location}/>
        {children}
        <Footer/>
      </div>
    );
  }
}

export default Layout;

Layout.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};
