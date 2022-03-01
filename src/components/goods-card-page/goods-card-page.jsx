import React from "react";
import styles from "./goods-card-page.module.css";
import { GoodsDetailsCard } from "../goods-details-card/goods-details-card";

export const GoodsCardPage = ({
  setFilterQuery,
  unitsArr,
  extraClass = "",
}) => {
  return (
    <div className={`${styles.page} ${extraClass}`}>
      <main className={styles.content}>
        <GoodsDetailsCard setFilterQuery={setFilterQuery} unitsArr={unitsArr} />
      </main>
    </div>
  );
};
