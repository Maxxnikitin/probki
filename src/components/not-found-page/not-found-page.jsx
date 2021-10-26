import React from "react";
import styles from "./not-found-page.module.css";
import { textNotFoundPage } from "../../texts/ru";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import notFoundIcon from "../../images/404.png";
import { Button } from "../ui/button/button";

export const NotFoundPage = ({ extraClass = "" }) => {
  return (
    <section className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
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
        <Button kind="form" type="button" text={textNotFoundPage.btnText} />
      </main>
      <Footer />
    </section>
  );
};
