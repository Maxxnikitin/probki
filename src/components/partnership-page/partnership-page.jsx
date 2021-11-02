import React from "react";
import styles from "./partnership-page.module.css";
import { textPrtnershipPage } from "../../texts/ru";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import providerImg from "../../images/6.jpg";
import rentImg from "../../images/7.jpg";
import { FeedbackCard } from "../feedback-card/feedback-card";

export const PartnershipPage = ({ extraClass = "" }) => {
  return (
    <div className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <div
          className={`${styles.info_box} text text_type_medium text_color_white`}
        >
          <h2
            className={`${styles.title} text_type_h2 text_color_primary`}
          >
            {textPrtnershipPage.title1}
          </h2>
          <p className={`${styles.text} mt-5 mb-12`}>
            {textPrtnershipPage.text1_1}
          </p>
          <p className={styles.text}>{textPrtnershipPage.text1_2}</p>
          <ul className={`${styles.text_box} mt-12 mb-12`}>
            <li className={styles.text}>{textPrtnershipPage.text1_3}</li>
            <li className={styles.text}>{textPrtnershipPage.text1_4}</li>
            <li className={styles.text}>{textPrtnershipPage.text1_5}</li>
            <li className={styles.text}>{textPrtnershipPage.text1_6}</li>
            <li className={styles.text}>{textPrtnershipPage.text1_7}</li>
            <li className={styles.text}>{textPrtnershipPage.text1_8}</li>
          </ul>
          <p className={styles.text}>{textPrtnershipPage.text1_9}</p>
        </div>
        <img
          className={styles.img}
          src={providerImg}
          alt={textPrtnershipPage.imgAlt}
        />
        <div className={`${styles.info_box} text text_type_medium text_color_white`}>
          <h2
            className={`${styles.title} text_type_h2 text_color_primary`}
          >
            {textPrtnershipPage.title2}
          </h2>
          <p className={`${styles.text} mt-5 mb-12`}>
            {textPrtnershipPage.text2_1}
          </p>
          <p className={styles.text}>{textPrtnershipPage.text2_2}</p>
          <ul className={`${styles.text_box} mt-12 mb-12`}>
            <li className={styles.text}>{textPrtnershipPage.text2_3}</li>
            <li className={styles.text}>{textPrtnershipPage.text2_4}</li>
            <li className={styles.text}>{textPrtnershipPage.text2_5}</li>
            <li className={styles.text}>{textPrtnershipPage.text2_6}</li>
          </ul>
          <p className={styles.text}>{textPrtnershipPage.text2_7}</p>
        </div>
        <img
          className={styles.img}
          src={rentImg}
          alt={textPrtnershipPage.imgAlt}
        />
      </main>
      <FeedbackCard />
      <Footer />
    </div>
  );
};
