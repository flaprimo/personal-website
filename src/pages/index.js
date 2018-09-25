import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { withPrefix } from "gatsby-link";

import Layout from "../components/Layout";

class IndexPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.description;
    const contentTitle = this.props.data.site.siteMetadata.title;
    const bg = withPrefix("/index-bg.gits-head-shadows.svg");

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle} location={this.props.location}>
        <div className="hero is-medium is-fullheight"
             style={{
               marginTop: "-52px",
               paddingTop: "52px",
               backgroundImage: "url(" + bg + ")",
               backgroundPosition: "center center",
               backgroundSize: "cover",
               backgroundColor: "white"
             }}>
          <div className="hero-body">
            <div className="container has-text-centered" style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px," +
                "rgba(0,0,0,1) 35px, rgba(0,0,0,1) 70px)",
              padding: "20px",
              textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"
            }}>
              <h1 className="title is-size-1 has-text-white has-text-weight-bold">
                FLAVIO PRIMO
              </h1>
              <h2 className="subtitle is-size-2 has-text-white has-text-weight-bold">
                Just another dev blog_
              </h2>
            </div>
          </div>
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
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};