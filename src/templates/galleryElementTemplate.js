import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import PropTypes from "prop-types"
import NextPrevElements from "../components/NextPrevElements";

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

    const tagTemplate = tags.map((tag, i) =>
      <li key={i} style={{display: 'inline-block', marginRight: '10px', border: '1px solid hsla(0,0%,0%,0.2)', padding: '2px'}}>
        {tag}
      </li>
    );

    return (
      <Layout contentTitle={title} siteTitle={siteTitle}>
        <h1>{title}</h1>
        <p>{date} - {category}</p>

        <div dangerouslySetInnerHTML={{ __html: html }} />

        <ul>{tagTemplate}</ul>

        <NextPrevElements type={"/gallery"} previous={previous} next={next}/>
      </Layout>
    )
  }
}

export default GalleryElementTemplate

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
  }
`;

GalleryElementTemplate.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    markdownRemark: PropTypes.object.isRequired
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    previous: PropTypes.object
  }).isRequired
};