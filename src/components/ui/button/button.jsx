import React from "react";
import styles from "./button.module.css";

export const Button = ({
  kind = "form",
  type = "button",
  text,
  onClick,
  extraClass = "",
}) => {
  const textColor = kind === 'form' ? 'text_color_white' : 'text_color_black';
  return (
    <button
      className={`text text_type_medium ${textColor} ${styles.button} ${styles[kind]} ${extraClass}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
