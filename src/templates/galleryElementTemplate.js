import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import NextPrevElements from "../components/NextPrevElements";
import Tags from "../components/Tags";
import Img from "gatsby-image";
import Header from "../components/Header";

class GalleryElementTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    const galleryElement = this.props.data.markdownRemark;
    const title = galleryElement.frontmatter.title;
    const category = galleryElement.frontmatter.category;
    const tags = galleryElement.frontmatter.tags;
    const date = galleryElement.frontmatter.date;
    const html = galleryElement.html;

    return (
      <Layout contentTitle={title} siteTitle={siteTitle}>
        <Header title={title} subtitle={date + " - " + category}/>

        <div className="container section">

          <div className="content" dangerouslySetInnerHTML={{ __html: html }}/>

          <div className="columns is-multiline is-centered">
            {this.props.data.allFile.edges.map((image, i) => (
              <div key={i} className="column is-narrow">
                <Img resolutions={image.node.childImageSharp.resolutions} />
              </div>
            ))}
          </div>

          <Tags tags={tags}/>

          <NextPrevElements type={"/gallery"} previous={previous} next={next}/>
        </div>
      </Layout>
    );
  }
}

export default GalleryElementTemplate;

export const pageQuery = graphql`
  query galleryElementQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
      }
    }
    allFile(filter: {
      sourceInstanceName: {eq: "gallery"},
      internal: {mediaType: {eq: "image/jpeg"}},
      absolutePath: {regex: $slug}
    }) {
      totalCount
      edges {
        node {
          childImageSharp {
            resolutions(width: 300, height: 300, quality: 85) {
              ...GatsbyImageSharpResolutions_tracedSVG
            }
          }
        }
      }
    }
  }
`;

GalleryElementTemplate.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    markdownRemark: PropTypes.object.isRequired,
    allFile: PropTypes.object.isRequired
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    previous: PropTypes.object
  }).isRequired
};