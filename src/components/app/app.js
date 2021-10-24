import "./app.css";
import { Button } from "../ui/button/button";
import { Checkbox } from "../ui/checkbox/checkbox";
import { RadioBtn } from "../ui/radio-btn/radio-btn";
import { GoodsCard } from "../goods-card/goods-card";
import goodImg from "../../images/1.jpg";
import './app.css';
import { Input } from '../ui/input/input';
import { SignUp } from "../sign-up/sign-up";
import { CartGoods } from '../cart-goods/cart-goods';

function App() {
  return (
    <div className="app">
      <Button text="test" />
      <Checkbox name="test" label="Импортное пиво" />
      <Checkbox name="test2" label="Импортное пиво" />
      <RadioBtn name="test3" id="1" label="Импортное пиво" />
      <RadioBtn name="test3" id="2" label="Импортное пиво" />
      <RadioBtn name="test3" id="3" label="Импортное пиво" />
      <div style={{ width: "860px", marginBottom: "20px" }}>
        <GoodsCard img={goodImg} isRow={true} name="Пиво Найтберг Жигулёвское Пиво Найтберг Жигулёвское Пиво Найтберг Жигулёвское" />
      </div>
      <div style={{ width: "860px" }}>
        <GoodsCard img={goodImg} isRow={false} name="Пиво Найтберг Жигулёвское Пиво Найтберг Жигулёвское Пиво Найтберг Жигулёвское" />
      </div>
      <Input label='Фамилия' />
      <Input kind='search' placeholder='Поиск по сайту' />
      <div style={{width: "460px"}}>
        <SignUp />
      </div>
      <div style={{ width: "860px" }}>
        <CartGoods img={goodImg} name="Пиво Найтберг Жигулёвское Пиво Найтберг Жигулёвское Пиво Найтберг Жигулёвское" />
      </div>
    </div>
  );
}

export default App;
