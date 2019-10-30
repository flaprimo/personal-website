import React from "react";
import PropTypes from "prop-types";
import Disqus from 'disqus-react';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
  }

  render() {
    const disqusShortname = 'flavioprimo';
    const disqusConfig = {
      identifier: this.props.type + "-" + this.props.title,
      title: this.props.title,
    };

    return (
      <div className="comments has-text-centered">
        {this.state.visible ? (
          <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        ) : (
          <a className="button is-medium" onClick={this.showComments}>Comments</a>
        )}
      </div>
    );
  }

  showComments = () => {
    this.setState({
      visible: true
    });
  };
}

export default Comments;

Comments.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};