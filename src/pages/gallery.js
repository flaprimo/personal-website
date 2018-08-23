import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import PropTypes from "prop-types";
import Header from "../components/Header";

class GalleryPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const contentTitle = "Gallery";
    const blogElements = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle}>
        <Header title={contentTitle} subtitle="Welcome to the gallery"/>

        <div className="container section">
          <div className="columns is-multiline is-centered">
            {blogElements.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              const slug = node.fields.slug;
              const date = node.frontmatter.date;
              const category = node.frontmatter.category;
              const excerpt = node.excerpt;
              const cover = node.frontmatter.cover.childImageSharp.fluid;

              return (
                <div key={slug} className="column is-half">
                  <div className="card"
                       style={{
                         display: "flex",
                         minHeight: "100%",
                         flexDirection: "column"
                       }}>
                    <div className="card-image">
                      <Img className="image" fluid={cover}/>
                    </div>

                    <div className="card-content" style={{flex: "1"}}>
                      <h3 className="is-size-4">
                        <Link to={"/gallery" + slug}>
                          {title}
                        </Link>
                      </h3>
                      <br/>
                      <div className="content" >
                        <p dangerouslySetInnerHTML={{ __html: excerpt }}/>
                      </div>
                    </div>

                    <footer className="card-footer">
                      <div className="card-footer-item">{date}</div>
                      <div className="card-footer-item">{category}</div>
                    </footer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default GalleryPage;

export const pageQuery = graphql`
  query galleryPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/gallery/"}},
      sort: { fields: [frontmatter___date], order: DESC })
    {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            category
            tags
            cover {
              childImageSharp {
                fluid(maxWidth: 900, quality: 85, traceSVG: { color: "#2B2B2F" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;

GalleryPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    allMarkdownRemark: PropTypes.object.isRequired
  }).isRequired
};