import React from "react";
import styles from "./feedback-card.module.css";
import { textFeedbackCard } from "../../texts/ru";
import { Feedback } from "../ui/feedback/feedback";
import { Button } from "../ui/button/button";

export const FeedbackCard = ({ extraClass = "" }) => {
  return (
    <section className={`${styles.content} ${extraClass} pt-20 pb-20`}>
      <div className={`${styles.title_box} mb-8`}>
        <h3 className={`${styles.title} text text_type_h3 text_color_primary`}>
          {textFeedbackCard.title}
        </h3>
        <a className={`${styles.link} text text_type_medium text_color_link`} href="yandex.ru">
          {textFeedbackCard.allFeedback}
        </a>
      </div>
      <Feedback
        name="Иван Иванов"
        rating={5}
        dignity="Пиво называется фирменное по спецзаказу, но я ничего лично фирменного в нем не обнаружил. Пиво среднего качества. Посредственный вкус. Не рекомендую."
        defects="Не понравилось. Есть более достойные аналоги"
      />
      <Feedback
        name="Иван Иванов"
        rating={5}
        dignity="Пиво называется фирменное по спецзаказу, но я ничего лично фирменного в нем не обнаружил. Пиво среднего качества. Посредственный вкус. Не рекомендую."
        defects="Не понравилось. Есть более достойные аналоги"
        extraClass="mt-7 mb-12"
      />
      <Button kind="cart" text={textFeedbackCard.btnText} />
    </section>
  );
};
