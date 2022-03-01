import React from "react";
import styles from "./select-sorting.module.css";
import { textAssortmentPage } from "../../../texts/ru";

export const SelectSorting = ({ onChange, value, extraClass = "" }) => {
  return (
    <select
      type="select"
      className={`${styles.select} ${extraClass} text text_type_medium text_color_select }`}
      value={value}
      onChange={onChange}
    >
      <option name="default" value="default">--------------------</option>
      <option name="price" value="price">{textAssortmentPage.sorting1}</option>
      <option name="-price" value="-price">{textAssortmentPage.sorting1_1}</option>
      <option name="name" value="name">{textAssortmentPage.sorting2}</option>
      <option name="-name" value="-name">{textAssortmentPage.sorting2_1}</option>
      <option name="amount" value="amount">{textAssortmentPage.sorting3}</option>
      <option name="-amount" value="-amount">{textAssortmentPage.sorting3_1}</option>
    </select>
  );
};
