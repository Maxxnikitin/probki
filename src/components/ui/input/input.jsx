import React from "react";
import { nanoid } from "nanoid";
import styles from "./input.module.css";
import searchIcon from "../../../images/icons/search.svg";

export const Input = ({
  type = "text",
  kind = "form",
  search = false,
  placeholder,
  label,
  extraClass = "",
}) => {
  const id = nanoid();
  const inputTextColor =
    kind === "form" ? "text_color_input" : "text_color_select";
  return (
    <div className={`${styles.content} ${extraClass}`}>
      {label && (
        <label
          className={`${styles.label} text text_type_medium text_color_black pb-4`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${styles[kind]} text text_type_small ${inputTextColor}`}
      />
    </div>
  );
};
