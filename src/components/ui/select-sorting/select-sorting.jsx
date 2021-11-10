import React from "react";
import styles from "./select-sorting.module.css";
import { textAssortmentPage } from "../../../texts/ru";

export const SelectSorting = ({ defaultValue = "value1", extraClass = "" }) => {
  return (
    <select
      type="select"
      className={`${styles.select} ${extraClass} text text_type_medium text_color_select }`}
      defaultValue={defaultValue}
    >
      <option value="value1">{textAssortmentPage.sorting1}</option>
      <option value="value2">{textAssortmentPage.sorting1}</option>
      <option value="value3">{textAssortmentPage.sorting1}</option>
      <option value="value4">{textAssortmentPage.sorting1}</option>
    </select>
  );
};
