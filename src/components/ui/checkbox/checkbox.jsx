import React from "react";
import styles from "./checkbox.module.css";

export const Checkbox = ({
  name,
  checked = false,
  label,
  onClick,
  extraClass = "",
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text-secondary-color`}
        type="checkbox"
        name={name}
        id={name}
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
