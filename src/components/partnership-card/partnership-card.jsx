import React from "react";
import styles from "./partnership-card.module.css";
import { textPartnershipCard } from "../../texts/ru";

export const PartnershipCard = ({
  img,
  alt = textPartnershipCard.imgAlt,
  title,
  text,
  extraClass = "",
}) => {
  return (
    <article className={`${styles.content} ${extraClass}`}>
      <h3
        className={`${styles.title} text text_type_large-semibold text_color_primary mb-1`}
      >
        {title}
      </h3>
      <figure className={styles.figure}>
        <figcaption
          className={`${styles.figcaption} text text_type_medium text_color_secondary mb-12`}
        >
          {text}
        </figcaption>
        <img className={styles.img} src={img} alt={alt} />
      </figure>
    </article>
  );
};
