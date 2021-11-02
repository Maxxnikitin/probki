import React from "react";
import styles from "./reservation-card.module.css";
import { textReservationCard } from "../../texts/ru";

export const ReservationCard = ({ order, cost, extraClass = "" }) => {
  return (
    <section className={`${styles.content} ${extraClass}`}>
      <h2 className="text text_type_h2 text_color_primary mn-1">
        {textReservationCard.title}
      </h2>
      <p
        className={`${styles.text} text text_type_large text_color_white mb-4`}
      >
        {textReservationCard.text}
      </p>
      <p className="text text_type_h3 text_color_white mb-12">
        {textReservationCard.address}
      </p>
      <p className={`${styles.big_text} text text_type_h2 text_color_white`}>
        {`${textReservationCard.orderNumber}: `}
        <b>{order}</b>
      </p>
      <p className={`${styles.big_text} text text_type_h2 text_color_white`}>
        {`${textReservationCard.cost}: `}
        <b>{cost}</b>
        {` ${textReservationCard.currency}`}
      </p>
    </section>
  );
};
