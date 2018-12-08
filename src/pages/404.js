import React, { Component } from "react";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Header from "../components/Header";

class NotFoundPage extends Component {
  render() {
    const contentTitle = "Page not found";
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle} location={this.props.location}>
        <Header title={contentTitle} subtitle="Page not found"/>

        <div className="container section">
          <div className="columns is-centered">
            <div className="content column is-7">
              <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query notFoundPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};