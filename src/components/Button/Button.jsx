import React from "react";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google:'google',
  facebook: "facebook",
  github: "github",
  signup: "signup",
  login: "login",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
