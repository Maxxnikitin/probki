import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";
import { textFooter } from "../../texts/ru";
import logo from "../../images/logo.svg";
import ytubeIcon from "../../images/icons/ytube.svg";
import vkIcon from "../../images/icons/vk.svg";
import instaIcon from "../../images/icons/insta.svg";

export const Footer = ({ extraClass = "" }) => {
  return (
    <footer className={`${styles.footer} ${extraClass}`}>
      <div className={styles.content}>
        <div className={styles.first_row}>
          <img className={styles.logo} src={logo} alt={textFooter.logoAlt} />
          <nav className={styles.nav}>
            <NavLink
              exact
              to="/main"
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
            &copy; {textFooter.copyright}
          </p>
          <ul className={styles.socials}>
            <li className={`${styles.social} mr-6`}>
              <a
                className={styles.link}
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/channel/UCmt8ThgrBpJ57BITzgG61Tw/featured"
              >
                <img
                  className={styles.img}
                  src={ytubeIcon}
                  alt={textFooter.socialsAlt}
                />
              </a>
            </li>
            <li className={`${styles.social} mr-6`}>
              <a
                className={styles.link}
                target="_blank"
                rel="noreferrer"
                href="https://vk.com/probki_beer"
              >
                <img
                  className={styles.img}
                  src={vkIcon}
                  alt={textFooter.socialsAlt}
                />
              </a>
            </li>
            <li className={styles.social}>
              <a
                className={styles.link}
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/probki_beer/"
              >
                <img
                  className={styles.img}
                  src={instaIcon}
                  alt={textFooter.socialsAlt}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
