import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./nav-button.module.css";

export const NavButton = ({
  kind = "form",
  type = "button",
  text = "",
  textColor = "white",
  disabled = false,
  isCell = false,
  to = "",
  extraClass = "",
}) => {
  return (
    <NavLink
      to={to}
      className={`text text_type_${
        isCell ? "btn-cart" : "medium-600"
      } text_color_${textColor} ${styles.button} ${styles[kind]} ${extraClass}`}
      type={type}
      disabled={disabled}
    >
      {text}
    </NavLink>
  );
};
