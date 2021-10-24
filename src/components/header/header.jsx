import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import { textHeader } from "../../texts/ru";
import logo from "../../images/logo.png";
import locationIcon from "../../images/icons/location.svg";
import paIcon from "../../images/icons/pa.svg";
import cartIcon from "../../images/icons/cart.svg";
import { Input } from "../ui/input/input";

export const Header = ({ extraClass = "" }) => {
  return (
    <header className={`${styles.footer} ${extraClass}`}>
      <div className={styles.first_row}>
        <div className={styles.content}>
          <p
            className={`${styles.tel} text text_type_medium text_color_primary`}
          >
            {textHeader.tel}
          </p>
          <div className={styles.search_box}>
            <Input
              kind="search"
              type="text"
              placeholder={textHeader.placeholder}
            />
            <div className={`${styles.location} ml-8`}>
              <img
                className={`${styles.img} mr-7`}
                src={locationIcon}
                alt={textHeader.locationAlt}
              />
              <p
                className={`${styles.city} text text_type_medium text_color_primary`}
              >
                {textHeader.zhukovskiy}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.second_row}>
        <div className={styles.content}>
          <img className={styles.logo} src={logo} alt={textHeader.logoAlt} />
          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={`mr-12 ${styles.link} text text_type_large text_color_primary`}
            >
              {textHeader.main}
            </NavLink>
            <NavLink
              to="/catalog"
              className={`mr-12 ${styles.link} text text_type_large text_color_primary`}
            >
              {textHeader.catalog}
            </NavLink>
            <NavLink
              to="/loyalty"
              className={`mr-12 ${styles.link} text text_type_large text_color_primary`}
            >
              {textHeader.loyalty}
            </NavLink>
            <NavLink
              to="/pa"
              className={`mr-12 ${styles.link} text text_type_large text_color_primary`}
            >
              <img src={paIcon} alt={textHeader.iconAlt} />
            </NavLink>
            <NavLink
              to="/cart"
              className={`${styles.link} text text_type_large text_color_primary`}
            >
              <img src={cartIcon} alt={textHeader.iconAlt} />
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
