import React from "react";

const Operator = (props) => {
  return (
    <div className="operatorContainer" onClick={props.onClick}>
      {props.displayOperator}
    </div>
  );
};

export default Operator;
