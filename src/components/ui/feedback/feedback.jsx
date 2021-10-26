import React from "react";
import styles from "./feedback.module.css";
import { textFeedback } from "../../../texts/ru";
import { FeedbackRating } from "../feedback-rating/feedback-rating";

export const Feedback = ({
  name,
  rating,
  dignity,
  defects,
  extraClass = "",
}) => {
  return (
    <section
      className={`${styles.content} text text_type_medium text_color_white p-8 ${extraClass}`}
    >
      <div className={styles.header}>
        <p className={`${styles.name} text mr-4`}>{name}</p>
        <FeedbackRating rating={rating} />
      </div>
      <p className={`${styles.text} mt-6 mb-10`}>
        <b>{textFeedback.dignity}</b>
        {dignity}
      </p>
      <p className={`${styles.text} text`}>
        <b>{textFeedback.defects}</b>
        {defects}
      </p>
    </section>
  );
};
