import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./start-page.module.css";
import { textStartPage } from "../../texts/ru";
import logo from "../../images/logo.svg";
import { Button } from "../ui/button/button";

export const StartPage = ({ extraClass = "" }) => {
  const history = useHistory();

  const [isShowAlarm, setIsShowAlarm] = React.useState(false);

  const handleShowAlarm = () => {
    !isShowAlarm && setIsShowAlarm(true);
  };

  const handleAgeConfirm = () => {
    localStorage.setItem("adult", true);
    history.replace({ pathname: "/main" });
  };

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
          <Button
            kind="form"
            type="button"
            text={textStartPage.agree}
            extraClass={`${styles.btn} mr-16`}
            onClick={handleAgeConfirm}
          />
          <Button
            kind="form"
            type="button"
            text={textStartPage.disagree}
            extraClass={styles.btn}
            onClick={handleShowAlarm}
          />
        </div>
      </div>
      {isShowAlarm && (
        <p
          className={`mt-20 ${styles.alarm} text text_type_large text_color_white`}
        >
          {textStartPage.alarm}
        </p>
      )}
    </main>
  );
};
