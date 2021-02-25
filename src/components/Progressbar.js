import React from "react";

export const Progressbar = ({ isVisible }) => {
  if (!isVisible) {
    return (
      <div style={ { height: "8px" } }></div>
    );
  }
  return (
    <div className="progress" style={ { height: "8px" } }>
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={ { width: "100%" } }></div>
    </div>
  );
};
