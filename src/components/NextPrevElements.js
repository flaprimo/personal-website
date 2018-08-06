import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types"

const NextPrevElements = ({ type, previous, next }) => (
  <ul
    style={{
      listStyle: 'none',
      padding: 0,
    }}
  >
    {previous && (
      <li>
        <Link to={type + previous.fields.slug} rel="prev">
          ← {previous.frontmatter.title}
        </Link>
      </li>
    )}

    {next && (
      <li>
        <Link to={type + next.fields.slug} rel="next">
          {next.frontmatter.title} →
        </Link>
      </li>
    )}
  </ul>
);

export default NextPrevElements

NextPrevElements.propTypes = {
  type: PropTypes.string.isRequired,
  previous: PropTypes.object,
  next: PropTypes.object
};