import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import "bulma/css/bulma.css";
import Link from "gatsby-link";
import Helmet from "react-helmet";

class PhotoElementTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { gallery, previous, next } = this.props.pageContext;
    const title = `${gallery} | ${siteTitle}`;
    const baseUrl = this.props.location.pathname.substring(0, this.props.location.pathname.lastIndexOf("/") + 1);

    // let previousPreload = "";
    let previousButton = "";
    if (previous != null) {
      const previousImagePage = baseUrl + previous.relativePath.split("/")[1].split(".")[0];
      // const previousImage = previous.childImageSharp.resize.src;
      // previousPreload = <link rel="prefetch" as="image" href={this.props.location.origin + previousImage}/>;
      // previousPreload = <link rel="preload" as="image" href={previousImage}/>;
      previousButton = <Link to={previousImagePage} replace>Previous</Link>;
    }

    // let nextPreload = "";
    let nextButton = "";
    if (next != null) {
      const nextImagePage = baseUrl + next.relativePath.split("/")[1].split(".")[0];
      // const nextImage = next.childImageSharp.resize.src;
      // nextPreload = <link rel="preload" as="image" href={nextImage}/>;
      nextButton = <Link to={nextImagePage} replace>Next</Link>;
    }
console.log(this.props.location.origin);
    console.log(gallery);
    // console.log(previous);

    const photo = this.props.data.photo.childImageSharp.resize;
    // const blogElement = this.props.data.markdownRemark;
    // const title = blogElement.frontmatter.title;
    // const category = blogElement.frontmatter.category;
    // const tags = blogElement.frontmatter.tags;
    // const date = blogElement.frontmatter.date;
    // const html = blogElement.html;

    return (
      <div className="hero has-background-black is-fullheight">
        <Helmet>
          <title>{title}</title>
          {/*{nextPreload}*/}
          {/*{previousPreload}*/}
        </Helmet>

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
            {previousButton}
            {nextButton}
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