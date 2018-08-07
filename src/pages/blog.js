import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Header from "../components/Header";
import PropTypes from "prop-types";

class BlogPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const contentTitle = "Blog";
    const blogElements = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout siteTitle={siteTitle} contentTitle={contentTitle}>
        <Header title={contentTitle} subtitle="Welcome to the blog"/>

        <div className="container">
          {blogElements.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const slug = node.fields.slug;
            const date = node.frontmatter.date;
            const category = node.frontmatter.category;
            const excerpt = node.excerpt;

            return (
              <div key={slug} className="card">
                <div className="card-content" style={{marginTop: "10px"}}>
                  <h3 className="is-size-4">
                    <Link style={{ boxShadow: "none" }} to={"/blog" + slug}>
                      {title}
                    </Link>
                  </h3>
                  <div className="content">
                    <small>{date} - {category}</small>
                    <br/>
                    <p dangerouslySetInnerHTML={{ __html: excerpt }}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/blog/"}},
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