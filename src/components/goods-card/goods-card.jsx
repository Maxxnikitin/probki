import React from "react";
import styles from "./goods-card.module.css";
import { textGoodsCard } from "../../texts/ru";
import { Rating } from "../ui/rating/rating";
import { Button } from "../ui/button/button";

export const GoodsCard = ({
  img,
  alt = textGoodsCard.imgAlt,
  name,
  cost = 0,
  volume = 0,
  stock = 0,
  rating = 0.0,
  isRow = true,
  extraClass = "",
}) => {
  const renderRow = () => {
    return (
      <article className={`${styles.content} ${extraClass}`}>
        <img className={`${styles.img} mr-16`} src={img} alt={alt} />
        <div className={styles.main_info}>
          <div className={`${styles.name_box}`}>
            <h3
              className={`${styles.name} text text_type_large text_color_white`}
            >
              {name}
            </h3>
            <p
              className={`${styles.cost} text text_type_large text_color_primary`}
            >{`${cost} ${textGoodsCard.currency}`}</p>
          </div>
          <div className={styles.description}>
            <div className={styles.info}>
              <p
                className={`${styles.volume} text text_type_small text_color_additional mb-2`}
              >{`${textGoodsCard.volume}: ${volume} ${textGoodsCard.volumeUnit}`}</p>
              <p
                className={`${styles.stock} text text_type_medium text_color_white mb-4`}
              >
                {`${textGoodsCard.stock}: `}
                <span className="text text_type_medium text_color_select">{`${stock} ${textGoodsCard.stockUnit}`}</span>
              </p>
              <Rating rating={rating} />
            </div>
            <Button kind="cart" text={textGoodsCard.btnText} />
          </div>
        </div>
      </article>
    );
  };

  const renderCell = () => {
    return (
      <article className={`${styles.cell} ${extraClass}`}>
        <img className={`${styles.img} mb-2`} src={img} alt={alt} />
        <Rating rating={rating} extraClass={styles.rating} />
        <h3
          className={`${styles.name} text text_type_medium text_color_white mb-4`}
        >
          {name}
        </h3>
        <p
          className={`${styles.volume} text text_type_small text_color_additional mb-8`}
        >{`${textGoodsCard.volume}: ${volume} ${textGoodsCard.volumeUnit}`}</p>
        <div className={styles.button_box}>
          <p
            className={`${styles.cost} text text_type_large text_color_primary`}
          >{`${cost} ${textGoodsCard.currency}`}</p>
          <Button kind="cart" text={textGoodsCard.btnText} extraClass={styles.button} />
        </div>
      </article>
    );
  };

  return isRow ? renderRow() : renderCell();
};
