import React from "react";
import styles from "./goods-count.module.css";

export const GoodsCount = ({
  decreaseDisabled = false,
  increaseDisabled = false,
  extraClass = "",
}) => {
  return (
    <div className={`${styles.container} ${extraClass}`}>
      <button
        disabled={decreaseDisabled}
        className={`${styles.button} text text_type_goods-count`}
        type="button"
      >
        -
      </button>
      <p
        className={`${styles.count} text text_type_goods-count text_color_black`}
      >
        1
      </p>
      <button
        disabled={increaseDisabled}
        className={`${styles.button} text text_type_goods-count`}
        type="button"
      >
        +
      </button>
    </div>
  );
};
