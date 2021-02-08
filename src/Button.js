import React from "react";

const Button = (props) => {
  return (
    <div className={props.containerClassName} onClick={props.onClick}>
      {props.display}
    </div>
  );
};

export default Button;
