import React from "react";
import styles from "./select.module.css";

export const Select = ({ shops, value = 1, onChange, extraClass = "" }) => {
  return (
    <select
      type="select"
      className={`${styles.select} ${extraClass} text text_type_medium text_color_select`}
      value={value}
      onChange={onChange}
    >
      {shops &&
        shops.map((item, index) => {
          return (
            <option key={index} className={styles.option} value={item.id}>
              {item.address}
            </option>
          );
        })}
    </select>
  );
};
