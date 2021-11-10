import React from "react";
import styles from "./filters-box.module.css";
import arrowIcon from "../../../images/icons/arrow-filter.svg";
import { Checkbox } from "../checkbox/checkbox";
import { textAssortmentPage } from "../../../texts/ru";

export const FiltersBox = ({
  isFiltersOpen = false,
  text = "",
  filtersArray = [],
  extraClass = "",
}) => {
  const [isOpenFilters, setIsOpenFilters] = React.useState(isFiltersOpen);

  const handleOpenFilters = () => {
    setIsOpenFilters(!isOpenFilters);
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
            return (
              <Checkbox
                key={index}
                name={item.name}
                checked={item.checked}
                label={item.text}
                isFilter={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
