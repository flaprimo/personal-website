import React from 'react'
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";

import Layout from '../components/Layout';

class IndexPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.description;
    const contentTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle}>
        <h1>Hi everyone!</h1>
        <p>Welcome to my new website</p>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  }).isRequired
};