import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.css";
import { NotFoundPage } from '../not-found-page/not-found-page';
import { LoyaltyPage } from '../loyalty-page/loyalty-page'; 

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            {/* <NotFoundPage /> */}
            <LoyaltyPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
