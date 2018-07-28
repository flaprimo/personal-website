import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Link from 'gatsby'
import get from 'lodash/get'

class BlogElementTemplate extends React.Component {
  render() {
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
      <div>
        <h1>{title}</h1>
        <p>{date} - {category}</p>

        <div dangerouslySetInnerHTML={{ __html: html }} />

        <ul>{tagTemplate}</ul>
      </div>
    )
  }
}

export default BlogElementTemplate

export const pageQuery = graphql`
  query BlogElementsBySlug($slug: String!) {
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
`