import React from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../ui/modal/modal";
import styles from "./header.module.css";
import { textHeader } from "../../texts/ru";
import logo from "../../images/logo.svg";
import locationIcon from "../../images/icons/location.svg";
import paIconInactive from "../../images/icons/pa.svg";
import paIconActive from "../../images/icons/pa-active.svg";
import cartIconInactive from "../../images/icons/cart.svg";
import cartIconActive from "../../images/icons/cart-active.svg";
import burgerIcon from "../../images/icons/burger.svg";
import { CartContext, UserContext } from "../../utils/context";

export const Header = ({ currentShop, extraClass = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLocationOpen, setIsLocationOpen] = React.useState(false);
  const [cart] = React.useContext(CartContext);
  const [user] = React.useContext(UserContext);

  const cartIcon = cart && cart.length ? cartIconActive : cartIconInactive;
  const paIcon = user && user.phone ? paIconActive : paIconInactive;

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLocationOpen = () => {
    setIsLocationOpen(true);
  };
  const handleLocationClose = () => {
    setIsLocationOpen(false);
  };

  const city = `${textHeader.cityPrefix}. ${currentShop.city ?? ""}`;

  return (
    <header className={`${styles.header} ${extraClass}`}>
      <div className={styles.first_row}>
        <div className={styles.content}>
          <a href="tel:88005500858"
            className={`${styles.tel} text text_type_medium text_color_primary`}
          >
            8-800-550-08-58
          </a>
          <div className={styles.location_box}>
            <div className={`${styles.location} ml-8`}>
              <img
                className="mr-7"
                src={locationIcon}
                alt={textHeader.locationAlt}
              />
              <p
                className={`${styles.city} text text_type_medium text_color_primary`}
              >
                {city}
              </p>
            </div>
            <button
              className={styles.loc_btn}
              type="button"
              onClick={handleLocationOpen}
            >
              <img
                className={styles.imgLocation}
                src={locationIcon}
                alt={textHeader.locationAlt}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.second_row}>
        <div className={styles.content}>
          <NavLink to="/main">
            <img className={styles.logo} src={logo} alt={textHeader.logoAlt} />
          </NavLink>
          <nav className={styles.nav}>
            <div className={styles.hidden_links}>
              <NavLink
                to="/main"
                className={`mr-12 ${styles.link} text text_type_large text_color_primary`}
              >
                {textHeader.main}
              </NavLink>
              <NavLink
                to="/assortment"
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
            </div>
            <button
              className={styles.burger_icon}
              type="button"
              onClick={handleMenuOpen}
            >
              <img
                className={styles.img}
                src={burgerIcon}
                alt={textHeader.iconAlt}
              />
            </button>
            <div className={styles.f_mob_icons}>
              <NavLink
                to="/pa"
                className={`mr-12 ${styles.link} ${styles.tooltip} text text_type_large text_color_primary`}
              >
                {user && user.fio ? (
                  <>
                    <p
                      className={`${styles.user_name} text text_type_large text_color_white`}
                    >
                      {user.fio}
                    </p>
                    <img
                      className={styles.icon_img}
                      src={paIcon}
                      alt={textHeader.iconAlt}
                    />
                  </>
                ) : (
                  <>
                    <img src={paIcon} alt={textHeader.iconAlt} />
                    <span className={styles.tooltiptext}>{textHeader.pa}</span>
                  </>
                )}
              </NavLink>
              <NavLink
                to="/cart"
                className={`${styles.link} ${styles.tooltip} text text_type_large text_color_primary`}
              >
                <img src={cartIcon} alt={textHeader.iconAlt} />
                <span className={styles.tooltiptext}>{textHeader.cart}</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <Modal onClose={handleMenuClose} extraClass={styles.menu_modal}>
          <NavLink
            onClick={handleMenuClose}
            to="/main"
            className={`mb-12 ${styles.link} text text_type_large text_color_primary`}
          >
            {textHeader.main}
          </NavLink>
          <NavLink
            onClick={handleMenuClose}
            to="/assortment"
            className={`mb-12 ${styles.link} text text_type_large text_color_primary`}
          >
            {textHeader.catalog}
          </NavLink>
          <NavLink
            onClick={handleMenuClose}
            to="/loyalty"
            className={`mb-12 ${styles.link} text text_type_large text_color_primary`}
          >
            {textHeader.loyalty}
          </NavLink>
          <div className={styles.mob_icons}>
            <NavLink
              onClick={handleMenuClose}
              to="/pa"
              className={`mb-12 ${styles.link} text text_type_large text_color_primary`}
            >
              <img src={paIcon} alt={textHeader.iconAlt} />
            </NavLink>
            <NavLink
              onClick={handleMenuClose}
              to="/cart"
              className={`${styles.link} text text_type_large text_color_primary`}
            >
              <img src={cartIcon} alt={textHeader.iconAlt} />
            </NavLink>
          </div>
        </Modal>
      )}
      {isLocationOpen && (
        <Modal onClose={handleLocationClose} extraClass={styles.loc_modal}>
          <p
            className={`${styles.city} text text_type_medium text_color_primary`}
          >
            {city}
          </p>
        </Modal>
      )}
    </header>
  );
};
