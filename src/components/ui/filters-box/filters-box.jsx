import React from "react";
import styles from "./filters-box.module.css";
import arrowIcon from "../../../images/icons/arrow-filter.svg";
import { Checkbox } from "../checkbox/checkbox";
import { textAssortmentPage } from "../../../texts/ru";

export const FiltersBox = ({
  isFiltersOpen = false,
  text = "",
  filtersArray = [],
  filtersData,
  setFiltersData,
  parent,
  extraClass = "",
}) => {
  const [isOpenFilters, setIsOpenFilters] = React.useState(isFiltersOpen);
  const [isFullFiltersList, setIsFullFiltersList] = React.useState(false);

  const handleOpenFilters = () => {
    setIsOpenFilters(!isOpenFilters);
  };

  const onChangeFilter = (e) => {
    setFiltersData({
      ...filtersData,
      [parent]: {
        ...filtersData[parent],
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleOpenFiltersList = () => {
    setIsFullFiltersList(true);
  };

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <button onClick={handleOpenFilters} type="button" className={styles.btn}>
        <p className="text text_type_medium text_color_secondary">{text}</p>
        <img
          className={styles.img}
          src={arrowIcon}
          alt={textAssortmentPage.iconArrowAlt}
        />
      </button>
      {isOpenFilters && (
        <div className={styles.filters_box}>
          {filtersArray.map((item, index) => {
            if (index > 4) {
              if (!isFullFiltersList) {
                return "";
              }
            }
            return (
              <Checkbox
                key={index}
                name={item.name}
                id={item.id}
                checked={filtersData[parent][item.id] ?? false}
                label={item.name}
                isFilter={true}
                onChange={onChangeFilter}
              />
            );
          })}
        </div>
      )}
      {isOpenFilters && !isFullFiltersList && filtersArray.length > 5 && (
        <button
          className={`${styles.open_more_btn} text text_type_medium text_color_checkbox`}
          type="button"
          onClick={handleOpenFiltersList}
        >
          {textAssortmentPage.btnShowMore}
        </button>
      )}
    </div>
  );
};
