import React from "react";
import styles from "./order-history.module.css";
import doneIcon from "../../../images/icons/done-icon.svg";
import arrowUpIcon from "../../../images/icons/arrow-up.svg";
import arrowDownIcon from "../../../images/icons/arrow-down.svg";
import { textOrder } from "../../../texts/ru";
import { getPrice } from "../../../utils/constants";

export const OrderHistory = ({ orderData, extraClass = "" }) => {
  const [isOpenDetails, setIsOpenDetails] = React.useState(false);

  const arrowIcon = isOpenDetails ? arrowUpIcon : arrowDownIcon;

  const handleOpenDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <div className={styles.main_row}>
        <div className={styles.info_box}>
          <img
            className={`${styles.img} ${styles.done_img}`}
            src={doneIcon}
            alt={textOrder.iconDoneAlt}
          />
          <p className="text text_type_medium text_color_black">{`№ ${orderData.id}`}</p>
          <p className="text text_type_medium text_color_black">{`${
            textOrder.from
          } ${orderData.date && orderData.date.split(" ")[0]}`}</p>
        </div>
        <div className={styles.sub_row}>
          <p className={`text text_type_large text_color_black`}>
            <b>{`${orderData.total_cost.split(".")[0]} ${textOrder.currency}`}</b>
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
