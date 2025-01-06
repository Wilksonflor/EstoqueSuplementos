import React from "react";
import { Button as AntButton } from "antd";
import "./Button.css";

const Button = ({ children, bgColor, hoverColor, color, ...props }) => {
  const buttonStyle = {
    backgroundColor: bgColor,
    borderColor: bgColor,
    color: color || "white",
  };

  const hoverStyle = {
    "--hover-color": hoverColor || bgColor,
    "--text-color-hover": color || "white",
  };

  return (
    <AntButton
      className="custom-button"
      style={{ ...buttonStyle, ...hoverStyle }}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
