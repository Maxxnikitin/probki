import React from "react";
import styles from "./start-page.module.css";
import { textStartPage } from "../../texts/ru";
import logo from "../../images/logo.png";
import { Button } from "../ui/button/button";
import { NavButton } from "../ui/nav-button/nav-button";

export const StartPage = ({ extraClass = "" }) => {
  const [isShowAlarm, setIsShowAlarm] = React.useState(false)

  const handleShowAlarm = () => {
    !isShowAlarm && setIsShowAlarm(true);
  }

  return (
    <main className={`${styles.content} ${extraClass}`}>
      <img
        className={`${styles.logo} mb-25`}
        src={logo}
        alt={textStartPage.logoAlt}
      />
      <div className={styles.question_box}>
        <h2
          className={`${styles.title} text text_type_h2 text_color_white mb-8`}
        >
          {textStartPage.title}
        </h2>
        <div className={styles.btn_box}>
          <NavButton
            to="/main"
            kind="form"
            type="button"
            textColor="black"
            text={textStartPage.agree}
            extraClass={`${styles.btn} mr-16`}
          />
          <Button
            kind="form"
            type="button"
            textColor="black"
            text={textStartPage.disagree}
            extraClass={styles.btn}
            onClick={handleShowAlarm}
          />
        </div>
      </div>
      {isShowAlarm && <p
        className={`mt-20 ${styles.alarm} text text_type_large text_color_white`}
      >
        {textStartPage.alarm}
      </p>}
    </main>
  );
};
