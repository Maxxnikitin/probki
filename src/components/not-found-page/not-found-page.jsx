import React from "react";
import styles from "./not-found-page.module.css";
import { textNotFoundPage } from "../../texts/ru";
import notFoundIcon from "../../images/404.png";
import { NavButton } from "../ui/nav-button/nav-button";

export const NotFoundPage = ({ extraClass = "" }) => {
  return (
    <main className={`${styles.content} ${extraClass}`}>
      <img
        className={styles.icon}
        src={notFoundIcon}
        alt={textNotFoundPage.iconAlt}
      />
      <p
        className={`${styles.text} text text_type_large text_color_white mt-8 mb-10`}
      >
        {textNotFoundPage.text}
      </p>
      <NavButton
        to="/assortment"
        kind="form"
        type="button"
        text={textNotFoundPage.btnText}
      />
    </main>
  );
};
