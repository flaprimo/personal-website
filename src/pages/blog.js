import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import PropTypes from "prop-types";

class BlogPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const contentTitle = "Blog";
    const blogElements = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle}>
        <h2>Blog</h2>
        <p>Welcome to the blog</p>

        {blogElements.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const slug = node.fields.slug;
          const date = node.frontmatter.date;
          const category = node.frontmatter.category;
          const excerpt = node.excerpt;

          return (
            <div key={slug}>
              <h3>
                <Link style={{ boxShadow: "none" }} to={"/blog" + slug}>
                  {title}
                </Link>
              </h3>
              <small>{date} - {category}</small>
              <p dangerouslySetInnerHTML={{ __html: excerpt }}/>
            </div>
          );
        })}

      </Layout>
    );
  }
}

export default BlogPage;

export const pageQuery = graphql`
  query blogPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          }
        }
      }
    }
  }
`;

BlogPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    allMarkdownRemark: PropTypes.object.isRequired
  }).isRequired
};