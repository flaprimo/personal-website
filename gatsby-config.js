module.exports = {
  siteMetadata: {
    title: 'Flavio Primo',
    author: 'Flavio Primo',
    description: 'Just another dev blog',
    siteUrl: 'https://flaprimo.github.io',
  },
  pathPrefix: '/flaprimo-website',
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/gallery`,
        name: 'gallery',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              quality: 90,
              linkImagesToOriginal: true
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          // {
          //   resolve: 'gatsby-remark-external-links',
          //   options: {
          //     target: '_blank',
          //     rel: 'nofollow noopener noreferrer',
          //   }
          // }
        ],
      },

    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    ]
};