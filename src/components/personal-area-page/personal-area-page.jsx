import React from "react";
import styles from "./personal-area-page.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { RecomendationCard } from "../recomendation-card/recomendation-card";
import { textPAPage } from "../../texts/ru";
import { FormContainer } from "../ui/form-container/form-container";
import { Order } from "../ui/order/order";
import editIcon from "../../images/icons/edit.svg";
import { Button } from "../ui/button/button";
import logo from "../../images/logo.png";

export const PersonalAreaPage = ({ extraClass = "" }) => {
  const userName = "Иван";
  const userPhone = "8 (123) 456–78–90";
  const userEmail = "ivanivanov@gmail.com";

  const orderData = {
    number: "12345",
    date: "10.07.2021",
    TotalCost: "2 540",
    name: "Пиво Жигулёвское фирменное (Томск) Свет. Фильтр.",
    amount: "3",
    cost: "79",
    cardNumber: "0123 4567 8901 2345",
    points: 600,
  };

  return (
    <div className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <h2
          className={`${styles.title} text text_type_h2 text_color_primary mt-8 mb-12`}
        >
          {textPAPage.title}
        </h2>
        <FormContainer extraClass={styles.greeting}>
          <p className="text text_type_medium text_color_black">
            {`${textPAPage.greeting1}, `}
            <b>{userName}</b>
            {`, ${textPAPage.greeting2}`}
          </p>
        </FormContainer>
        <section className={`${styles.main_content} mb-20`}>
          <FormContainer extraClass={styles.history}>
            <div className={`${styles.history_title_box} mb-20`}>
              <h3 className="text text_type_h3 text_color_black">
                {textPAPage.historyTitle}
              </h3>
              <Button
                type="button"
                kind="form"
                text={textPAPage.btnText}
                extraClass={styles.history_btn}
              />
            </div>
            <Order
              orderData={orderData}
              isActiveOrder={false}
              extraClass="mb-8"
            />
            <Order
              orderData={orderData}
              isActiveOrder={false}
              extraClass="mb-8"
            />
            <Order
              orderData={orderData}
              isActiveOrder={false}
              extraClass="mb-8"
            />
            <Order
              orderData={orderData}
              isActiveOrder={false}
              extraClass="mb-8"
            />
          </FormContainer>
          <div className={styles.right_column}>
            <FormContainer extraClass={styles.active_order}>
              <div className={`${styles.data_title_box} mb-12`}>
                <h3 className="text text_type_h3 text_color_black">
                  {textPAPage.activeOrderTitle}
                </h3>
                <p className="text text_type_medium text_color_black">
                  {textPAPage.activeOrderDeadline}
                </p>
              </div>
              <Order
                orderData={orderData}
                isActiveOrder={true}
                extraClass={styles.ao_order}
              />
            </FormContainer>
            <FormContainer extraClass={styles.user_data}>
              <div className={`${styles.data_title_box} mb-4`}>
                <h3 className="text text_type_h3 text_color_black">
                  {textPAPage.dataTitle}
                </h3>
                <button type="button" className={styles.edit_btn}>
                  <img
                    className={styles.edit_img}
                    src={editIcon}
                    alt={textPAPage.editAlt}
                  />
                </button>
              </div>
              <p className="text text_type_medium-bold text_color_black">
                {userName}
              </p>
              <div className={styles.data_connection_box}>
                <p className="text text_type_medium text_color_black">
                  {`${textPAPage.dataPhone}: `}
                  {
                    <span
                      className={`${styles.email_font} text text_type_medium-bold text_color_black`}
                    >
                      {userPhone}
                    </span>
                  }
                </p>
                <p className="text text_type_medium text_color_black">
                  {`${textPAPage.dataEmail}: `}
                  {
                    <span
                      className={`${styles.email_font} text text_type_medium-bold text_color_black`}
                    >
                      {userEmail}
                    </span>
                  }
                </p>
              </div>
            </FormContainer>
          </div>
        </section>
        <section className={styles.loyalty_card_box}>
          <div className={styles.lcb_left_column}>
            <h3 className="text text_type_h3 text_color_white mb-8">
              {textPAPage.loyaltyCardTitle1}
            </h3>
            {orderData.cardNumber ? (
              <div className={styles.lcb_card}>
                <img
                  className={styles.lcb_logo}
                  src={logo}
                  alt={textPAPage.logoAlt}
                />
                <p className="text text_type_h3 text_color_white mt-8">
                  {orderData.cardNumber}
                </p>
              </div>
            ) : (
              <>
                <p className="text text_type_medium text_color_white mb-12">
                  {textPAPage.addingCard}
                </p>
                <Button
                  type="button"
                  kind="form"
                  text={textPAPage.addingCardText}
                />
              </>
            )}
          </div>
          <div className={styles.lcb_right_column}>
            <h3 className="text text_type_h3 text_color_white mb-8">
              {textPAPage.loyaltyCardTitle1}
            </h3>
            <p className="text text_type_points_number text_color_primary">
              {orderData.points}
            </p>
            <p className="text text_type_medium text_color_white">
              {textPAPage.pointsText}
            </p>
          </div>
        </section>
        <RecomendationCard />
      </main>
      <Footer />
    </div>
  );
};
