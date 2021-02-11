import React from "react";

const Button = (props) => {
  return (
    <div
      className={`${props.containerClassName} button`}
      id={props.containerID}
      onClick={props.onClick}
    >
      {props.display}
    </div>
  );
};

export default Button;
