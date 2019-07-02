import React, { useEffect } from "react";
import PropTypes from "prop-types";

const propTypes = {
  msg: PropTypes.string
};

const defaultProps = {};

export default function Message({ msg, removeMessage }) {
  useEffect(() => {
    setTimeout(() => removeMessage(), 3000);
  });
  return (
    <React.Fragment>
      <div
        style={{ position: "fixed", bottom: "2vh", right: "2vh" }}
        className="alert alert-info alert-dismissible fade show"
        role="alert"
      >
        {msg}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span onClick={removeMessage} aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
    </React.Fragment>
  );
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
