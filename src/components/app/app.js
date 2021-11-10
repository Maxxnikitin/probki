import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { LoyaltyPage } from "../loyalty-page/loyalty-page";
import { PartnershipPage } from "../partnership-page/partnership-page";
import { GoodsCardPage } from "../goods-card-page/goods-card-page";
import { CartPage } from "../cart-page/cart-page";
import { PersonalAreaPage } from "../personal-area-page/personal-area-page";
import { MainPage } from "../main-page/main-page";
import { AssortmentPage } from '../assortment-page/assortment-page';
import { StartPage } from "../start-page/start-page";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <StartPage />
          </Route>
          <Route path="/main">
            <MainPage />
          </Route>
          <Route path="/assortment">
            <AssortmentPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/pa">
            <PersonalAreaPage />
          </Route>
          <Route path="/desc">
            <GoodsCardPage />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
