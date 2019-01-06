import React from "react";
import "./readOut.css";

const ReadOut = props => {
  const renderDisplay = current => {
    if (current.length > 1 && current.charAt(0) === "0") {
      return current.substring(1);
    } else {
      return current;
    }
  };
  return (
    <div className="readout-div">{renderDisplay(props.currentDisplay)}</div>
  );
};

export default ReadOut;
