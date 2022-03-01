import React from "react";
import styles from "./recomendation-card.module.css";
import { textRecomendationCard } from "../../texts/ru";
import { GoodsCard } from "../goods-card/goods-card";
import { NavButton } from "../ui/nav-button/nav-button";
import { getRecommendationsCards } from "../../utils/api";

export const RecomendationCard = ({ extraClass = "" }) => {
  React.useEffect(() => {
    getRecommendationsCards().then((res) => {
      console.log(res);
    })
  }, []);

  return (
    <section className={`${styles.content} ${extraClass} pt-20 pb-20`}>
      <h2
        className={`${styles.title} text text_type_h2 text_color_primary mb-20`}
      >
        {textRecomendationCard.title}
      </h2>
      <div className={`${styles.cards} mb-30`}>
        
      </div>
      <NavButton
        to="/assortment"
        kind="form"
        text={textRecomendationCard.btnText}
        extraClass={styles.btn}
      />
    </section>
  );
};
