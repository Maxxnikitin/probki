import React from "react";
import styles from "./assortment-page.module.css";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Select } from "../ui/select/select";
import { SelectSorting } from "../ui/select-sorting/select-sorting";
import { textAssortmentPage } from "../../texts/ru";
import { GoodsCard } from "../goods-card/goods-card";
import { goods } from "../../utils/constants";
import { Input } from "../ui/input/input";
import { Checkbox } from "../ui/checkbox/checkbox";
import { FiltersBox } from "../ui/filters-box/filters-box";
// import { InputRange } from "../ui/input-range/input-range";
import rowsInactiveIcon from "../../images/icons/rows-inactive.svg";
import rowsActiveIcon from "../../images/icons/rows-active.svg";
import cellsInactiveIcon from "../../images/icons/cells-inactive.svg";
import cellsActiveIcon from "../../images/icons/cells-active.svg";
import { Button } from "../ui/button/button";

export const AssortmentPage = ({ extraClass = "" }) => {
  const [isRowsActive, setIsRowsActive] = React.useState(true);
  const [isCellsActive, setIsCellsActive] = React.useState(false);

  const handleRowsClick = () => {
    if (!isRowsActive) {
      setIsRowsActive(true);
      setIsCellsActive(false);
    }
  };
  const handleCellsClick = () => {
    if (!isCellsActive) {
      setIsCellsActive(true);
      setIsRowsActive(false);
    }
  };

  const rowsIcon = isRowsActive ? rowsActiveIcon : rowsInactiveIcon;
  const cellsIcon = isCellsActive ? cellsActiveIcon : cellsInactiveIcon;
  const goodsBoxClassName = isRowsActive
    ? styles.filters_box_row
    : styles.filters_box_cell;

  const filtersTitles = [
    "filterTitle1",
    "filterTitle2",
    "filterTitle3",
    "filterTitle4",
    "filterTitle5",
    "filterTitle6",
    "filterTitle7",
    "filterTitle8",
  ];

  const filtersArray = [
    {
      text: "Импортное пиво",
      checked: false,
      name: "imported beer",
    },
    {
      text: "Импортный крафт",
      checked: false,
      name: "imported craft",
    },
    {
      text: "Российское пиво",
      checked: false,
      name: "russian beer",
    },
    {
      text: "Русский крафт",
      checked: false,
      name: "russian craft",
    },
    {
      text: "Сидр и медовуха",
      checked: false,
      name: "cider and mead",
    },
    {
      text: "Безалкогольное",
      checked: false,
      name: "Non-alcoholic",
    },
  ];

  return (
    <div className={`${styles.page} ${extraClass}`}>
      <Header />
      <main className={styles.content}>
        <div className={`${styles.content_header} mt-8 mb-12`}>
          <Select defaultValue="value1" extraClass={styles.select} />
          <div className={styles.sorting_box}>
            <p className="text text_type_sorting-bold text_color_additional">
              {textAssortmentPage.sorting}
            </p>
            <SelectSorting defaultValue="value1" />
            <button
              className={styles.btn}
              type="button"
              onClick={handleRowsClick}
            >
              <img
                className={styles.icon}
                src={rowsIcon}
                alt={textAssortmentPage.iconRowAlt}
              />
            </button>
            <button
              className={styles.btn}
              type="button"
              onClick={handleCellsClick}
            >
              <img
                className={styles.icon}
                src={cellsIcon}
                alt={textAssortmentPage.iconCellAlt}
              />
            </button>
          </div>
        </div>
        <section className={styles.main_content}>
          <div className={styles.filters_box}>
            <p className="text text_type_medium text_color_secondary mb-4">
              {textAssortmentPage.searchPlaceholder}
            </p>
            <Input
              type="text"
              kind="search"
              placeholder={textAssortmentPage.searchPlaceholder}
            />
            <p className="text text_type_medium text_color_secondary mt-12 mb-10">
              {textAssortmentPage.filtersTitle}
            </p>
            <Checkbox
              name="services"
              isFilter={true}
              label={textAssortmentPage.filter1}
              extraClass="mb-8"
            />
            <Checkbox
              name="stock"
              isFilter={true}
              label={textAssortmentPage.filter2}
              extraClass="mb-12"
            />
            <div className={styles.main_filters}>
              {filtersTitles.map((item, index) => {
                return (
                  <FiltersBox
                    key={index}
                    text={textAssortmentPage[item]}
                    filtersArray={filtersArray}
                    isFiltersOpen={true}
                  />
                );
              })}
            </div>
            {/* <InputRange title="text" /> */}
            <Button
              type="button"
              kind="cart"
              text={textAssortmentPage.btnOk}
              extraClass={`${styles.btn_filters} mt-16 mb-5`}
              isCell={true}
            />
            <Button
              type="button"
              kind="cart"
              text={textAssortmentPage.btnReset}
              extraClass={styles.btn_filters}
              isCell={true}
            />
          </div>
          <div className={styles.goods_box}>
            <div className={goodsBoxClassName}>
              {goods.map((item, index) => {
                return (
                  <GoodsCard
                    key={index}
                    img={item.img}
                    cost={item.cost}
                    volume={item.volume}
                    name={item.name}
                    stock={item.stock}
                    rating={item.rating}
                    isRow={isRowsActive}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
