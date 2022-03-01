import React from "react";
import styles from "./assortment-page.module.css";
import { Select } from "../ui/select/select";
import { SelectSorting } from "../ui/select-sorting/select-sorting";
import { textAssortmentPage } from "../../texts/ru";
import { GoodsCard } from "../goods-card/goods-card";
import { Input } from "../ui/input/input";
import { Checkbox } from "../ui/checkbox/checkbox";
import { FiltersBox } from "../ui/filters-box/filters-box";
import { InputRange } from "../ui/input-range/input-range";
import rowsInactiveIcon from "../../images/icons/rows-inactive.svg";
import rowsActiveIcon from "../../images/icons/rows-active.svg";
import cellsInactiveIcon from "../../images/icons/cells-inactive.svg";
import cellsActiveIcon from "../../images/icons/cells-active.svg";
import filterActiveIcon from "../../images/icons/filter-active.svg";
import filterInactiveIcon from "../../images/icons/filter-inactive.svg";
import { Button } from "../ui/button/button";
import { BreadCrumbs } from "../ui/bread-crumbs/bread-crumbs";
import {
  getProducts,
  getFilterColor,
  getFilterStyle,
  getFilterKind,
  getFilterCountry,
  getFilterBrewery,
} from "../../utils/api";
import { PaginationButton } from "../ui/pagination-button/pagination-button";
import pagPrevIcon from "../../images/icons/pag-prev.svg";
import pagNextIcon from "../../images/icons/pag-next.svg";
import { CartContext } from "../../utils/context";

