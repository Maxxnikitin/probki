import React from "react";
import styles from "./history-modal.module.css";
import { FormContainer } from "../ui/form-container/form-container";
import { textPAPage } from "../../texts/ru";
import { OrderHistory } from "../ui/order-history/order-history";

export const HistoryModal = ({
  isCloseBtn = false,
  onClose,
  data,
  extraClass = "",
}) => {
  return (
    <FormContainer
      isCloseBtn={isCloseBtn}
      onClose={onClose}
      extraClass={extraClass}
    >
      <section className={`${styles.content} ${extraClass}`}>
        <p className="text text_type_h2 text_color_primary pr-15">
          {textPAPage.historyTitle}
        </p>
        <div className={styles.data_box}>
          {data.map((item, index) => {
            return (
              <OrderHistory
                key={index}
                orderData={item}
                isActiveOrder={false}
              />
            );
          })}
        </div>
      </section>
    </FormContainer>
  );
};
