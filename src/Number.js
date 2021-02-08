import React from "react";

const Number = (props) => {
  return (
    <div className="numberContainer" onClick={props.onClick}>
      {props.displayNumber}
    </div>
  );
};

export default Number;
