import React from "react";
import styles from "./loyalty-page.module.css";
import { textLoyaltyPage } from "../../texts/ru";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { SignUp } from "../sign-up/sign-up";
import shopImg from "../../images/loyalty.jpg";

export const LoyaltyPage = ({ extraClass = "" }) => {
  return (
    <section className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <h2 className={`${styles.title} text text_type_h2 text_color_primary mt-16`}>
          {textLoyaltyPage.title}
        </h2>
        <div className={`${styles.main_content} mb-30`}>
          <div className={`${styles.left_column} mr-20`}>
            <ul
              className={`${styles.text_box} text text_type_medium text_color_white pt-15 mb-35`}
            >
              <li className={styles.text}>{textLoyaltyPage.text1}</li>
              <li className={styles.text}>{textLoyaltyPage.text2}</li>
              <li className={styles.text}>{textLoyaltyPage.text3}</li>
              <li className={styles.text}>{textLoyaltyPage.text4}</li>
            </ul>
            <SignUp />
          </div>
          <div className={styles.right_column}>
            <img
              className={styles.img}
              src={shopImg}
              alt={textLoyaltyPage.imgAlt}
            />
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};
