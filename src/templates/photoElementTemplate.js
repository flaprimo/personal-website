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

    let previousPreload = "";
    let previousButton = "";
    if (previous != null) {
      const previousImagePage = baseUrl + previous.relativePath.split("/")[1].split(".")[0];
      const previousImage = previous.childImageSharp.resize.src;
      previousPreload = <link rel="preload" as="image" href={previousImage}/>;
      previousButton = <Link to={previousImagePage} replace>
        <p className="control">
          <a className="button is-dark" style={{
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px"
          }}>
            <span className="icon is-small">
              <i className="arrow-left" style={{
                border: "solid #f5f5f5",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform: "rotate(135deg)"
              }}/>
            </span>
          </a>
        </p>
      </Link>;
    }

    let nextPreload = "";
    let nextButton = "";
    if (next != null) {
      const nextImagePage = baseUrl + next.relativePath.split("/")[1].split(".")[0];
      const nextImage = next.childImageSharp.resize.src;
      nextPreload = <link rel="preload" as="image" href={nextImage}/>;
      nextButton = <Link to={nextImagePage} replace>
        <p className="control">
          <a className="button is-dark" style={{
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px"
          }}>
            <span className="icon is-small is-rounded">
              <i className="arrow-right" style={{
                border: "solid #f5f5f5",
                borderWidth: "0 2px 2px 0",
                display: "inline-block",
                padding: "3px",
                transform: "rotate(-45deg)"
              }}/>
            </span>
          </a>
        </p>
      </Link>;
    }

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
          {nextPreload}
          {previousPreload}
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
                 src={photo.src} height={photo.height} width={photo.width}
                 alt="photo in the gallery"
            />
          </div>
          <nav className="level is-mobile" style={{
            height: "10vh",
            paddingLeft: "1rem",
            paddingRight: "1rem"
          }}>
              <div className="level-left">
                <div className="field has-addons">
                  {previousButton}
                  {nextButton}
                </div>
              </div>
              <div className="level-right">
                <Link to={baseUrl} replace>
                  <p className="control">
                    <a className="button is-dark" style={{
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px"
                    }}>
                      <span className="icon is-small is-rounded">
                        <i className="arrow-right" style={{
                          border: "solid #f5f5f5",
                          borderWidth: "0 2px 2px 0",
                          display: "inline-block",
                          padding: "3px",
                          transform: "rotate(-45deg)"
                        }}/>
                        <i className="arrow-left" style={{
                          border: "solid #f5f5f5",
                          borderWidth: "0 2px 2px 0",
                          display: "inline-block",
                          padding: "3px",
                          transform: "rotate(135deg)"
                        }}/>
                      </span>
                    </a>
                  </p>
                </Link>
              </div>
          </nav>
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