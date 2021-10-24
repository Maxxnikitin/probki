import React from "react";
import styles from "./cart-goods.module.css";
import { textGoodsCard } from "../../texts/ru";
import { GoodsCount } from "../ui/goods-count/goods-count";
import delIcon from "../../images/icons/del.svg";

export const CartGoods = ({
  img,
  alt = textGoodsCard.imgAlt,
  name,
  cost = 0,
  volume = 0,
  stock = 0,
  rating = 0.0,
  extraClass = "",
}) => {
  return (
    <article className={`${styles.content} p-12 ${extraClass}`}>
      <img className={`${styles.img} mr-16`} src={img} alt={alt} />
      <div className={styles.main_info}>
        <div className={`${styles.name_box}`}>
          <h3
            className={`${styles.name} text text_type_large text_color_black mb-4`}
          >
            {name}
          </h3>
          <p
            className={`${styles.cost} text text_type_cart text_color_black`}
          >{`${cost} ${textGoodsCard.currency}`}</p>
        </div>
        <div className={styles.description}>
          <div className={styles.info}>
            <p
              className={`${styles.stock} text text_type_medium text_color_black mb-8`}
            >
              {`${textGoodsCard.stock}: `}
              <span className="text text_type_medium text_color_stock">{`${stock} ${textGoodsCard.stockUnit}`}</span>
            </p>
            <GoodsCount />
          </div>
          <button type="button" className={styles.del_btn}>
            <img
              className={styles.del_icon}
              src={delIcon}
              alt={textGoodsCard.delAlt}
            />
          </button>
        </div>
      </div>
    </article>
  );
};
