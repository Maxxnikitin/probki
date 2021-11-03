import React from "react";
import styles from "./order-cost-card.module.css";
import { FormContainer } from "../ui/form-container/form-container";
import { textOrderCostCard } from "../../texts/ru";
import { Button } from "../ui/button/button";

export const OrderCostCard = ({ totalCost = 0, extraClass = "" }) => {
  return (
    <FormContainer>
      <div className={`${styles.content} ${extraClass}`}>
        <h2 className="text text_type_h2 text_color_black mb-15">
          {textOrderCostCard.title}
        </h2>
        <div className={styles.cost_box}>
          <p className="text text_type_h3 text_color_black">
            {textOrderCostCard.text}
          </p>
          <p className="text text_type_large text_color_black">{`${totalCost} ${textOrderCostCard.currency}`}</p>
        </div>
        <Button disabled={true} kind="form" type="button" text={textOrderCostCard.btnText} />
      </div>
    </FormContainer>
  );
};
