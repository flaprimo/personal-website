import React, { Component } from 'react'
import Layout from '../components/Layout'
import PropTypes from "prop-types";
import { graphql } from "gatsby";

class NotFoundPage extends Component {
  render() {
    const contentTitle = "Page not found";
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle}>
        <h2>Page not found!</h2>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
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
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};