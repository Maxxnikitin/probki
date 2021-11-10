import React from "react";
import styles from "./button.module.css";

export const Button = ({
  kind = "form",
  type = "button",
  text = "",
  textColor = "white",
  disabled = false,
  isCell = false,
  onClick,
  extraClass = "",
}) => {
  return (
    <button
      className={`text text_type_${
        isCell ? "btn-cart" : "medium-600"
      } text_color_${textColor} ${styles.button} ${styles[kind]} ${extraClass}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
