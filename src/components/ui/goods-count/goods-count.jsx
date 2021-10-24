import React from "react";
import styles from "./goods-count.module.css";

export const GoodsCount = ({ disabled = false, extraClass = "" }) => {
  return (
    <div
      className={`${styles.container} ${extraClass}`}
    >
      <button disabled={disabled} className={`${styles.button} text text_type_goods-count`} type="button">
        -
      </button>
      <p className={`${styles.count} text text_type_goods-count text_color_black`}>1</p>
      <button disabled={disabled} className={`${styles.button} text text_type_goods-count`} type="button">
        +
      </button>
    </div>
  );
};
