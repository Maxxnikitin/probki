import React from "react";
import styles from "./goods-count.module.css";
import { CartContext } from "../../../utils/context";
import {
  postGoodInCart,
  getCart,
  deleteGoodFromCart,
  refreshToken,
} from "../../../utils/api";

export const GoodsCount = ({ good, extraClass = "" }) => {
  const [cart, setCart] = React.useContext(CartContext);
  const [increaseDisabled, setIncreaseDisabled] = React.useState(false);

  const cartAmount =
    cart.length &&
    cart.find((x) => x.product === good.id) &&
    cart.find((x) => x.product === good.id).amount;
  const goodAmount = +good.amount.split(".")[0];

  const handleDecreaseBtn = () => {
    increaseDisabled && setIncreaseDisabled(false);
    if (cartAmount >= goodAmount + 1) {
      setIncreaseDisabled(true);
    } else {
      increaseDisabled && setIncreaseDisabled(false);
    }
    deleteGoodFromCart(good.id).then((res) => {
      if (res && res.status) {
        getCart().then((res) => {
          setCart(res);
        });
        return res;
      } else {
        refreshToken().then((res) => {
          localStorage.setItem("token", res.access);
          deleteGoodFromCart(good.id, res.access).then((res) => {
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
  };

  const handleIncreaseBtn = () => {
    if (cartAmount >= goodAmount - 1) {
      setIncreaseDisabled(true);
    }
    postGoodInCart(good.id).then((res) => {
      if (res && res.status) {
        getCart().then((res) => {
          setCart(res);
        });
        return res;
      } else {
        refreshToken().then((res) => {
          localStorage.setItem("token", res.access);
          postGoodInCart(good.id, res.access).then((res) => {
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
  };

  React.useEffect(() => {
    if (cartAmount >= goodAmount) {
      setIncreaseDisabled(true);
    } else {
      increaseDisabled && setIncreaseDisabled(false);
    }
  }, [cartAmount, good.amount, goodAmount, increaseDisabled]);

  return (
    <div className={`${styles.container} ${extraClass}`}>
      <button
        className={`${styles.button} text text_type_goods-count`}
        type="button"
        onClick={handleDecreaseBtn}
      >
        -
      </button>
      <p
        className={`${styles.count} text text_type_goods-count text_color_black`}
      >
        {cartAmount}
      </p>
      <button
        disabled={increaseDisabled}
        className={`${styles.button} text text_type_goods-count`}
        type="button"
        onClick={handleIncreaseBtn}
      >
        +
      </button>
    </div>
  );
};
