import React from "react";
import styles from "./button.module.css";

export const Button = ({
  kind = "form",
  type = "button",
  text,
  textColor = "white",
  disabled = false,
  onClick,
  extraClass = "",
}) => {
  return (
    <button
      className={`text text_type_medium-600 text_color_${textColor} ${styles.button} ${styles[kind]} ${extraClass}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
