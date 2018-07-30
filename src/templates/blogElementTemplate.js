import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby'
import Layout from "../components/Layout";
import PropTypes from "prop-types"

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
      </Layout>
    )
  }
}

export default BlogElementTemplate

export const pageQuery = graphql`
  query BlogElementQuery($slug: String!) {
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
    next: PropTypes.object.isRequired,
    previous: PropTypes.object.isRequired
  }).isRequired
};