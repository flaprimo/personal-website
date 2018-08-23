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

        <div className="container section">
          <div className="columns is-multiline is-centered">
            {blogElements.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              const slug = node.fields.slug;
              const date = node.frontmatter.date;
              const category = node.frontmatter.category;
              const excerpt = node.excerpt;

              return (
                <div key={slug} className="column is-half">
                  <div className="card"
                       style={{
                         display: "flex",
                         minHeight: "100%",
                         flexDirection: "column"
                       }}>

                    <div className="card-content" style={{ flex: "1" }}>
                      <h3 className="is-size-4">
                        <Link to={"/blog" + slug}>
                          {title}
                        </Link>
                      </h3>
                      <br/>
                      <div className="content">
                        <p dangerouslySetInnerHTML={{ __html: excerpt }}/>
                      </div>
                    </div>

                    <footer className="card-footer">
                      <div className="card-footer-item">{date}</div>
                      <div className="card-footer-item">{category}</div>
                    </footer>
                  </div>
                </div>
              );
            })}
          </div>
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