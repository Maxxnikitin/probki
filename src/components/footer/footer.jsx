import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";
import { textFooter } from "../../texts/ru";
import logo from "../../images/logo.png";
import ytubeIcon from "../../images/icons/ytube.svg";
import vkIcon from "../../images/icons/vk.svg";
import instaIcon from "../../images/icons/insta.svg";

export const Footer = ({ extraClass = "" }) => {
  return (
    <footer className={`${styles.footer} ${extraClass}`}>
      <div className={styles.content}>
        <div className={styles.first_row}>
          <img className={styles.logo} src={logo} alt={textFooter.imgAlt} />
          <nav className={styles.nav}>
            <NavLink
              exact
              to="/"
              className={`${styles.link} text text_type_medium text_color_primary`}
            >
              {textFooter.main}
            </NavLink>
            <NavLink
              to="/loyalty"
              className={`${styles.link} text text_type_medium text_color_primary`}
            >
              {textFooter.loyalty}
            </NavLink>
            <NavLink
              to="/assortment"
              className={`${styles.link} text text_type_medium text_color_primary`}
            >
              {textFooter.assortment}
            </NavLink>
            <NavLink
              to="/partners"
              className={`${styles.link} text text_type_medium text_color_primary`}
            >
              {textFooter.partners}
            </NavLink>
          </nav>
        </div>
        <div className={styles.second_row}>
          <p
            className={`${styles.copyright} text text_type_medium text_color_primary`}
          >
            &copy; probkishop.ru
          </p>
          <ul className={styles.socials}>
            <li className={`${styles.social} mr-6`}>
              <a className={styles.link} href="yandex.ru">
                <img src={ytubeIcon} alt={textFooter.socialsAlt} />
              </a>
            </li>
            <li className={`${styles.social} mr-6`}>
              <a className={styles.link} href="yandex.ru">
                <img src={vkIcon} alt={textFooter.socialsAlt} />
              </a>
            </li>
            <li className={styles.social}>
              <a className={styles.link} href="yandex.ru">
                <img src={instaIcon} alt={textFooter.socialsAlt} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
