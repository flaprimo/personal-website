import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from "prop-types"

import Header from './Header'
import './layout.css'
import Footer from "./Footer";
import Nav from "./Nav";

class Layout extends React.Component {
  render() {
    const { siteTitle, contentTitle, children } = this.props;
    const title =`${contentTitle} | ${siteTitle}`;
    return (
      <div>
        <Helmet title={title} />

        <Header/>
        <Nav/>
        { children }
        <Footer/>
      </div>
    )
  }
}

export default Layout

Layout.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  contentTitle: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
};
