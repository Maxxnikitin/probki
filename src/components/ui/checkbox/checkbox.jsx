import React from "react";
import styles from "./checkbox.module.css";

export const Checkbox = ({
  name,
  id,
  checked = false,
  isFilter = false,
  label,
  onChange,
  extraClass = "",
}) => {
  const labelClassName = isFilter
    ? `${styles.label} text text_type_medium text_color_secondary`
    : `${styles.label} ${styles.label_with_bgc} text text_type_large text_color_black`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={styles.input}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        name={id}
        id={name}
      />
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
