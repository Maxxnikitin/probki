import React from "react";
import styles from "./cart-page.module.css";
import { textCartPage } from "../../texts/ru";
import { ReservationCard } from "../reservation-card/reservation-card";
// import { RecomendationCard } from '../recomendation-card/recomendation-card';
import { BreadCrumbs } from "../ui/bread-crumbs/bread-crumbs";
import { CartContext } from "../../utils/context";

export const CartPage = ({ currentShop, unitsArr, extraClass = "" }) => {
  const [cart] = React.useContext(CartContext);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={`${styles.content} ${extraClass}`}>
      {cart.length ? (
        <div className={styles.law_box}>
          <p
            className={`${styles.law_text} text text_type_small text_color_black`}
          >
            {textCartPage.law}
          </p>
        </div>
      ) : (
        ""
      )}
      <BreadCrumbs />
      <ReservationCard currentShop={currentShop} unitsArr={unitsArr} />
      {/* <RecomendationCard /> */}
    </main>
  );
};
