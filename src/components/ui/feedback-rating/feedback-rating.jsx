import React from "react";
import styles from "./feedback-rating.module.css";
import icon from "../../../images/icons/star2.svg";
import { textFeedback } from "../../../texts/ru";

export const FeedbackRating = ({ rating, extraClass = "" }) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      <img
        className={styles.icon}
        src={icon}
        alt={textFeedback.ratingAlt}
      />
      <p
        className={`${styles.text} text text_type_medium text_color_white ml-2`}
      >
        {rating.toFixed(1)}
      </p>
    </div>
  );
};
