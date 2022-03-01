import React from "react";
import styles from "./order.module.css";
import crossIcon from "../../../images/icons/cross.svg";
import arrowUpIcon from "../../../images/icons/arrow-up.svg";
import arrowDownIcon from "../../../images/icons/arrow-down.svg";
import { textOrder } from "../../../texts/ru";
import { cancelOrder, getUserData, refreshToken } from "../../../utils/api";
import { UserContext } from "../../../utils/context";

export const Order = ({ orderData, extraClass = "" }) => {
  const [isOpenDetails, setIsOpenDetails] = React.useState(false);
  const [user, setUser] = React.useContext(UserContext);

  const arrowIcon = isOpenDetails ? arrowUpIcon : arrowDownIcon;
  const date = new Date();

  const handleOpenDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };

  const handleCancelOrder = () => {
    orderData &&
      cancelOrder(orderData.table_id).then((res) => {
        if (res && res.status) {
          getUserData().then((res) => {
            setUser(res);
          });
        } else {
          refreshToken().then((res) => {
            localStorage.setItem("token", res.access);
            cancelOrder(orderData.table_id, res.access).then((res) => {
              if (res && res.status) {
                getUserData().then((res) => {
                  setUser(res);
                });
              }
            });
          });
        }
      });
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <div className={styles.main_row}>
        <div className={styles.info_box}>
          <button
            className={`${styles.btn} ${styles.btn_cross}`}
            type="button"
            onClick={handleCancelOrder}
          >
            <img
              className={styles.img}
              src={crossIcon}
              alt={textOrder.iconActiveAlt}
            />
          </button>
          <p className="text text_type_medium text_color_black">{`№ ${orderData.table_id}`}</p>
          <p className="text text_type_medium text_color_black">{`${
            textOrder.from
          } ${`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}`}</p>
        </div>
        <div className={styles.sub_row}>
          <p className={`text text_type_medium text_color_black`}>
            <b>{`${orderData.total_cost} ${textOrder.currency}`}</b>
          </p>
          <button
            className={styles.btn}
            type="button"
            onClick={handleOpenDetails}
          >
            <img
              className={styles.img}
              src={arrowIcon}
              alt={textOrder.iconArrowAlt}
            />
          </button>
        </div>
      </div>
      {isOpenDetails &&
        orderData.content.map((item, index) => {
          return (
            <div className={styles.details_box} key={index}>
              <p
                className={`${styles.goods_name} text text_type_order text_color_black`}
              >
                {item.name}
              </p>
              <div className={styles.amount_box}>
                <p className="text text_type_order text_color_black">
                  <b>{`${item.amount} ${textOrder.amountUnit}`}</b>
                </p>
                <p className="text text_type_order text_color_black">
                  <b>{`${item.cost} ${textOrder.currency}`}</b>
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
