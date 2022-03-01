import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import styles from "./bread-crumbs.module.css";
import { textBreadCrumbs } from "../../../texts/ru";
import backIcon from "../../../images/icons/bread-back.svg";

export const BreadCrumbs = ({ goodName, mode, extraClass = "" }) => {
  const { path } = useRouteMatch();
  const pathname = path.split("/")[1];
  return (
    <div className={`${styles.content} ${extraClass} mt-12`}>
      <NavLink
        className={`${styles.link} ${styles[mode]} text text_type_medium text_color_select`}
        to="/main"
      >
        {textBreadCrumbs.main}
      </NavLink>
      <NavLink
        className={`${styles.link} text text_type_medium text_color_input`}
        to={`/${pathname}`}
      >
        <img
          className={mode ? styles.back_img : styles.hidden}
          src={backIcon}
          alt={textBreadCrumbs.backAlt}
        />
        {textBreadCrumbs[pathname]}
      </NavLink>
      {goodName && (
        <NavLink
          className={`${styles.link} ${styles[mode]} text text_type_medium text_color_input`}
          to={`/${pathname}`}
        >
          {`/ ${goodName}`}
        </NavLink>
      )}
    </div>
  );
};
