import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faSearch } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import CardWithInfo from "./components/card/CardWithInfo";

library.add(faGear, faSearch);

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <CardWithInfo
        buttonVariant="primary-dark"
        variant="primary-light"
        cover="https://mangadex.org/covers/9f39246a-8b05-4b19-b822-727e748723dc/51dab9f1-d72a-4a7d-8254-714334f91051.jpg"
        name="Aharen-san wa Hakarenai"
        chapters={[
          {
            date: new Date("2023-08-01"),
            isRead: false,
            number: 142,
            source: "Mangadex",
          },
          {
            date: new Date("2023-07-01"),
            isRead: false,
            number: 141,
            source: "Mangadex",
          },
          {
            date: new Date("2023-06-01"),
            isRead: true,
            number: 140,
            source: "Mangadex",
          },
        ]}
      />
    </div>
  );
}

export default App;
