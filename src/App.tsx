import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import Card from "./components/card/Card";

library.add(faGear, faSearch);

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <Card
        color="text-primary"
        imagePath="https://mangadex.org/covers/9f39246a-8b05-4b19-b822-727e748723dc/51dab9f1-d72a-4a7d-8254-714334f91051.jpg"
        text="Aharen-san wa Hakarenai"
      />
    </div>
  );
}

export default App;
