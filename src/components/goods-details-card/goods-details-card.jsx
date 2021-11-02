import React from "react";
import styles from "./goods-details-card.module.css";
import { textGoodsDetailsCard } from "../../texts/ru";
import { Button } from "../ui/button/button";
import { GoodsCount } from "../ui/goods-count/goods-count";
import { Rating } from "../ui/rating/rating";

export const GoodsDetailsCard = ({
  img,
  alt = textGoodsDetailsCard.imgAlt,
  title,
  stock = 0,
  info,
  cost = 0,
  rating = 0,
  description,
  extraClass = "",
}) => {
  const mainInfo = [
    "producer",
    "brand",
    "ibu",
    "style",
    "color",
    "density",
    "strength",
    "taste",
    "volume",
  ];

  return (
    <article className={`${styles.content} ${extraClass}`}>
      <div className={styles.goods_info}>
        <div className={styles.img_box}>
          <img className={styles.img} src={img} alt={alt} />
          <Rating extraClass={styles.rating} rating={rating} />
        </div>
        <div className={styles.info_box}>
          <h2
            className={`${styles.title} text text_type_h2 text_color_white mb-5`}
          >
            {title}
          </h2>
          <p className="text text_type_medium text_color_white mb-8">
            {`${textGoodsDetailsCard.stock}: `}
            <span className="text text_type_medium text_color_stock">{`${stock} ${textGoodsDetailsCard.stockUnit}`}</span>
          </p>
          <div className={`${styles.info} mb-12`}>
            {mainInfo.map((item, index) => {
              return (
                <div className={styles.info_row} key={index}>
                  <p className="text text_type_medium text_color_white">
                    {textGoodsDetailsCard[item]}
                  </p>
                  <p className="text text_type_medium text_color_primary">
                    {info[item]}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.btns_n_cost_box}>
            <div className={styles.cost_box}>
              <p className="text text_type_cart text_color_white">{`${cost} ${textGoodsDetailsCard.currency} / ${textGoodsDetailsCard.stockUnit}`}</p>
              <p className="text text_type_small text_color_white">
                {textGoodsDetailsCard.points}
              </p>
            </div>
            <div className={styles.btns_box}>
              <GoodsCount extraClass="mr-10" />
              <Button kind="cart" text={textGoodsDetailsCard.btnText} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.description_box} mt-15`}>
        <h3 className="text text_type_h3 text_color_primary mb-8">
          {textGoodsDetailsCard.description}
        </h3>
        <p
          className={`${styles.description} text text_type_medium text_color_white`}
        >
          {description}
        </p>
      </div>
    </article>
  );
};
