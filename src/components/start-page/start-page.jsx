import React from "react";
import styles from "./start-page.module.css";
import { textStartPage } from "../../texts/ru";
import logo from "../../images/logo.png";
import { Button } from "../ui/button/button";
export const StartPage = ({ extraClass = "" }) => {
  return (
    <section className={`${styles.content} ${extraClass}`}>
      <img
        className={`mb-25 ${styles.logo}`}
        src={logo}
        alt={textStartPage.logoAlt}
      />
      <div className={styles.question_box}>
        <h2
          className={`mb-8 ${styles.title} text text_tyh2e_h2 text_color_white`}
        >
          {textStartPage.title}
        </h2>
        <div className={styles.btn_box}>
          <Button
            kind="form"
            type="button"
            textColor="black"
            text={textStartPage.agree}
            extraClass={`mr-16 ${styles.btn}`}
          />
          <Button
            kind="form"
            type="button"
            textColor="black"
            text={textStartPage.disagree}
            extraClass={styles.btn}
          />
        </div>
      </div>
      <p className={`mt-20 ${styles.alarm} text text_type_large text_color_white`}>{textStartPage.alarm}</p>
    </section>
  );
};
