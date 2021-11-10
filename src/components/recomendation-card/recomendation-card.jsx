import React from "react";
import styles from "./recomendation-card.module.css";
import { textRecomendationCard } from "../../texts/ru";
import { GoodsCard } from "../goods-card/goods-card";
import { Button } from "../ui/button/button";
import { NavButton } from "../ui/nav-button/nav-button";
import img from "../../images/1.jpg";

export const RecomendationCard = ({ extraClass = "" }) => {
  return (
    <section className={`${styles.content} ${extraClass} pt-20 pb-20`}>
      <h2
        className={`${styles.title} text text_type_h2 text_color_primary mb-20`}
      >
        {textRecomendationCard.title}
      </h2>
      <div className={`${styles.cards} mb-30`}>
        <GoodsCard
          img={img}
          name="Пиво Найтберг Pivzdrav Жигулёвское"
          volume={3}
          cost="1245"
          rating={5}
          isRow={false}
        />
        <GoodsCard
          img={img}
          name="Пиво Найтберг Pivzdrav Жигулёвское"
          volume={3}
          cost="1245"
          rating={5}
          isRow={false}
        />
        <GoodsCard
          img={img}
          name="Пиво Найтберг Pivzdrav Жигулёвское"
          volume={3}
          cost="1245"
          rating={5}
          isRow={false}
        />
        <GoodsCard
          img={img}
          name="Пиво Найтберг Pivzdrav Жигулёвское"
          volume={3}
          cost="1245"
          rating={5}
          isRow={false}
        />
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
