import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./components/avatar/Avatar";
import "./App.css";

library.add(faGear, faSearch);

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <Avatar color="text-primary" userName="Rodrigo Henrique" imagePath="" />
      <Avatar color="text-secondary" userName="Rodrigo Henrique" imagePath="" />
    </div>
  );
}

export default App;
