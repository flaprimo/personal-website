import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import PropTypes from "prop-types"
import NextPrevElements from "../components/NextPrevElements";
import Gallery from 'react-photo-gallery';
import Tags from "../components/Tags";

class BlogElementTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    const blogElement = this.props.data.markdownRemark;
    const title = blogElement.frontmatter.title;
    const category = blogElement.frontmatter.category;
    const tags = blogElement.frontmatter.tags;
    const date = blogElement.frontmatter.date;
    const html = blogElement.html;

    return (
      <Layout contentTitle={title} siteTitle={siteTitle}>
        <h1>{title}</h1>
        <p>{date} - {category}</p>

        <div dangerouslySetInnerHTML={{ __html: html }} />

        <Tags tags={tags}/>

        <NextPrevElements type={"/blog"} previous={previous} next={next}/>
      </Layout>
    )
  }
}

export default BlogElementTemplate

export const pageQuery = graphql`
  query blogElementQuery($slug: String!) {
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

BlogElementTemplate.propTypes = {
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