import React from "react";
import styles from "./rating.module.css";
import starIcon from "../../../images/icons/star.svg";
import { allTexts } from "../../../texts/ru";

export const Rating = ({ rating, extraClass = "" }) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      <img
        className={`${styles.icon} mr-3`}
        src={starIcon}
        alt={allTexts.goodsCard.ratingAlt}
      />
      <p className={`${styles.rating} text text_type_medium text_color_rating`}>
        {rating.toFixed(1)}
      </p>
    </div>
  );
};
