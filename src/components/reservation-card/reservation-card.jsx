import React from "react";
import styles from "./reservation-card.module.css";
import { textReservationCard } from "../../texts/ru";
import { CartGoods } from "../cart-goods/cart-goods";
import img from '../../images/1.jpg';
import { SignUp } from "../sign-up/sign-up";
import { OrderCostCard } from "../order-cost-card/order-cost-card";

export const ReservationCard = ({ order = 0, totalCost = 0, extraClass = "" }) => {
  const [step, setStep] = React.useState(2);

  return (
    <section className={`${styles.content} ${extraClass}`}>
      {step === 1 && (
        <>
          <h2 className="text text_type_h2 text_color_primary mn-1">
            {textReservationCard.title1}
          </h2>
          <p
            className={`${styles.text} text text_type_large text_color_white mb-4`}
          >
            {textReservationCard.text}
          </p>
          <p className="text text_type_h3 text_color_white mb-12">
            {textReservationCard.address}
          </p>
          <div className={styles.main_content}>
            <div className={styles.goods_cards}>
              <CartGoods img={img} name="Пиво Жигулёвское фирменное (Томск) Свет. Фильтр." cost={79} stock={17} />
              <CartGoods img={img} name="Пиво Жигулёвское фирменное (Томск) Свет. Фильтр." cost={79} stock={17} />
              <CartGoods img={img} name="Пиво Жигулёвское фирменное (Томск) Свет. Фильтр." cost={79} stock={17} />
            </div>
            <div className={styles.forms}>
              <OrderCostCard totalCost={237} />
              <SignUp />
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text text_type_h2 text_color_primary mn-1">
            {textReservationCard.title2}
          </h2>
          <p
            className={`${styles.text} text text_type_large text_color_white mb-4`}
          >
            {textReservationCard.text}
          </p>
          <p className="text text_type_h3 text_color_white mb-12">
            {textReservationCard.address}
          </p>
          <p
            className={`${styles.big_text} text text_type_h2 text_color_white`}
          >
            {`${textReservationCard.orderNumber}: `}
            <b>{order}</b>
          </p>
          <p
            className={`${styles.big_text} text text_type_h2 text_color_white`}
          >
            {`${textReservationCard.cost}: `}
            <b>{totalCost}</b>
            {` ${textReservationCard.currency}`}
          </p>
        </>
      )}
    </section>
  );
};
