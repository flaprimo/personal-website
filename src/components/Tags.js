import React from "react";
import PropTypes from "prop-types"

const Tags = ({ tags }) => (
  tags.map((tag, i) =>
    <li key={i} style={{
      display: "inline-block",
      marginRight: "10px",
      border: "1px solid hsla(0,0%,0%,0.2)",
      padding: "2px"
    }}>
      {tag}
    </li>
  )
);

export default Tags

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
};