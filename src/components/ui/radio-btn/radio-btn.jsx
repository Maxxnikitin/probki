import React from "react";
import styles from "./radio-btn.module.css";

export const RadioBtn = ({
  name,
  id,
  checked = false,
  label,
  onClick,
  extraClass = "",
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text-secondary-color`}
        type="radio"
        name={name}
        id={id}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
