import React from "react";
import styles from "./order.module.css";
import crossIcon from "../../../images/icons/cross.svg";
import doneIcon from "../../../images/icons/done-icon.svg";
import arrowUpIcon from "../../../images/icons/arrow-up.svg";
import arrowDownIcon from "../../../images/icons/arrow-down.svg";
import { textOrder } from "../../../texts/ru";

export const Order = ({
  orderData,
  isActiveOrder = false,
  extraClass = "",
}) => {
  const [isOpenDetails, setIsOpenDetails] = React.useState(false);

  const icon = isActiveOrder ? crossIcon : doneIcon;
  const iconAlt = isActiveOrder
    ? textOrder.iconActiveAlt
    : textOrder.iconDoneAlt;
  const arrowIcon = isOpenDetails ? arrowUpIcon : arrowDownIcon;
  const totalCostFont = isActiveOrder
    ? "text_type_medium-bold"
    : "text_type_large";

  const handleOpenDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <div className={styles.main_row}>
        <div className={styles.info_box}>
          {isActiveOrder ? (
            <button
              className={`${styles.btn} ${styles.btn_cross}`}
              type="button"
            >
              <img className={styles.img} src={icon} alt={iconAlt} />
            </button>
          ) : (
            <img
              className={`${styles.img} ${styles.done_img}`}
              src={icon}
              alt={iconAlt}
            />
          )}
          <p className="text text_type_medium text_color_black">{`№ ${orderData.number}`}</p>
          <p className="text text_type_medium text_color_black">{`${textOrder.from} ${orderData.date}`}</p>
        </div>
        <p className={`text ${totalCostFont} text_color_black`}>
          <b>{`${orderData.TotalCost} ${textOrder.currency}`}</b>
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
      {isOpenDetails && (
        <div className={styles.details_box}>
          <p
            className={`${styles.goods_name} text text_type_order text_color_black`}
          >
            {orderData.name}
          </p>
          <div className={styles.amount_box}>
            <p className="text text_type_order text_color_black">
              <b>{`${orderData.amount} ${textOrder.amountUnit}`}</b>
            </p>
            <p className="text text_type_order text_color_black">
              <b>{`${orderData.cost}${textOrder.currency}`}</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
