import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { textGoodsCard } from "../../texts/ru";
import { Rating } from "../ui/rating/rating";
import { Button } from "../ui/button/button";
import goodsImg from "../../images/good.jpg";
import { CartContext, UserContext } from "../../utils/context";
import { GoodsCount } from "../ui/goods-count/goods-count";
import { getPrice } from "../../utils/constants";
import { getCart, postGoodInCart, refreshToken } from "../../utils/api";
import { Modal } from "../ui/modal/modal";
import { SignIn } from "../sign-in/sign-in";
import { SignUp } from "../sign-up/sign-up";
import styles from "./goods-card.module.css";

export const GoodsCard = ({
  alt = textGoodsCard.imgAlt,
  good,
  isRow = true,
  unitsArr,
  link,
  isInCart,
  extraClass = "",
}) => {
  const { path } = useRouteMatch();
  const [currentUnit, setCurrentUnit] = React.useState("");
  const [cart, setCart] = React.useContext(CartContext);
  const [user] = React.useContext(UserContext);
  const [isLogOpen, setIsLogOpen] = React.useState(false);
  const [isRegOpen, setIsRegOpen] = React.useState(false);

  React.useEffect(() => {
    unitsArr?.length &&
      setCurrentUnit(unitsArr?.find((x) => x.id === good.unit).name);
  }, [cart, good, unitsArr]);

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

  const handleLogOpen = () => {
    setIsLogOpen(true);
    isRegOpen && setIsRegOpen(false);
  };

  const handleRegOpen = () => {
    setIsRegOpen(true);
    isLogOpen && setIsLogOpen(false);
  };

  const handleCloseModal = () => {
    isLogOpen && setIsLogOpen(false);
    isRegOpen && setIsRegOpen(false);
  };

  const renderRow = () => {
    return (
      <article className={`${styles.article} ${extraClass}`}>
        <div className={styles.content}>
          <Link className={styles.navlink} to={`${path}/${good.id}`}>
            <img
              className={`${styles.img} mr-16`}
              src={good.image ?? goodsImg}
              alt={alt}
            />
          </Link>
          <div className={styles.main_info}>
            <div className={`${styles.name_box}`}>
              <Link className={styles.navlink} to={`${path}/${good.id}`}>
                <h3
                  className={`${styles.name} text text_type_large text_color_white`}
                >
                  {good.name}
                </h3>
              </Link>
              <p
                className={`${styles.price} text text_type_large text_color_primary`}
              >{`${getPrice(good)} ${textGoodsCard.currency}`}</p>
            </div>
            <div className={styles.description}>
              <div className={styles.info}>
                <p
                  className={`${styles.volume} text text_type_small text_color_additional mb-2`}
                >{`${textGoodsCard.volume}: ${
                  good.volume ? +good.volume : "—"
                } л`}</p>
                <p
                  className={`${styles.amount} text text_type_medium text_color_white mb-4`}
                >
                  {`${textGoodsCard.amount}: `}
                  <span className="text text_type_medium text_color_select">{`${
                    good.amount.split(".")[0] ?? "—"
                  } ${currentUnit}`}</span>
                </p>
                <Rating rating={good.rating_score} />
              </div>
              {isInCart ? (
                <GoodsCount good={good} extraClass={styles.btn} />
              ) : (
                <Button
                  kind="cart"
                  text={textGoodsCard.btnText}
                  extraClass={styles.btn}
                  onClick={handleBuyGood}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.second_row}>
          <p
            className={`${styles.mob_price} text text_type_large text_color_primary`}
          >{`${getPrice(good)} ${textGoodsCard.currency}`}</p>
          {isInCart ? (
            <GoodsCount good={good} />
          ) : (
            <Button
              kind="cart"
              text={textGoodsCard.btnText}
              extraClass={styles.mob_btn}
              onClick={handleBuyGood}
            />
          )}
        </div>
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

  const renderCell = () => {
    return (
      <article className={`${styles.cell} ${extraClass}`}>
        <Link className={styles.navlink} to={`${link ?? path}/${good?.id}`}>
          <img
            className={`${styles.img} mb-2`}
            src={good.image ?? goodsImg}
            alt={alt}
          />
          <Rating rating={good?.rating_score} extraClass={styles.rating} />
          <h3
            className={`${styles.name} text text_type_medium text_color_white mb-4`}
          >
            {good?.name}
          </h3>
        </Link>
        <p
          className={`${styles.volume} text text_type_small text_color_additional mb-8`}
        >{`${textGoodsCard.volume}: ${good.volume ? +good.volume : "—"} л`}</p>
        <div className={styles.button_box}>
          <p
            className={`${styles.price} text text_type_large text_color_primary`}
          >{`${getPrice(good)} ${textGoodsCard.currency}`}</p>
          {isInCart ? (
            <GoodsCount good={good} />
          ) : (
            <Button
              kind="cart"
              text={textGoodsCard.btnText}
              extraClass={styles.button}
              isCell={true}
              onClick={handleBuyGood}
            />
          )}
        </div>
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

  return isRow ? renderRow() : renderCell();
};
