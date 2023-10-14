import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faCheckSquare,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import SelectGroup from "./components/select/SelectGroupt";

library.add(faGear, faCheckSquare, faCoffee);

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <SelectGroup options={["op1", "op2", "Op3"]} placeholder="Order By" />
    </div>
  );
}

export default App;
