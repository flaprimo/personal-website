import React from "react"
import { StaticQuery, graphql, Link } from 'gatsby'
import PropTypes from "prop-types"

/* Component */
const Header = ({ data }) => (
  <header>
    <Link
      style={{
        boxShadow: 'none',
        textDecoration: 'none',
        color: 'inherit',
      }}
      to={'/'}
    >
      <h1>{data.site.siteMetadata.title}</h1>
    </Link>

    <h2>{data.site.siteMetadata.description}</h2>
  </header>
);

/* Query */
export default props => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
)

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
