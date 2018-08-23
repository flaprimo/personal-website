import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Nav from "./Nav";
import "bulma/css/bulma.css";

class Layout extends React.Component {
  render() {
    const { siteTitle, contentTitle, children } = this.props;
    const title = `${contentTitle} | ${siteTitle}`;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <html className="has-navbar-fixed-top"/>
        </Helmet>

        <Nav/>
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
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};
