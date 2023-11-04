import React from "react";

const AlertCastom = ({ message, type }) => {
  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default AlertCastom;
