import React from "react";
import styles from "./goods-card-page.module.css";
import { textPrtnershipPage } from "../../texts/ru";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import providerImg from "../../images/6.jpg";
import rentImg from "../../images/7.jpg";
import { FeedbackCard } from "../feedback-card/feedback-card";
import { RecomendationCard } from "../recomendation-card/recomendation-card";

export const GoodsCardPage = ({ extraClass = "" }) => {
  return (
    <div className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <FeedbackCard />
        <RecomendationCard />
      </main>
      <Footer />
    </div>
  );
};
