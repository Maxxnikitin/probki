import React from "react";
import styles from "./checkbox.module.css";

export const Checkbox = ({
  name,
  checked = false,
  isFilter = false,
  label,
  onClick,
  extraClass = "",
}) => {
  const labelClassName = isFilter
    ? `${styles.label} text text_type_medium text_color_secondary`
    : `${styles.label} ${styles.label_with_bgc} text text_type_large text_color_black`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input className={styles.input} type="checkbox" name={name} id={name} />
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
