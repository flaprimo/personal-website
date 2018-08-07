import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import Layout from "../components/Layout";

class IndexPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.description;
    const contentTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle}>
        <div className="container content section">
          <h2>Hi everyone!</h2>
          <p>Welcome to my new website</p>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

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
        description: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};