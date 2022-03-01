import React from "react";
import styles from "./cart-goods.module.css";
import { textGoodsCard } from "../../texts/ru";
import { GoodsCount } from "../ui/goods-count/goods-count";
import delIcon from "../../images/icons/del.svg";
import goodsImg from "../../images/good.jpg";
import { CartContext } from "../../utils/context";
import { getPrice } from "../../utils/constants";
import {
  deleteGoodFromCart,
  getCart,
  getProduct,
  refreshToken,
} from "../../utils/api";

export const CartGoods = ({
  currentShop,
  cartGood,
  unitsArr,
  extraClass = "",
}) => {
  const [currentUnit, setCurrentUnit] = React.useState("");
  const [cart, setCart] = React.useContext(CartContext);
  const [good, setGood] = React.useState({});

  const handleRemoveGood = () => {
    for (let i = cartGood.amount; i > 0; --i) {
      deleteGoodFromCart(cartGood.product).then((res) => {
        if (res && res.status) {
          getCart().then((res) => {
            setCart(res);
          });
          return res;
        } else {
          refreshToken().then((res) => {
            localStorage.setItem("token", res.access);
            deleteGoodFromCart(cartGood.product, res.access).then((res) => {
              if (res && res.status) {
                getCart().then((res) => {
                  setCart(res);
                });
                return res;
              }
            });
          });
        }
      });
    }
  };

  React.useEffect(() => {
    currentShop.id &&
      getProduct(currentShop.id, cartGood.product).then((res) => {
        setGood(res);
      });
  }, [cartGood.product, currentShop]);

  React.useEffect(() => {
    unitsArr.length &&
      good.unit &&
      setCurrentUnit(unitsArr.find((x) => x.id === good.unit).name);
  }, [cartGood.unit, good.unit, unitsArr]);

  return (
    <article className={`${styles.content} p-12 ${extraClass}`}>
      {good && good.id && (
        <>
          <div className={styles.main_content}>
            <img
              className={`${styles.img} mr-16`}
              src={good.image ?? goodsImg}
              alt={textGoodsCard.imgAlt}
            />
            <div className={styles.main_info}>
              <div className={`${styles.name_box}`}>
                <h3
                  className={`${styles.name} text text_type_large text_color_black mb-4`}
                >
                  {good.name}
                </h3>
                <p
                  className={`${styles.price} text text_type_cart text_color_black`}
                >{`${getPrice(good)} ${textGoodsCard.currency}`}</p>
              </div>
              <div className={styles.description}>
                <div className={styles.info}>
                  <p
                    className={`${styles.amount} text text_type_medium text_color_black mb-8`}
                  >
                    {`${textGoodsCard.amount}: `}
                    <span className="text text_type_medium text_color_stock">{`${
                      good.amount.split(".")[0]
                    } ${currentUnit}`}</span>
                  </p>
                  <GoodsCount good={good} extraClass={styles.hidden} />
                </div>
                <p
                  className={`${styles.mob_price} ${styles.hidden} text text_type_cart text_color_black`}
                >{`${getPrice(good)} ${textGoodsCard.currency}`}</p>
                <button
                  type="button"
                  className={`${styles.del_btn} ${styles.hidden}`}
                  onClick={handleRemoveGood}
                >
                  <img
                    className={styles.del_icon}
                    src={delIcon}
                    alt={textGoodsCard.delAlt}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.mob_row}>
            <GoodsCount good={good} />
            <div className={styles.price_del_box}>
              <p
                className={`${styles.mob_price} text text_type_cart text_color_black`}
              >{`${getPrice(good)} ${textGoodsCard.currency}`}</p>
              <button
                type="button"
                className={styles.del_btn}
                onClick={handleRemoveGood}
              >
                <img
                  className={styles.del_icon}
                  src={delIcon}
                  alt={textGoodsCard.delAlt}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
};
