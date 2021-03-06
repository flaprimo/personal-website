import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Nav from "./Nav";
import "bulma/css/bulma.css";

class Layout extends React.Component {
  render() {
    const { siteTitle, contentTitle, location, children } = this.props;
    const title = `${contentTitle} | ${siteTitle}`;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="google-site-verification" content="Y8B6_MX40JiCVBbuwf-2tVFuGbifcfFi2tBlSPxhJDE"/>
          <html className="has-navbar-fixed-top" lang="en-US"/>
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
