/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const createCustomPage = (elements, type, template) => (
    elements.forEach((element, index) => {
      const slug = element.node.fields.slug;
      const previous = index === elements.length - 1 ? null : elements[index + 1].node;
      const next = index === 0 ? null : elements[index - 1].node;

      createPage({
        path: type + element.node.fields.slug,
        component: template,
        context: {
          slug: slug,
          previous,
          next
        }
      });
    })
  );

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
        {
          blog: allMarkdownRemark(
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
                  date(formatString: "DD MMMM YYYY")
                }
              }
            }
          }
          gallery: allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/gallery/"}},
            sort: {fields: [frontmatter___date], order: DESC})
          {
            totalCount
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "DD MMMM YYYY")
                }
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

        const blogTemplate = path.resolve("./src/templates/blogElementTemplate.js");
        const galleryTemplate = path.resolve("./src/templates/galleryElementTemplate.js");

        const blogElements = result.data.blog.edges;
        const galleryElements = result.data.gallery.edges;

        createCustomPage(blogElements, "/blog", blogTemplate);
        createCustomPage(galleryElements, "/gallery", galleryTemplate);
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