import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { textGoodsDetailsCard } from "../../texts/ru";
import { Button } from "../ui/button/button";
import { GoodsCount } from "../ui/goods-count/goods-count";
import { Rating } from "../ui/rating/rating";
import { getProduct, refreshToken } from "../../utils/api";
import { BreadCrumbs } from "../ui/bread-crumbs/bread-crumbs";
import goodImg from "../../images/good.jpg";
import { UserContext, CartContext } from "../../utils/context";
import { getCart, postGoodInCart } from "../../utils/api";
import { Modal } from "../ui/modal/modal";
import { SignIn } from "../sign-in/sign-in";
import { SignUp } from "../sign-up/sign-up";
import styles from "./goods-details-card.module.css";

export const GoodsDetailsCard = ({
  setFilterQuery,
  unitsArr,
  extraClass = "",
}) => {
  const [good, setGood] = React.useState({});
  const [cart, setCart] = React.useContext(CartContext);
  const [user] = React.useContext(UserContext);
  const [unit, setUnit] = React.useState("");
  const [isInCart, setIsInCart] = React.useState(false);
  const [isLogOpen, setIsLogOpen] = React.useState(false);
  const [isRegOpen, setIsRegOpen] = React.useState(false);

  const { id } = useParams();
  const history = useHistory();

  const mainInfo = [];

  if (good.id) {
    for (let key in good) {
      if (good[key]) {
        for (let j in textGoodsDetailsCard.mainInfo) {
          if (key === j) {
            mainInfo.push(key);
          }
        }
      }
    }
  }

  const handleCloseModal = () => {
    isLogOpen && setIsLogOpen(false);
    isRegOpen && setIsRegOpen(false);
  };

  const handleLogOpen = () => {
    setIsLogOpen(true);
    isRegOpen && setIsRegOpen(false);
  };

  const handleRegOpen = () => {
    setIsRegOpen(true);
    isLogOpen && setIsLogOpen(false);
  };

  const handleBuyGood = () => {
    if (!user.phone) {
      handleRegOpen();
      return;
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
    const shopId = JSON.parse(localStorage.getItem("currentShop")).id || 1;
    getProduct(shopId, id).then((res) => {
      setGood(res);
      unitsArr.length && setUnit(unitsArr.find((x) => x.id === res.unit).name);
    });
  }, [good.id, id, unit, unitsArr]);

  React.useEffect(() => {
    let inCart = false;
    cart.forEach((item) => {
      if (item.product === good.id) {
        inCart = true;
      }
    });
    if (inCart) {
      !isInCart && setIsInCart(true);
    } else {
      isInCart && setIsInCart(false);
    }
  }, [cart, good.id, isInCart]);

  const getPrice = () => {
    if (!good.id) {
      return "-";
    } else {
      const coins = good.price.split(".")[1];
      if (coins === "00") {
        return good.price.split(".")[0];
      } else {
        return `${good.price.split(".")[0]}.${coins[0]}`;
      }
    }
  };

  const handleToFilters = (e) => {
    const arr = [];
    for (let key in good) {
      if (key === "volume" || key === "abv" || key === "density") {
        if (
          +good[key]?.toString().trim() ===
          +e.target.textContent.trim().split(" ")[0]
        ) {
          arr.push(key);
          arr.push(+good[key]);
        }
      } else if (good[key]?.toString().trim() === e.target.textContent.trim()) {
        arr.push(key);
        arr.push(good[key]);
      }
      setFilterQuery(arr);
      history.push("/assortment");
    }
  };

  return (
    <article className={`${styles.content} ${extraClass}`}>
      {good.id && (
        <>
          <BreadCrumbs goodName={good.name ?? id} mode="mobile" />
          <div className={styles.goods_info}>
            <h2
              className={`${styles.mob_title} text text_type_h2 text_color_white mb-5`}
            >
              {good.name ?? ""}
            </h2>
            <div className={styles.img_box}>
              <img
                className={styles.img}
                src={good.image ?? goodImg}
                alt={textGoodsDetailsCard.imgAlt}
              />
              <Rating
                extraClass={styles.rating}
                rating={good.rating_score ?? "0.0"}
              />
            </div>
            <div className={styles.info_box}>
              <h2
                className={`${styles.title} text text_type_h2 text_color_white mb-5`}
              >
                {good.name ?? ""}
              </h2>
              <p
                className={`${styles.stock} text text_type_medium text_color_white mb-8`}
              >
                {`${textGoodsDetailsCard.stock}: `}
                <span className="text text_type_medium text_color_stock">{`${
                  good.amount.split(".")[0]
                } ${unit ?? textGoodsDetailsCard.stockUnit}`}</span>
              </p>
              <div className={`${styles.info} mb-12`}>
                {mainInfo.length
                  ? mainInfo.map((item, index) => {
                      const goodInfoRow = isNaN(+good[item])
                        ? good[item]
                        : +good[item];
                      const unit =
                        item === "volume"
                          ? "л"
                          : item === "density" || item === "abv"
                          ? "%"
                          : "";
                      return (
                        <div className={styles.info_row} key={index}>
                          <p className="text text_type_medium text_color_white">
                            {textGoodsDetailsCard.mainInfo[item]}
                          </p>
                          <button
                            type="button"
                            className={styles.btn_to_filters}
                            onClick={handleToFilters}
                          >
                            <p className="text text_type_medium text_color_primary">
                              {`${goodInfoRow} ${unit}`}
                            </p>
                          </button>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <div className={styles.btns_n_price_box}>
                <div className={styles.price_box}>
                  <p
                    className={`${styles.price} text text_type_cart text_color_white`}
                  >{`${getPrice()} ${textGoodsDetailsCard.currency} / ${
                    unit ?? textGoodsDetailsCard.stockUnit
                  }`}</p>
                  <p className="text text_type_small text_color_white">
                    {textGoodsDetailsCard.points}
                  </p>
                </div>
                <div className={styles.btns_box}>
                  {isInCart ? (
                    <GoodsCount good={good} extraClass="mr-10" />
                  ) : (
                    <Button
                      onClick={handleBuyGood}
                      kind="cart"
                      text={textGoodsDetailsCard.btnText}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.addit_btns_n_price_box}>
            <div className={`${styles.price_box} ${styles.mob_price_box}`}>
              <p className="text text_type_cart text_color_white">{`${
                good.price ?? "-"
              } ${textGoodsDetailsCard.currency} / ${
                unit ?? textGoodsDetailsCard.stockUnit
              }`}</p>
              <p className="text text_type_small text_color_white">
                {textGoodsDetailsCard.points}
              </p>
            </div>
            <div className={`${styles.btns_box} ${styles.mob_btns_box}`}>
              {isInCart ? (
                <GoodsCount good={good} extraClass="mr-10" />
              ) : (
                <Button
                  onClick={handleBuyGood}
                  kind="form"
                  text={textGoodsDetailsCard.btnText}
                />
              )}
            </div>
          </div>
          <div className={`${styles.info} ${styles.mob_info}`}>
            <h3
              className={`${styles.subtitle} text text_type_order text_color_primary`}
            >
              {textGoodsDetailsCard.specifications}
            </h3>
            {mainInfo.map((item, index) => {
              const goodInfoRow = isNaN(+good[item]) ? good[item] : +good[item];
              const unit =
                item === "volume"
                  ? "л"
                  : item === "density" || item === "abv"
                  ? "%"
                  : "";
              return (
                <div className={styles.info_row} key={index}>
                  <p className="text text_type_medium text_color_white">
                    {textGoodsDetailsCard.mainInfo[item]}
                  </p>
                  <button
                    type="button"
                    className={styles.btn_to_filters}
                    onClick={handleToFilters}
                  >
                    <p className="text text_type_medium text_color_primary">
                      {`${goodInfoRow} ${unit}`}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
          <div className={`${styles.description_box} mt-15`}>
            <h3 className="text text_type_h3 text_color_primary mb-8">
              {textGoodsDetailsCard.description}
            </h3>
            <p
              className={`${styles.description} text text_type_medium text_color_white`}
            >
              {good.description ?? ""}
            </p>
          </div>
        </>
      )}
      {isLogOpen && (
        <Modal extraClass={styles.modal} onClose={handleCloseModal}>
          <SignIn
            extraClass={styles.reg_form}
            isCloseBtn={true}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      {isRegOpen && (
        <Modal extraClass={styles.modal} onClose={handleCloseModal}>
          <SignUp
            extraClass={styles.reg_form}
            isCloseBtn={true}
            onClose={handleCloseModal}
            isLogInBtn={true}
            handleLogOpen={handleLogOpen}
          />
        </Modal>
      )}
    </article>
  );
};
