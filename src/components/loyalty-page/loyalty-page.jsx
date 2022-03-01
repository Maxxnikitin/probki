import React from "react";
import styles from "./loyalty-page.module.css";
import { textLoyaltyPage } from "../../texts/ru";
import { SignUp } from "../sign-up/sign-up";
import shopImg from "../../images/loyalty.jpg";
import { BreadCrumbs } from "../ui/bread-crumbs/bread-crumbs";
import { UserContext } from "../../utils/context";

export const LoyaltyPage = ({ extraClass = "" }) => {
  const [user] = React.useContext(UserContext);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={`${styles.content} ${extraClass}`}>
      <BreadCrumbs />
      <h2
        className={`${styles.title} text text_type_h2 text_color_primary mt-8`}
      >
        {textLoyaltyPage.title}
      </h2>
      <section className={`${styles.main_content} mb-30`}>
        <div className={`${styles.left_column} mr-20`}>
          <ul
            className={`${styles.text_box} text text_type_medium text_color_white pt-15 mb-35`}
          >
            <li className={styles.text}>{textLoyaltyPage.text1}</li>
            <li className={styles.text}>{textLoyaltyPage.text2}</li>
            <li className={styles.text}>{textLoyaltyPage.text3}</li>
            <li className={styles.text}>{textLoyaltyPage.text4}</li>
          </ul>
          <img
            className={styles.vertical_img}
            src={shopImg}
            alt={textLoyaltyPage.imgAlt}
          />
          {!user.phone && <SignUp extraClass={styles.form} />}
        </div>
        <div className={styles.right_column}>
          <img
            className={styles.img}
            src={shopImg}
            alt={textLoyaltyPage.imgAlt}
          />
        </div>
      </section>
    </main>
  );
};
