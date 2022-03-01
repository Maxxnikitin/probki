import React from "react";
import styles from "./form-container.module.css";
import closeIcon from "../../../images/icons/popup-close.svg";
import { textPopup } from "../../../texts/ru";

export const FormContainer = ({
  children,
  isCloseBtn = false,
  onClose,
  extraClass = "",
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      {isCloseBtn && (
        <button className={styles.btn} type="button" onClick={onClose}>
          <img
            className={styles.img}
            src={closeIcon}
            alt={textPopup.closeAlt}
          />
        </button>
      )}
      {children}
    </div>
  );
};
