import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import "bulma/css/bulma.css";
import Link from "gatsby-link";

class PhotoElementTemplate extends React.Component {
  render() {
    // const siteTitle = this.props.data.site.siteMetadata.title;
    const {gallery, previous, next } = this.props.pageContext;
    const baseUrl = this.props.location.pathname.substring(0, this.props.location.pathname.lastIndexOf("/") + 1);
    console.log(gallery);

    const photo = this.props.data.photo.childImageSharp.resize;
    // const blogElement = this.props.data.markdownRemark;
    // const title = blogElement.frontmatter.title;
    // const category = blogElement.frontmatter.category;
    // const tags = blogElement.frontmatter.tags;
    // const date = blogElement.frontmatter.date;
    // const html = blogElement.html;

    return (
      <div className="hero has-background-black is-fullheight">
        <div className="hero-body" style={{
          padding: 0,
          alignItems: "normal",
          flexDirection: "column"
        }}>
          <div style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <img style={{
              // backgroundImage: `url("${decodeURIComponent(photo.tracedSVG)}")`,
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%"
            }}
                 src={photo.src} height={photo.height} width={photo.width}/>

          </div>
          <div style={{
            backgroundColor: "grey",
            height: "10vh"
          }}>
            {previous != null &&
            <Link to={baseUrl + previous.relativePath.split("/")[1].split(".")[0]} replace>Previous</Link>
            }
            {next != null &&
            <Link to={baseUrl + next.relativePath.split("/")[1].split(".")[0]} replace>Next</Link>
            }
            <Link to={baseUrl}>Close</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoElementTemplate;

export const pageQuery = graphql`
  query photoElementQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    photo: file(relativePath: { regex: $slug }) {
      childImageSharp {
        resize(width: 1000) {
          src
          height
          width
          tracedSVG
        }
      }
    }
  }
`;

PhotoElementTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    photo: PropTypes.object.isRequired
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    gallery: PropTypes.string,
    next: PropTypes.object,
    previous: PropTypes.object
  }).isRequired
};