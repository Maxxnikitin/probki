import React from "react";
import styles from "./promo-card.module.css";
import { textPromoCard } from "../../texts/ru";

export const PromoCard = ({
  img,
  alt = textPromoCard.imgAlt,
  title,
  text,
  extraClass = "",
}) => {
  return (
    <article className={`${styles.content} ${extraClass}`}>
      <h3
        className={`${styles.title} text text_type_large-semibold text_color_primary mb-8`}
      >
        {title}
      </h3>
      <figure className={styles.figure}>
        <img className={`${styles.img} mb-10`} src={img} alt={alt} />
        <figcaption
          className={`${styles.figcaption} text text_type_medium text_color_secondary`}
        >
          {text}
        </figcaption>
      </figure>
    </article>
  );
};
