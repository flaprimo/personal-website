import React from "react";
import PropTypes from "prop-types";

class Modal extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
  }

  render() {
    const { children } = this.props;

    return (
      <div className={"modal" + (this.state.visible ? " is-active" : "")}>
        <div className="modal-background" onClick={this.toggleModal}/>
        <div className="modal-content">
          <p className="image is-4by3">
            { children }
          </p>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.toggleModal}/>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener("keydown", this.toggleModal);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.toggleModal);
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.object.isRequired
};