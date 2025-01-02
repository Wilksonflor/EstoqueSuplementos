import React from "react";
import { Button as AntButton } from "antd";
import "./Button.css";

const Button = ({ children, ...props }) => {
  return (
    <AntButton className="custom-button" {...props}>
      {children}
    </AntButton>
  );
};

export default Button;
