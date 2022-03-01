import React from "react";
import styles from "./main-page.module.css";
import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import { textMainPage } from "../../texts/ru";
import { NavButton } from "../ui/nav-button/nav-button";
import { GoodsCard } from "../goods-card/goods-card";
import collabImg1 from "../../images/collab1.jpg";
import collabImg2 from "../../images/collab2.jpg";
import { PromoCard } from "../promo-card/promo-card";
import { Select } from "../ui/select/select";
import beerImg from "../../images/9.png";
import { getСampaigns, getProducts, getNews } from "../../utils/api";
import { CartContext } from "../../utils/context";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const MainPage = ({
  shops,
  currentShop,
  onChangeShop,
  unitsArr,
  extraClass = "",
}) => {
  const [widthScreen, setWidthScreen] = React.useState(window.screen.width);
  const [campaigns, setCampaigns] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [novaltyGoods, setNovaltyGoods] = React.useState([]);
  const [cart] = React.useContext(CartContext);

  React.useEffect(() => {
    currentShop.id &&
      Promise.all([
        getСampaigns(),
        getProducts(currentShop.id, 0.001, 8, "&ordering=-id"),
        getNews(),
      ])
        .then((res) => {
          setCampaigns(res[0]);
          const novalty = res[1].results;
          setNovaltyGoods(novalty);
          setNews(res[2]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [currentShop.id]);

  window.onresize = (e) => {
    setWidthScreen(e.target.screen.width);
  };

  const weekdaysWork = () => {
    if (currentShop.workday_open_time) {
      return `${currentShop.workday_open_time.split(":")[0]}:${
        currentShop.workday_open_time.split(":")[1]
      }–${currentShop.workday_close_time.split(":")[0]}:${
        currentShop.workday_close_time.split(":")[1]
      }`;
    }
  };

  return (
    <div className={`${styles.page} ${extraClass}`}>
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
          <h2
            className={`${styles.subtitle} text text_type_h2 text_color_secondary mb-6`}
          >
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
        <img
          className={styles.beer_img}
          src={beerImg}
          alt={textMainPage.beerAlt}
        />
        <section className={styles.slider_box}>
          {news.length ? (
            <Swiper
              slidesPerView={widthScreen >= 750 ? 1 : 1.15}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 3000,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              className={styles.swiper}
            >
              {news.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      style={{ backgroundImage: item.image }}
                      className={styles.slide}
                    >
                      <p
                        className={`${styles.slider_text} text text_type_h2 text_color_white`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            ""
          )}
        </section>
        {novaltyGoods.length ? (
          <section className={`${styles.novalty} pt-20 pb-30`}>
            <h2 className="text text_type_h2 text_color_primary mb-5">
              {textMainPage.novaltyTitle}
            </h2>
            <p
              className={`${styles.mob_text} text text_type_large text_color_secondary mb-12`}
            >
              {textMainPage.novaltySubtitle}
            </p>
            <div className={`${styles.novalty_goods_box} mb-30`}>
              {novaltyGoods.map((item) => {
                let isInCart = false;
                cart.forEach((j) => {
                  if (item.id === j.product) {
                    isInCart = true;
                  }
                });
                return (
                  <GoodsCard
                    key={item.id}
                    good={item}
                    isRow={false}
                    unitsArr={unitsArr}
                    link="assortment"
                    isInCart={isInCart}
                  />
                );
              })}
            </div>
            <NavButton
              to="/assortment"
              type="button"
              kind="form"
              text={textMainPage.btnText}
              extraClass={styles.section_btn}
            />
          </section>
        ) : (
          ""
        )}
        <section className={styles.map_box}>
          <h2 className="text text_type_h2 text_color_primary mb-5">
            {textMainPage.ourShopsTitle}
          </h2>
          <p
            className={`${styles.mob_text} text text_type_large text_color_secondary mb-12`}
          >
            {textMainPage.ourShopsSubtitle}
          </p>
          <div className={styles.map_items_box}>
            <div className={styles.map}>
              <iframe
                title="1"
                src={currentShop.map_url}
                width="100%"
                height="100%"
                style={{ borderRadius: "20px", border: "none" }}
              ></iframe>
            </div>
            <div className={styles.map_description}>
              <p className="text text_type_medium text_color_secondary mb-4">
                {textMainPage.choiceShop}
              </p>
              <Select
                shops={shops}
                value={currentShop.id}
                onChange={onChangeShop}
              />
              <div className={`${styles.shops_info} mt-12`}>
                <div className={styles.shops_info_row}>
                  <p className="text text_type_h3 text_color_secondary">
                    {textMainPage.weekdays}
                  </p>
                  <p className="text text_type_large text_color_secondary">
                    {weekdaysWork()}
                  </p>
                </div>
                <div className={styles.shops_info_row}>
                  <p className="text text_type_h3 text_color_secondary">
                    {textMainPage.weekend}
                  </p>
                  <p className="text text_type_large text_color_secondary">
                    {weekdaysWork()}
                  </p>
                </div>
                <a
                  href={`tel:${currentShop.phone}`}
                  className={`${styles.phone} text text_type_large text_color_secondary`}
                >
                  {currentShop.phone ?? ""}
                </a>
              </div>
            </div>
          </div>
        </section>
        {campaigns[0] && campaigns[0].title && (
          <section className={`${styles.promo_box} pt-20 pb-30`}>
            <h2 className="text text_type_h2 text_color_primary mb-5">
              {textMainPage.promoTitle}
            </h2>
            <p
              className={`${styles.mob_text} text text_type_large text_color_secondary mb-12`}
            >
              {textMainPage.promoSubtitle}
            </p>
            <div className={`${styles.promo_items_box} mb-30`}>
              {campaigns.map((item, index) => (
                <PromoCard
                  key={index}
                  title={item.title}
                  text={item.text}
                  img={item.image}
                />
              ))}
            </div>
            <div className={`${styles.mob_promo_items_box} mb-30`}>
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                className={styles.swiper}
              >
                {campaigns.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PromoCard
                      title={item.title}
                      text={item.text}
                      img={item.image}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <NavButton
              to="/assortment"
              type="button"
              kind="form"
              text={textMainPage.btnText}
              extraClass={styles.section_btn}
            />
          </section>
        )}
        <section className={`${styles.collab_box} pt-20 pb-30`}>
          <h2 className="text text_type_h2 text_color_primary mb-5">
            {textMainPage.collabTitle}
          </h2>
          <p
            className={`${styles.mob_text} text text_type_large text_color_secondary mb-12`}
          >
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
          <div className={styles.mob_collab_items_box}>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              className={styles.swiper}
            >
              <SwiperSlide>
                <div className={styles.collab_item}>
                  <h3 className="text text_type_large-semibold text_color_primary mb-4">
                    {textMainPage.collab1Title}
                  </h3>
                  <img
                    className={styles.collab_img}
                    src={collabImg1}
                    alt={textMainPage.collabAlt}
                  />
                  <p
                    className={`${styles.collab_text} text text_type_medium text_color_secondary mt-5`}
                  >
                    {textMainPage.collab1Text}
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.collab_item}>
                  <h3 className="text text_type_large-semibold text_color_primary mb-4">
                    {textMainPage.collab2Title}
                  </h3>
                  <img
                    className={styles.collab_img}
                    src={collabImg2}
                    alt={textMainPage.collabAlt}
                  />
                  <p
                    className={`${styles.collab_text} text text_type_medium text_color_secondary mt-5`}
                  >
                    {textMainPage.collab2Text}
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
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
    </div>
  );
};
