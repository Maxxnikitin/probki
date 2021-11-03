import React from "react";
import styles from "./order-cost-card.module.css";
import { FormContainer } from "../ui/form-container/form-container";
import { textOrderCostCard } from "../../texts/ru";
import { Button } from "../ui/button/button";
import { Checkbox } from "../ui/checkbox/checkbox";
import { Input } from "../ui/input/input";

export const OrderCostCard = ({
  totalCost = 0,
  userPoints = 0,
  extraClass = "",
}) => {
  const isLogin = false;
  const titleColor = isLogin ? "primary" : "black";

  return (
    <FormContainer>
      <div className={`${styles.content} ${extraClass}`}>
        <h2
          className={`${styles.title} text text_type_h2 text_color_${titleColor} mb-15`}
        >
          {textOrderCostCard.title}
        </h2>
        <div className={styles.cost_box}>
          <p className="text text_type_h3 text_color_black">
            {textOrderCostCard.cost}
          </p>
          <p className="text text_type_large text_color_black">{`${totalCost} ${textOrderCostCard.currency}`}</p>
        </div>
        {isLogin && (
          <>
            <div className={styles.points_box}>
              <p className="text text_type_h3 text_color_black">
                {textOrderCostCard.points}
              </p>
              <p className="text text_type_large text_color_red">
                {userPoints}
              </p>
            </div>
            <Checkbox
              label={textOrderCostCard.writeOff}
              name="points"
              extraClass={styles.checkbox}
            />
            <Input label={textOrderCostCard.label} extraClass="mt-9" />
          </>
        )}
        <Button
          extraClass={styles.btn}
          disabled={!isLogin}
          kind="form"
          type="button"
          text={textOrderCostCard.btnText}
        />
      </div>
    </FormContainer>
  );
};
