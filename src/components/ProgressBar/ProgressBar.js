import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  percentage: PropTypes.number.required
};

const defaultProps = {};

export default function ProgressBar({ percentage }) {
  return (
    <React.Fragment>
      <div className="progress">
        <div
          className="bg-success progress-bar"
          role="progressbar"
          aria-valuenow={percentage}
          style={{ width: `${percentage}%` }}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </React.Fragment>
  );
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;
