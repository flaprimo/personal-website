/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve("./src/templates/blogElementTemplate.js");

    resolve(
      graphql(
        `
        {
          allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/blog/"}},
            sort: {fields: [frontmatter___date], order: DESC})
          {
            totalCount
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  date(formatString: "DD MMMM YYYY")
                  category
                }
                excerpt
              }
            }
          }
        }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const blogElements = result.data.allMarkdownRemark.edges;

        _.each(blogElements, (blogElement, index) => {
          const slug = blogElement.node.fields.slug;
          const previous = index === blogElements.length - 1 ? null : blogElements[index + 1].node;
          const next = index === 0 ? null : blogElements[index - 1].node;

          createPage({
            path: '/blog' + blogElement.node.fields.slug,
            component: blogTemplate,
            context: {
              slug: slug,
              previous,
              next
            }
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: "slug",
      node,
      value: createFilePath({ node, getNode })
    });
  }
};