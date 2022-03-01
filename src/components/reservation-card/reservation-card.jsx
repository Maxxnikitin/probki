import React from "react";
import { textReservationCard } from "../../texts/ru";
import { CartGoods } from "../cart-goods/cart-goods";
import { SignUp } from "../sign-up/sign-up";
import { OrderCostCard } from "../order-cost-card/order-cost-card";
import { CartContext } from "../../utils/context";
import { UserContext } from "../../utils/context";
import {
  getCart,
  getProduct,
  getUserData,
  refreshToken,
  setOrder,
} from "../../utils/api";
import { getPrice } from "../../utils/constants";
import { Modal } from "../ui/modal/modal";
import { FormContainer } from "../ui/form-container/form-container";
import styles from "./reservation-card.module.css";

export const ReservationCard = ({ currentShop, unitsArr, extraClass = "" }) => {
  const [step, setStep] = React.useState(1);
  const [cart, setCart] = React.useContext(CartContext);
  const [orderData, setOrderData] = React.useState({});
  const [user, setUser] = React.useContext(UserContext);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [currentOrder, setCurrentOrder] = React.useState({});
  const [isAlarmOpen, setIsAlarmOpen] = React.useState(false);
  const [alarmText, setAlarmText] = React.useState("");

  const onPointsChange = (e) => {
    if (
      e.target.name === "points" &&
      ((/^\d+$/.test(e.target.value) && e.target.value <= user.bonuses) ||
        e.target.value === "")
    ) {
      setOrderData({
        ...orderData,
        [e.target.id]:
          e.target.name === "points" ? e.target.value : e.target.checked,
      });
    }
  };

  const handleCloseModal = () => {
    setIsAlarmOpen(false);
  };

  const setOrderRequest = React.useCallback(
    (newToken) => {
      const shopId = JSON.parse(localStorage.getItem("currentShop")).id || 1;
      setOrder(shopId, newToken).then((res) => {
        if (res && res.detail === "not enough amounts") {
          setAlarmText(textReservationCard.notAmount);
          setIsAlarmOpen(true);
          return;
        }
        if (res && res.detail === "not free table, try later") {
          setAlarmText(textReservationCard.notTables);
          setIsAlarmOpen(true);
          return;
        }
        if (res && res.detail === "empty cart") {
          return;
        }
        if (res && res.status === "ok") {
          setCurrentOrder(res);
          Promise.all([getUserData(), getCart()]).then((res) => {
            if (res[0] && res[0].phone) {
              setUser(res[0]);
              setCart(res[1]);
              setStep(2);
            } else {
              return;
            }
          });
          return;
        } else {
          refreshToken().then((res) => {
            localStorage.setItem("token", res.access);
            setOrderRequest(res.access);
          });
        }
      });
    },
    [setCart, setUser]
  );

  const handleSetOrder = () => {
    setOrderRequest();
  };

  React.useEffect(() => {
    const shopId = JSON.parse(localStorage.getItem("currentShop")).id || 1;
    let price = 0;

    if (!cart.length) {
      setTotalPrice(0);
      return;
    }

    cart.forEach((item) => {
      getProduct(shopId, item.product).then((res) => {
        price += getPrice(res) * item.amount;
        setTotalPrice(price);
      });
    });
  }, [cart]);

  return (
    <section className={`${styles.content} ${extraClass}`}>
      {step === 1 && (
        <>
          <h2
            className={`${styles.title} text text_type_h2 text_color_primary mn-1`}
          >
            {textReservationCard.title1}
          </h2>
          <p
            className={`${styles.text} text text_type_large text_color_white mb-4`}
          >
            {textReservationCard.text}
          </p>
          <p className="text text_type_h3 text_color_white mb-12">
            {currentShop.address}
          </p>
          <div className={styles.main_content}>
            <div className={styles.goods_cards}>
              {cart.length
                ? cart
                    .sort((a, b) => a.id - b.id)
                    .map((item, index) => {
                      return (
                        <CartGoods
                          currentShop={currentShop}
                          unitsArr={unitsArr}
                          key={index}
                          cartGood={item}
                          totalPrice={totalPrice}
                        />
                      );
                    })
                : ""}
            </div>
            <div className={styles.forms}>
              {!user.phone && (
                <p
                  className={`${styles.reg_text} text text_type_medium text_color_white`}
                >
                  {`${textReservationCard.reg} `}
                  <a
                    className={`${styles.reg_link} text text_type_medium text_color_white`}
                    href="/pa"
                  >
                    <b>{textReservationCard.regLink}</b>
                  </a>
                </p>
              )}
              <OrderCostCard
                isLogin={user.phone ?? false}
                isDisabled={!cart.length}
                orderData={orderData}
                onPointsChange={onPointsChange}
                totalPrice={totalPrice}
                handleSetOrder={handleSetOrder}
              />
              {!user.phone && <SignUp extraClass={styles.signup} />}
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h2
            className={`${styles.title2} text text_type_h2 text_color_primary mb-1`}
          >
            {textReservationCard.title2}
          </h2>
          <p
            className={`${styles.text} text text_type_large text_color_white mb-8`}
          >
            {textReservationCard.text_1}
          </p>
          <p
            className={`${styles.text} text text_type_large text_color_white mb-4`}
          >
            {textReservationCard.text}
          </p>
          <p className="text text_type_h3 text_color_white mb-12">
            {currentShop.address}
          </p>
          <p
            className={`${styles.big_text} text text_type_h2 text_color_white`}
          >
            {`${textReservationCard.orderNumber}: `}
            <b>{currentOrder.tableNum}</b>
          </p>
          <p
            className={`${styles.big_text} text text_type_h2 text_color_white`}
          >
            {`${textReservationCard.cost}: `}
            <b>
              {
                user.tables.find(
                  (item) => item.table_id === currentOrder.tableId
                ).total_cost
              }
            </b>
            {` ${textReservationCard.currency}`}
          </p>
        </>
      )}
      {isAlarmOpen && (
        <Modal extraClass={styles.modal} onClose={handleCloseModal}>
          <FormContainer
            extraClass={styles.alarm_box}
            isCloseBtn={true}
            onClose={handleCloseModal}
          >
            <p className="text text_type_medium text_color_black">
              {alarmText}
            </p>
          </FormContainer>
        </Modal>
      )}
    </section>
  );
};
