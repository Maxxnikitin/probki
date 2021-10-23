import React from "react";
import styles from "./goods-card.module.css";
import { allTexts } from "../../texts/ru";
import { Rating } from "../ui/rating/rating";
import { Button } from "../ui/button/button";

export const GoodsCard = ({
  img,
  alt = allTexts.goodsCard.imgAlt,
  name,
  cost = 0,
  volume = 0,
  stock = 0,
  rating = 0.0,
  extraClass = "",
}) => {
  const text = allTexts.goodsCard;

  return (
    <article className={`${styles.content} ${extraClass}`}>
      <img className={`${styles.img} mr-16`} src={img} alt={alt} />
      <div className={styles.mainInfo}>
        <div className={`${styles.nameBox} mb-15`}>
          <h3 className={`${styles.name} text text_type_large text_color_white`}>
            {name}
          </h3>
          <p
            className={`${styles.cost} text text_type_large text_color_primary`}
          >{`${cost} ${text.currency}`}</p>
        </div>
        <div className={styles.description}>
          <div className={styles.info}>
            <p
              className={`${styles.volume} text text_type_small text_color_additional mb-2`}
            >{`${text.volume}: ${volume} ${text.volumeUnit}`}</p>
            <p
              className={`${styles.stock} text text_type_medium text_color_white mb-4`}
            >{`${text.stock}: `}<span className="text text_type_medium text_color_select">{`${stock} ${text.stockUnit}`}</span></p>
            <Rating rating={rating} />
          </div>
          <Button kind="cart" text={text.btnText} />
        </div>
      </div>
    </article>
  );
};
