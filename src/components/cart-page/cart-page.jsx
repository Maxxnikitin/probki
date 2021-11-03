import React from "react";
import styles from "./cart-page.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ReservationCard } from "../reservation-card/reservation-card";
import { RecomendationCard } from "../recomendation-card/recomendation-card";

export const CartPage = ({ extraClass = "" }) => {
  return (
    <div className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <ReservationCard order={12345} cost={237} />
        <RecomendationCard />
      </main>
      <Footer />
    </div>
  );
};
