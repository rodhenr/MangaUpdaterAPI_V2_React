import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Input from "./components/input/Input";

library.add(faGear, faSearch);

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <Input
        icon="search"
        iconSide="left"
        onSubmit={() => null}
        placeholder="Enter a name"
        variant="primary-light"
      />
      <Input
        icon="search"
        iconSide="left"
        onSubmit={() => null}
        placeholder="Enter a name"
        variant="primary-dark"
      />
      <Input
        icon="search"
        iconSide="left"
        onSubmit={() => null}
        placeholder="Enter a name"
        variant="danger"
      />
      <Input
        icon="search"
        iconSide="left"
        onSubmit={() => null}
        placeholder="Enter a name"
        variant="success"
      />
      <Input
        icon="search"
        iconSide="left"
        onSubmit={() => null}
        placeholder="Enter a name"
        variant="bg-light"
      />
      <Input
        icon="search"
        iconSide="left"
        onSubmit={() => null}
        placeholder="Enter a name"
        variant="bg-dark"
      />
    </div>
  );
}

export default App;
