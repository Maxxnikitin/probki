import React from "react";
import styles from "./select.module.css";
import { textShopsData } from "../../../texts/ru";

export const Select = ({ defaultValue = "value1", extraClass = "" }) => {
  return (
    <select
      type="select"
      className={`${styles.select} ${extraClass} text text_type_medium text_color_select }`}
      defaultValue="value1"
    >
      <option value="value1">{textShopsData.krasnoarmeiskaya.address}</option>
      <option value="value2">{textShopsData.kosmonavtov.address}</option>
      <option value="value3">{textShopsData.krymskaya.address}</option>
      <option value="value4">{textShopsData.dugina.address}</option>
      <option value="value5">{textShopsData.solnechnaya.address}</option>
      <option value="value6">{textShopsData.chkalova.address}</option>
      <option value="value7">{textShopsData.bazhenova.address}</option>
      <option value="value8">{textShopsData.barykina.address}</option>
      <option value="value9">{textShopsData.pochtovoe.address}</option>
      <option value="value10">{textShopsData.sosnovaya.address}</option>
    </select>
  );
};
