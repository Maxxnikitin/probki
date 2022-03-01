import React from "react";
import styles from "./pagination-button.module.css";

export const PaginationButton = ({
  text = "",
  textColor = "white",
  disabled = false,
  isActive = false,
  onClick,
  extraClass = "",
}) => {
  return (
    <button
      className={`text text_type_medium text_color_${textColor} ${
        styles.button
      } ${isActive && styles.active} ${extraClass}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
