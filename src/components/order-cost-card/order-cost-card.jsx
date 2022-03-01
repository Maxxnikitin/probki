import React from "react";
import styles from "./order-cost-card.module.css";
import { FormContainer } from "../ui/form-container/form-container";
import { textOrderCostCard } from "../../texts/ru";
import { Button } from "../ui/button/button";
import { UserContext } from "../../utils/context";

export const OrderCostCard = ({
  handleSetOrder,
  isLogin,
  isDisabled,
  totalPrice,
  extraClass = "",
}) => {
  const titleColor = isLogin ? "primary" : "black";
  const [user] = React.useContext(UserContext);
  const [bonuses, setBonuses] = React.useState(0);

  React.useEffect(() => {
    user.phone && setBonuses(Math.floor(user.bonuses));
  }, [user]);

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
          <p className="text text_type_large text_color_black">{`${totalPrice} ${textOrderCostCard.currency}`}</p>
        </div>
        {isLogin && (
          <div className={styles.points_box}>
            <p className="text text_type_h3 text_color_black">
              {textOrderCostCard.points}
            </p>
            <p className="text text_type_large text_color_red">{bonuses}</p>
          </div>
        )}
        <Button
          extraClass={styles.btn}
          disabled={isDisabled}
          kind="form"
          type="button"
          text={textOrderCostCard.btnText}
          onClick={handleSetOrder}
        />
      </div>
    </FormContainer>
  );
};
