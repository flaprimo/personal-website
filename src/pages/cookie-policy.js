import React, { Component } from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Header from "../components/Header";

class CookiePolicyPage extends Component {
  render() {
    const contentTitle = "Cookie Policy";
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle} location={this.props.location}>
        <Header title={contentTitle} subtitle="Come to the dark side, we have cookies!"/>

        <div className="container content section">
          <p>This site uses cookies - small text files that are placed on your machine to help the site provide a better
            user experience.</p>
          <p>In general, cookies are used to retain user preferences, store information for things like shopping carts,
            and provide anonymised tracking data to third party applications like Google Analytics.</p>
          <p>As a rule, cookies will make your browsing experience better. However, you may prefer to disable cookies on
            this site and on others. The most effective way to do this is to disable cookies in your browser.</p>
          <p>We suggest consulting the Help section of your browser or taking a look at <a
            href='http://www.aboutcookies.org'>the About Cookies website</a> which offers guidance for all modern
            browsers
          </p>
        </div>
      </Layout>
    );
  }
}

export default CookiePolicyPage;

export const pageQuery = graphql`
  query cookiePolicyPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

CookiePolicyPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};