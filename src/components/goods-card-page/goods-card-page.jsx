import React from "react";
import styles from "./goods-card-page.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import img from "../../images/2.jpg";
import { FeedbackCard } from "../feedback-card/feedback-card";
import { RecomendationCard } from "../recomendation-card/recomendation-card";
import { GoodsDetailsCard } from "../goods-details-card/goods-details-card";

export const GoodsCardPage = ({ extraClass = "" }) => {
  const goodsInfo = {
    producer: "ОАО «Томское пиво»",
    brand: "Томское пиво",
    ibu: "21–26",
    style: "Lager",
    color: "Светлое",
    density: "10%",
    strength: "4%",
    taste: "Ароматное, хмелистое, с горчинкой",
    volume: "0,5 л",
  };

  const description =
    "Любой пивовар считает своим долгом создать уникальный сорт пива, который был бы связан с его именем и стал отражением его эпохи. Так и советские мастера пивоваренного завода, который сегодня мы знаем как предприятие ОАО «Томское пиво», работали над фирменными сортами. В результате были разработаны рецептуры, в основу которых легли эксклюзивные сорта хмеля и сочетание разных видов солода. Сегодня по этим авторским разработкам продолжают готовить фирменные сорта: «Ячменное», «Жигулёвское» и «Томское», отдавая дань мастерству советских пивоваров.";

  return (
    <div className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <GoodsDetailsCard
          img={img}
          title="Пиво Жигулёвское фирменное (Томск) Свет. Фильтр."
          stock={17}
          info={goodsInfo}
          cost={79}
          rating={5}
          description={description}
        />
        <FeedbackCard />
        <RecomendationCard />
      </main>
      <Footer />
    </div>
  );
};
