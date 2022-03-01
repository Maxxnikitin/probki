import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { LoyaltyPage } from "../loyalty-page/loyalty-page";
import { PartnershipPage } from "../partnership-page/partnership-page";
import { GoodsCardPage } from "../goods-card-page/goods-card-page";
import { CartPage } from "../cart-page/cart-page";
import { PersonalAreaPage } from "../personal-area-page/personal-area-page";
import { MainPage } from "../main-page/main-page";
import { AssortmentPage } from "../assortment-page/assortment-page";
import { StartPage } from "../start-page/start-page";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ProtectedRoute } from "../ui/protected-roure/protected-route";
import { PrivacyPolicyPage } from "../privacy-policy-page/privacy-policy-page";
import { UserContext, CartContext } from "../../utils/context";
import {
  getFilterUnits,
  getShops,
  getUserData,
  getCart,
  refreshToken,
} from "../../utils/api";

function App() {
  const [userState, setUserState] = React.useState({});
  const [cartState, setCartState] = React.useState([]);
  const [currentShop, setCurrentShop] = React.useState({});
  const [shops, setShops] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState("1");
  const [unitsArr, setUnitsArr] = React.useState([]);
  const [filterQuery, setFilterQuery] = React.useState([]);

  React.useEffect(() => {
    Promise.all([getShops(), getFilterUnits()]).then((res) => {
      setShops(res[0]);
      const lastShop = JSON.parse(localStorage.getItem("currentShop"));
      setCurrentShop(lastShop ?? res[0][0]);
      !lastShop && localStorage.setItem("currentShop", JSON.stringify(res[0]));
      setUnitsArr(res[1]);
    });
    return () => {
      setShops([]);
      setCurrentShop({});
      setUnitsArr([]);
    };
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      Promise.all([getUserData(), getCart()]).then((res) => {
        if (res[0] && res[0].phone) {
          setUserState(res[0]);
          setCartState(res[1]);
        } else {
          refreshToken().then((res) => {
            localStorage.setItem("token", res.access);
            Promise.all([getUserData(res.access), getCart(res.access)]).then((res) => {
              if (res[0] && res[0].phone) {
                setUserState(res[0]);
                setCartState(res[1]);
              }
            });
          });
        }
      });
    }
    return () => {
      setUserState({});
      setCartState([]);
    };
  }, []);

  const onChangeShop = (e) => {
    const targetShop = shops.find((x) => x.id === +e.target.value);
    setCurrentShop(targetShop);
    localStorage.setItem("currentShop", JSON.stringify(targetShop));
  };

  return (
    <div className={styles.app}>
      <UserContext.Provider value={[userState, setUserState]}>
        <CartContext.Provider value={[cartState, setCartState]}>
          <BrowserRouter>
            <Header currentShop={currentShop} />
            <div className={styles.content}>
              <Switch>
                <ProtectedRoute path="/" exact>
                  <StartPage />
                </ProtectedRoute>
                <Route path="/main">
                  <MainPage
                    shops={shops}
                    currentShop={currentShop}
                    onChangeShop={onChangeShop}
                    unitsArr={unitsArr}
                  />
                </Route>
                <Route exact path="/assortment">
                  <AssortmentPage
                    shops={shops}
                    currentShop={currentShop}
                    onChangeShop={onChangeShop}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    unitsArr={unitsArr}
                    filterQuery={filterQuery}
                    setFilterQuery={setFilterQuery}
                  />
                </Route>
                <Route path="/assortment/:id">
                  <GoodsCardPage
                    setFilterQuery={setFilterQuery}
                    unitsArr={unitsArr}
                  />
                </Route>
                <Route path="/cart">
                  <CartPage currentShop={currentShop} unitsArr={unitsArr} />
                </Route>
                <Route path="/pa">
                  <PersonalAreaPage />
                </Route>
                <Route path="/privacy">
                  <PrivacyPolicyPage />
                </Route>
                <Route path="/partners">
                  <PartnershipPage />
                </Route>
                <Route path="/loyalty">
                  <LoyaltyPage />
                </Route>
                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </div>
            <Footer />
          </BrowserRouter>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
