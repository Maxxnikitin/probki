import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { LoyaltyPage } from "../loyalty-page/loyalty-page";
import { PartnershipPage } from "../partnership-page/partnership-page";
import { GoodsCardPage } from "../goods-card-page/goods-card-page";
import { ReservationPage } from "../reservation-page/reservation-page";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <ReservationPage />
          </Route>
          <Route path="/desc">
            <GoodsCardPage />
          </Route>
          <Route path="/partners" exact>
            <PartnershipPage />
          </Route>
          <Route path="/404">
            <NotFoundPage />
          </Route>
          <Route path="/loyalty">
            <LoyaltyPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
