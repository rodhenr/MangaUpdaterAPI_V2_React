import Button from "./components/button/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faCheckSquare,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

library.add(faGear, faCheckSquare, faCoffee);

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <Button
        onClick={() => ""}
        variant="success"
        width={230}
        iconPath="gear"
        height={30}
      >
        Following
      </Button>
      <Button onClick={() => ""} variant="primary-dark" width={230} height={30}>
        Follow
      </Button>
    </div>
  );
}

export default App;
