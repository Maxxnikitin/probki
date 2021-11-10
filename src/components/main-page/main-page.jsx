import React from "react";
import styles from "./main-page.module.css";
import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { textMainPage, textShopsData } from "../../texts/ru";
import { Button } from "../ui/button/button";
import { NavButton } from "../ui/nav-button/nav-button";
import { GoodsCard } from "../goods-card/goods-card";
import goodsImg from "../../images/1.jpg";
import promoImg from "../../images/11.jpg";
import collabImg1 from "../../images/collab1.jpg";
import collabImg2 from "../../images/collab2.jpg";
import { PromoCard } from "../promo-card/promo-card";
import { Select } from "../ui/select/select";
import { yandexMaps } from "../../utils/constants";

SwiperCore.use([Navigation, Pagination]);

export const MainPage = ({ extraClass = "" }) => {
  const novaltyGoods = [
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
    {
      name: "Пиво Найтберг Pivzdrav Жигулёвское",
      cost: "1245",
      volume: "3",
      img: goodsImg,
      rating: 5,
    },
  ];

  const promoGoods = [
    {
      title: textMainPage.promo1Title,
      text: textMainPage.promo1Text,
      img: promoImg,
    },
    {
      title: textMainPage.promo2Title,
      text: textMainPage.promo2Text,
      img: promoImg,
    },
    {
      title: textMainPage.promo3Title,
      text: textMainPage.promo3Text,
      img: promoImg,
    },
  ];

  return (
    <div className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <h1
          className={`${styles.title} text text_type_h1 text_color_primary mt-40 mb-12`}
        >
          {textMainPage.title}
        </h1>
        <NavButton
          to="/assortment"
          type="button"
          kind="cart"
          text={textMainPage.btnText}
          extraClass={styles.main_btn}
        />
        <div className={`${styles.mission_box} mt-40`}>
          <h2 className="text text_type_h2 text_color_secondary mb-6">
            {textMainPage.missionTitle}
          </h2>
          <p
            className={`${styles.mission_text} text text_type_large text_color_secondary`}
          >
            {textMainPage.missionText}
          </p>
          <div className={`${styles.clarification_box} mb-40`}>
            <div className={styles.clarificationEl}>
              <p className="text text_type_points_number text_color_secondary">
                {textMainPage.clarification1}
              </p>
              <p
                className={`${styles.clarification_text} text text_type_medium text_color_secondary`}
              >
                {textMainPage.clarification1Text}
              </p>
            </div>
            <div className={styles.clarificationEl}>
              <p className="text text_type_points_number text_color_secondary">
                {textMainPage.clarification2}
              </p>
              <p
                className={`${styles.clarification_text} text text_type_medium text_color_secondary`}
              >
                {textMainPage.clarification2Text}
              </p>
            </div>
            <div className={styles.clarificationEl}>
              <p className="text text_type_points_number text_color_secondary">
                {textMainPage.clarification3}
              </p>
              <p
                className={`${styles.clarification_text} text text_type_medium text_color_secondary`}
              >
                {textMainPage.clarification3Text}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.beer_bgi} />
        <section className={styles.slider_box}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className={styles.slide}>
                <p
                  className={`${styles.slider_text} text text_type_h2 text_color_white`}
                >
                  {textMainPage.slide1}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p
                  className={`${styles.slider_text} text text_type_h2 text_color_white`}
                >
                  {textMainPage.slide1}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p
                  className={`${styles.slider_text} text text_type_h2 text_color_white`}
                >
                  {textMainPage.slide1}
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.slide}>
                <p
                  className={`${styles.slider_text} text text_type_h2 text_color_white`}
                >
                  {textMainPage.slide1}
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
        <section className={`${styles.novalty} pt-20 pb-30`}>
          <h2 className="text text_type_h2 text_color_primary mb-5">
            {textMainPage.novaltyTitle}
          </h2>
          <p className="text text_type_large text_color_secondary mb-12">
            {textMainPage.novaltySubtitle}
          </p>
          <div className={`${styles.novalty_goods_box} mb-30`}>
            {novaltyGoods.map((item, index) => (
              <GoodsCard
                key={index}
                name={item.name}
                cost={item.cost}
                volume={item.volume}
                img={item.img}
                isRow={false}
                rating={item.rating}
              />
            ))}
          </div>
          <NavButton
            to="/assortment"
            type="button"
            kind="form"
            text={textMainPage.btnText}
            extraClass={styles.section_btn}
          />
        </section>
        <section className={styles.map_box}>
          <h2 className="text text_type_h2 text_color_primary mb-5">
            {textMainPage.ourShopsTitle}
          </h2>
          <p className="text text_type_large text_color_secondary mb-12">
            {textMainPage.ourShopsSubtitle}
          </p>
          <div className={styles.map_items_box}>
            <div className={styles.map}>
              <iframe
                title="1"
                src={yandexMaps.krasnoarmeiskaya}
                width="560"
                height="397"
                style={{ borderRadius: "20px", border: "none" }}
              ></iframe>
            </div>
            <div className={styles.map_description}>
              <p className="text text_type_medium text_color_secondary mb-4">
                {textMainPage.choiceShop}
              </p>
              <Select />
              <div className={`${styles.shops_info} mt-12`}>
                <div className={styles.shops_info_row}>
                  <p className="text text_type_h3 text_color_secondary">
                    {textMainPage.weekdays}
                  </p>
                  <p className="text text_type_large text_color_secondary">
                    {textShopsData.krasnoarmeiskaya.weekdays}
                  </p>
                </div>
                <div className={styles.shops_info_row}>
                  <p className="text text_type_h3 text_color_secondary">
                    {textMainPage.weekend}
                  </p>
                  <p className="text text_type_large text_color_secondary">
                    {textShopsData.krasnoarmeiskaya.weekend}
                  </p>
                </div>
                <p className="text text_type_large text_color_secondary">
                  {textShopsData.krasnoarmeiskaya.phone}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.promo_box} pt-20 pb-30`}>
          <h2 className="text text_type_h2 text_color_primary mb-5">
            {textMainPage.promoTitle}
          </h2>
          <p className="text text_type_large text_color_secondary mb-12">
            {textMainPage.promoSubtitle}
          </p>
          <div className={`${styles.promo_items_box} mb-30`}>
            {promoGoods.map((item, index) => (
              <PromoCard
                key={index}
                title={item.title}
                text={item.text}
                img={item.img}
              />
            ))}
          </div>
          <NavButton
            to="/assortment"
            type="button"
            kind="form"
            text={textMainPage.btnText}
            extraClass={styles.section_btn}
          />
        </section>
        <section className={`${styles.collab_box} pt-20 pb-30`}>
          <h2 className="text text_type_h2 text_color_primary mb-5">
            {textMainPage.collabTitle}
          </h2>
          <p className="text text_type_large text_color_secondary mb-12">
            {textMainPage.collabSubtitle}
          </p>
          <div className={styles.collab_items_box}>
            <div className={styles.collab_item}>
              <h3 className="text text_type_large-semibold text_color_primary">
                {textMainPage.collab1Title}
              </h3>
              <p
                className={`${styles.collab_text} text text_type_medium text_color_secondary mt-1 mb-12`}
              >
                {textMainPage.collab1Text}
              </p>
              <img
                className={styles.collab_img}
                src={collabImg1}
                alt={textMainPage.collabAlt}
              />
            </div>
            <div className={styles.collab_item}>
              <h3 className="text text_type_large-semibold text_color_primary">
                {textMainPage.collab2Title}
              </h3>
              <p
                className={`${styles.collab_text} text text_type_medium text_color_secondary mt-1 mb-12`}
              >
                {textMainPage.collab2Text}
              </p>
              <img
                className={styles.collab_img}
                src={collabImg2}
                alt={textMainPage.collabAlt}
              />
            </div>
          </div>
          <NavButton
            to="/partners"
            type="button"
            kind="form"
            text={textMainPage.collabBtnText}
            extraClass={styles.section_btn}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};