export const AssortmentPage = ({
  shops,
  currentShop,
  onChangeShop,
  currentPage,
  unitsArr,
  setCurrentPage,
  filterQuery,
  setFilterQuery,
  extraClass = "",
}) => {
  const [isRowsActive, setIsRowsActive] = React.useState(
    window.screen.width > 415
  );
  const [isMobileWidth, setIsMobileWidth] = React.useState(
    window.screen.width <= 415
  );
  const [isCellsActive, setIsCellsActive] = React.useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(
    window.screen.width >= 855
  );
  const [goods, setGoods] = React.useState([]);
  const [paginationPages, setPaginationPages] = React.useState(1);
  const [nextPageOffset, setNextPageOffset] = React.useState(0);
  const [prevPageOffset, setPrevPageOffset] = React.useState(0);
  const [queries, setQueries] = React.useState(localStorage.getItem('query') ?? "");
  const [filtersData, setFiltersData] = React.useState({
    in_stock: true,
    style: {},
    color: {},
    kind: {},
    country: {},
    brewery: {},
    brand: {},
    snack: {},
    name: "",
    ordering: "default",
  });

  const [filtersToRender, setFiltersToRender] = React.useState([]);
  const [cart] = React.useContext(CartContext);

  const paginationBtnsArray = [];

  window.onresize = (e) => {
    if (e.target.screen.width <= 415) {
      !isCellsActive && handleCellsClick();
      !isMobileWidth && setIsMobileWidth(true);
    } else {
      isMobileWidth && setIsMobileWidth(false);
    }
  };

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

  const handleSearchChange = (e) => {
    setFiltersData({
      ...filtersData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.target.textContent);
    getProducts(
      currentShop.id,
      `${(+e.target.textContent - 1) * 20}`,
      queries
    ).then((res) => {
      setGoods(res.results);
    });
  };

  const handleNextChange = () => {
    if (
      paginationBtnsArray.indexOf(+currentPage) !==
      paginationBtnsArray.length - 1
    ) {
      setCurrentPage(+currentPage + 1);
      getProducts(currentShop.id, nextPageOffset, queries).then((res) => {
        setGoods(res.results);
        res.next && setNextPageOffset(+res.next.split("offset=")[1]);
        res.previous && setPrevPageOffset(+res.previous.split("offset=")[1]);
      });
    }
  };

  const handlePrevChange = () => {
    if (paginationBtnsArray.indexOf(+currentPage) !== 0) {
      setCurrentPage(+currentPage - 1);
      getProducts(currentShop.id, prevPageOffset, queries).then((res) => {
        setGoods(res.results);
        res.next && setNextPageOffset(+res.next.split("offset=")[1]);
        res.previous && setPrevPageOffset(+res.previous.split("offset=")[1]);
      });
    }
  };

  const handleFiltersToggle = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const onFiltersChange = (e) => {
    setFiltersData({
      ...filtersData,
      [e.target.name]: e.target.checked,
    });
  };

  const onChangeSorting = (e) => {
    setFiltersData({
      ...filtersData,
      ordering: e.target.value,
    });
  };

  const handleFiltersOn = React.useCallback(() => {
    const query = [];
    for (let key in filtersData) {
      if (key === "in_stock") {
        filtersData[key]
          ? query.push(`&${key}=${0.001}`)
          : query.push(`&${key}=${0}`);
      } else if (key === "ordering") {
        filtersData[key] !== "default" &&
          query.push(`&${key}=${filtersData[key]}`);
      } else if (filtersData[key]) {
        if (typeof filtersData[key] === "object") {
          let filer__in;
          for (let j in filtersData[key]) {
            if (filtersData[key][j]) {
              filer__in ? (filer__in += `,${j}`) : (filer__in = `${j}`);
            }
          }
          filer__in && query.push(`&${key}__in=${filer__in}`);
        } else {
          query.push(`&${key}=${filtersData[key]}`);
        }
      }
    }
    const resultQuery = query.join("");
    setQueries(resultQuery);
    localStorage.setItem('query', resultQuery);
    getProducts(currentShop.id, 0, 20, resultQuery).then((res) => {
      setPaginationPages(Math.ceil(res.count / 20));
      setGoods(res.results);
    });
  }, [currentShop.id, filtersData]);

  React.useEffect(() => {
    if (filterQuery.length) {
      let query;
      if (filterQuery[0] === "ibu" || filterQuery[0] === "density") {
        query = `&in_stock=0.001&${filterQuery[0]}__gte=${filterQuery[1] - 2}&${
          filterQuery[0]
        }__lte=${+filterQuery[1] + 2}`;
        setFiltersData({
          ...filtersData,
          [`${filterQuery[0]}__gte`]: filterQuery[1] - 2,
          [`${filterQuery[0]}__lte`]: +filterQuery[1] + 2,
        });
      }
      if (filterQuery[0] === "volume") {
        query = `&in_stock=0.001&volume__gte=${filterQuery[1]}&volume__lte=${filterQuery[1]}`;
        setFiltersData({
          ...filtersData,
          volume__gte: filterQuery[1],
          volume__lte: filterQuery[1],
        });
      }
      if (filterQuery[0] === "abv") {
        query = `&in_stock=0.001&abv__gte=${filterQuery[1] - 1}&abv__lte=${
          +filterQuery[1] + 1
        }`;
        setFiltersData({
          ...filtersData,
          abv__gte: filterQuery[1] - 1,
          abv__lte: +filterQuery[1] + 1,
        });
      }
      query &&
        getProducts(currentShop.id, 0, 20, query).then((res) => {
          setPaginationPages(Math.ceil(res.count / 20));
          setGoods(res.results);
        });
      filtersToRender.forEach((item) => {
        if (item.title === filterQuery[0]) {
          item.data.forEach((j) => {
            if (j.name === filterQuery[1]) {
              query = `&in_stock=0.001&${item.title}=${j.id}`;
              getProducts(currentShop.id, 0, 20, query).then((res) => {
                setPaginationPages(Math.ceil(res.count / 20));
                setGoods(res.results);
                setFiltersData({
                  ...filtersData,
                  [item.title]: { [j.id]: true },
                });
              });
            }
          });
        }
      });
    }
  }, [filterQuery, filtersToRender]);

  React.useEffect(() => {
    handleFiltersOn();
  }, [filtersData.name, filtersData.ordering, handleFiltersOn]);

  const handleFiltersOff = () => {
    setFiltersData({
      in_stock: true,
      style: {},
      color: {},
      kind: {},
      country: {},
      brewery: {},
      brand: {},
      snack: {},
      name: "",
      ordering: "default",
    });
    setFilterQuery("");

    getProducts(currentShop.id).then((res) => {
      setGoods(res.results);
      setCurrentPage(1);
      setQueries("");
      localStorage.setItem('query', "");
      setPaginationPages(Math.ceil(res.count / 20));
      res.next && setNextPageOffset(+res.next.split("offset=")[1]);
      res.previous && setPrevPageOffset(+res[0].previous.split("offset=")[1]);
    });
  };

  const paginationBtnsRender = () => {
    const renderBtnsArray = [];
    const pageIndex = paginationBtnsArray.indexOf(+currentPage);
    if (isMobileWidth && paginationBtnsArray.length <= 5) {
      paginationBtnsArray.forEach((item) => {
        renderBtnsArray.push(item);
      });
    } else if (isMobileWidth && pageIndex <= 2) {
      renderBtnsArray.push(paginationBtnsArray[0]);
      renderBtnsArray.push(paginationBtnsArray[1]);
      renderBtnsArray.push(paginationBtnsArray[2]);
      renderBtnsArray.push(". . .");
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 1]);
    } else if (
      isMobileWidth &&
      pageIndex > 2 &&
      pageIndex < paginationBtnsArray.length - 3
    ) {
      renderBtnsArray.push(paginationBtnsArray[0]);
      renderBtnsArray.push(". . .");
      renderBtnsArray.push(currentPage);
      renderBtnsArray.push(". . .");
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 1]);
    } else if (isMobileWidth && pageIndex >= paginationBtnsArray.length - 3) {
      renderBtnsArray.push(paginationBtnsArray[0]);
      renderBtnsArray.push(". . .");
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 3]);
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 2]);
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 1]);
    } else if (paginationBtnsArray.length < 8) {
      paginationBtnsArray.forEach((item) => {
        renderBtnsArray.push(item);
      });
    } else if (paginationBtnsArray.length <= +currentPage + 3) {
      if (paginationBtnsArray.length > 6) {
        renderBtnsArray.push(paginationBtnsArray[0]);
        renderBtnsArray.push(". . .");
      }
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 5]);
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 4]);
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 3]);
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 2]);
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 1]);
    } else if (pageIndex < 3) {
      renderBtnsArray.push(paginationBtnsArray[0]);
      renderBtnsArray.push(paginationBtnsArray[1]);
      renderBtnsArray.push(paginationBtnsArray[2]);
      renderBtnsArray.push(paginationBtnsArray[3]);
      if (paginationBtnsArray.length > 6) {
        renderBtnsArray.push(". . .");
      }
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 2]);
      renderBtnsArray.push(paginationBtnsArray[paginationBtnsArray.length - 1]);
    } else if (pageIndex >= 3) {
      renderBtnsArray.push(paginationBtnsArray[0]);
      if (pageIndex !== 3) {
        renderBtnsArray.push(". . .");
      }
      if (paginationBtnsArray.length <= +currentPage + 3) {
        renderBtnsArray.push(currentPage - 2);
      }
      if (pageIndex === 3) {
        renderBtnsArray.push(currentPage - 2);
      }
      renderBtnsArray.push(currentPage - 1);
      renderBtnsArray.push(currentPage);
      renderBtnsArray.push(+currentPage + 1);
      if (paginationBtnsArray.length > +currentPage + 3) {
        renderBtnsArray.push(". . .");
        renderBtnsArray.push(
          paginationBtnsArray[paginationBtnsArray.length - 1]
        );
      } else if (paginationBtnsArray.length <= +currentPage + 3) {
        renderBtnsArray.push(
          paginationBtnsArray[paginationBtnsArray.length - 2]
        );
        renderBtnsArray.push(
          paginationBtnsArray[paginationBtnsArray.length - 1]
        );
      }
    }

    return renderBtnsArray;
  };

  const rowsIcon = isRowsActive ? rowsActiveIcon : rowsInactiveIcon;
  const cellsIcon = isCellsActive ? cellsActiveIcon : cellsInactiveIcon;
  const goodsBoxClassName = isRowsActive
    ? styles.filters_box_row
    : styles.filters_box_cell;

  const filterIcon = isFiltersOpen ? filterActiveIcon : filterInactiveIcon;

  React.useEffect(() => {
    currentShop.id &&
      Promise.all([
        getProducts(currentShop.id, `${(currentPage - 1) * 20}`, queries),
        getFilterColor(),
        getFilterStyle(),
        getFilterCountry(),
        getFilterBrewery(),
        getFilterKind(),
      ]).then((res) => {
        setGoods(res[0].results);
        setPaginationPages(Math.ceil(res[0].count / 20));
        res[0].next && setNextPageOffset(+res[0].next.split("offset=")[1]);
        res[0].previous &&
          setPrevPageOffset(+res[0].previous.split("offset=")[1]);

        const filtersData = [];
        filtersData.push({ title: "color", data: res[1] });
        filtersData.push({ title: "style", data: res[2] });
        filtersData.push({ title: "country", data: res[3] });
        filtersData.push({ title: "brewery", data: res[4] });
        filtersData.push({ title: "kind", data: res[5] });
        setFiltersToRender(filtersData);
      });
  }, [currentShop.id]);

  if (paginationPages) {
    for (let i = 1; i <= paginationPages; ++i) {
      paginationBtnsArray.push(i);
    }
  }

  return (
    <main className={`${styles.content} ${extraClass}`}>
      <BreadCrumbs />
      <div className={`${styles.content_header} mt-8 mb-12`}>
        <Select
          shops={shops}
          value={currentShop.id}
          onChange={onChangeShop}
          extraClass={styles.select}
        />
        <div className={styles.sorting_box}>
          <p className="text text_type_sorting-bold text_color_additional">
            {textAssortmentPage.sorting}
          </p>
          <SelectSorting
            onChange={onChangeSorting}
            value={filtersData.ordering}
          />
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
            name="name"
            onChange={handleSearchChange}
            placeholder={textAssortmentPage.searchPlaceholder}
            value={filtersData.name}
          />
          <div className={styles.title_row}>
            <p
              className={`${styles.filter_title} text text_type_medium text_color_secondary mt-12 mb-10`}
            >
              {textAssortmentPage.filtersTitle}
            </p>
            <button
              className={`${styles.btn} ${styles.filter_btn_400px}`}
              type="button"
              onClick={handleFiltersToggle}
            >
              <img
                className={styles.icon}
                src={filterIcon}
                alt={textAssortmentPage.iconFilterAlt}
              />
            </button>
            <div className={styles.mob_sorting_box}>
              <div className={styles.first_col}>
                <p className="text text_type_sorting-bold text_color_additional">
                  {textAssortmentPage.sorting}
                </p>
                <SelectSorting
                  onChange={onChangeSorting}
                  value={filtersData.ordering}
                />
              </div>
              <div className={styles.second_col}>
                <button
                  className={`${styles.btn} ${styles.filter_btn}`}
                  type="button"
                  onClick={handleFiltersToggle}
                >
                  <img
                    className={styles.icon}
                    src={filterIcon}
                    alt={textAssortmentPage.iconFilterAlt}
                  />
                </button>
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
          </div>
          {isFiltersOpen && (
            <div className={styles.mob_filters}>
              <Checkbox
                name="in_stock"
                id="in_stock"
                isFilter={true}
                label={textAssortmentPage.filter2}
                checked={filtersData.in_stock}
                onChange={onFiltersChange}
                extraClass={`${styles.main_filter} mb-12`}
              />
            </div>
          )}
          {isFiltersOpen && (
            <div className={styles.main_filters}>
              {filtersToRender.map((item, index) => {
                return (
                  <FiltersBox
                    key={index}
                    text={textAssortmentPage[item.title]}
                    filtersArray={item.data}
                    isFiltersOpen={true}
                    filtersData={filtersData}
                    setFiltersData={setFiltersData}
                    parent={item.title}
                  />
                );
              })}
            </div>
          )}
          {isFiltersOpen && (
            <div
              className={`${styles.mob_filters} ${styles.mob_filters_range}`}
            >
              <InputRange
                setFiltersData={setFiltersData}
                filtersData={filtersData}
                name="volume"
                from={0}
                to={5.0}
                unit="liters"
                label={textAssortmentPage.value}
              />
              <InputRange
                setFiltersData={setFiltersData}
                filtersData={filtersData}
                name="abv"
                from={0}
                to={20.0}
                unit="liters"
                label={textAssortmentPage.strength}
              />
              <InputRange
                setFiltersData={setFiltersData}
                filtersData={filtersData}
                name="density"
                from={0}
                to={40}
                unit="liters"
                label={textAssortmentPage.density}
              />
              <InputRange
                setFiltersData={setFiltersData}
                filtersData={filtersData}
                name="ibu"
                from={0}
                to={120}
                unit="liters"
                label={textAssortmentPage.ibu}
              />
            </div>
          )}
          {isFiltersOpen && (
            <div className={styles.mob_btns}>
              <Button
                type="button"
                kind="cart"
                text={textAssortmentPage.btnOk}
                extraClass={`${styles.btn_filters} mt-16 mb-5`}
                isCell={true}
                onClick={handleFiltersOn}
              />
              <Button
                type="button"
                kind="cart"
                text={textAssortmentPage.btnReset}
                extraClass={styles.btn_filters}
                isCell={true}
                onClick={handleFiltersOff}
              />
            </div>
          )}
        </div>
        <div className={styles.goods_box}>
          <div className={goodsBoxClassName}>
            {goods.map((item, index) => {
              let isInCart = false;
              cart.forEach((j) => {
                if (item.id === j.product) {
                  isInCart = true;
                }
              });
              return (
                <GoodsCard
                  key={index}
                  good={item}
                  isRow={isRowsActive}
                  unitsArr={unitsArr}
                  isInCart={isInCart}
                />
              );
            })}
          </div>
          <div className={styles.pagination}>
            <Button
              extraClass={styles.pagination_btn}
              text={textAssortmentPage.pagination1}
              onClick={handlePrevChange}
            />
            <Button
              extraClass={styles.mob_pagination_btn}
              img={pagPrevIcon}
              onClick={handlePrevChange}
            />
            <div className={styles.pagination_num_btn_box}>
              {paginationBtnsRender().map((item, index) => {
                if (item === ". . .") {
                  return (
                    <p
                      key={index}
                      className="text text_type_large text_color_primary"
                    >
                      {item}
                    </p>
                  );
                }
                return (
                  <PaginationButton
                    key={index}
                    isActive={+currentPage === +item}
                    onClick={handlePageChange}
                    extraClass={styles.pagination_num_btn}
                    text={item}
                  />
                );
              })}
            </div>
            <Button
              extraClass={styles.pagination_btn}
              text={textAssortmentPage.pagination2}
              onClick={handleNextChange}
            />
            <Button
              extraClass={styles.mob_pagination_btn}
              img={pagNextIcon}
              onClick={handleNextChange}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
