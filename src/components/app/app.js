import "./app.css";
import { Button } from "../ui/button/button";
import { Checkbox } from "../ui/checkbox/checkbox";
import { RadioBtn } from "../ui/radio-btn/radio-btn";

function App() {
  return (
    <div className="app">
      <Button text="test" />
      <Checkbox name="test" label="Импортное пиво" />
      <Checkbox name="test2" label="Импортное пиво" />
      <RadioBtn name="test3" id="1" label="Импортное пиво" />
      <RadioBtn name="test3" id="2" label="Импортное пиво" />
      <RadioBtn name="test3" id="3" label="Импортное пиво" />
    </div>
  );
}

export default App;
