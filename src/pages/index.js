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
        <div className="hero is-medium is-fullheight-with-navbar"
             style={{
               backgroundImage: "url(" + bg + ")",
               backgroundPosition: "center center",
               backgroundSize: "cover",
               backgroundColor: "white"
             }}>
          <div className="hero-body"/>
          <div className="hero-foot">
            <div className="container" style={{
              paddingBottom: "20px",
              textShadow: "5px 5px 15px rgba(0,0,0,0.6)",
              "-webkit-text-stroke": "1px black"
            }}>
              <h1 className="title has-text-white has-text-weight-bold" style={{
                fontSize: "6em"
              }}>
                FLAVIO PRIMO
              </h1>
              <h2 className="subtitle has-text-white" style={{
                fontSize: "4em"
              }}>
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