import React from "react";
import PropTypes from "prop-types";

const Tags = ({ tags }) => (
  <div className="tags">
    {tags.map((tag, i) =>
      <span key={i} className="tag">{tag}</span>
    )}
  </div>
);

export default Tags;

Tags.propTypes = {
  tags: PropTypes.array.isRequired
};