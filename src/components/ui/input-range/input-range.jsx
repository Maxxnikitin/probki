import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./input-range.module.css";
import { textInputRange } from "../../../texts/ru";

export const InputRange = ({
  from,
  to,
  setFiltersData,
  filtersData,
  name,
  label = textInputRange.defaultLabel,
  extraClass = "",
}) => {
  const [fromState, fromSetState] = React.useState(filtersData[`${name}__gte`] ?? from);
  const [toState, toSetState] = React.useState(filtersData[`${name}__lte`] ?? to);

  const onFiltersChange = (val) => {
    const nameLte = `${name}__lte`;
    const nameGte = `${name}__gte`;
    setFiltersData({
      ...filtersData,
      [nameGte]: val[0],
      [nameLte]: val[1],
    });
    fromSetState(val[0]);
    toSetState(val[1]);
  };

  const handleChangeInput = (e) => {
    setFiltersData({
      ...filtersData,
      [e.target.name]: e.target.value,
    });
    e.target.name === `${name}__gte` && fromSetState(e.target.value);
    e.target.name === `${name}__lte` && toSetState(e.target.value);
  }

  React.useEffect(() => {
    filtersData[`${name}__gte`] && fromSetState(filtersData[`${name}__gte`])
    filtersData[`${name}__lte`] && toSetState(filtersData[`${name}__lte`])
  }, [filtersData, name])

  return (
    <div
      className={`${styles.content} ${extraClass} text text_type_medium text_color_secondary mb-12`}
    >
      <p className={`${styles.label} mb-4`}>{label}</p>
      <div className={`${styles.inputs_box} mb-5`}>
        <div className={styles.input_box}>
          <p
            className={`${styles.input_label} text text_type_medium text_color_select`}
          >
            {textInputRange.from}
          </p>
          <input
            type="number"
            name={`${name}__gte`}
            min={from}
            max={to}
            className={`${styles.input} text text_type_medium text_color_secondary`}
            value={fromState}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.input_box}>
          <p
            className={`${styles.input_label} text text_type_medium text_color_select`}
          >
            {textInputRange.to}
          </p>
          <input
            type="number"
            name={`${name}__lte`}
            min={from}
            max={to}
            className={`${styles.input} text text_type_medium text_color_secondary`}
            value={toState}
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <Range
        min={from}
        max={to}
        step={name === "volume" ? 0.25 : 1}
        onChange={onFiltersChange}
        value={[fromState, toState]}
      />
    </div>
  );
};
