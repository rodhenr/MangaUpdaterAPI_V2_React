import "./App.css";
import RadioButtonGroup from "./components/radio/RadioButtonGroup";

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <div>
        <RadioButtonGroup
          options={[
            { variant: "success", text: "success" },
            { variant: "danger", text: "danger" },
          ]}
        />
      </div>
      <div>
        <RadioButtonGroup
          showLabel={false}
          options={[
            { variant: "success", text: "success" },
            { variant: "danger", text: "danger" },
            { variant: "primary-light", text: "light" },
            { variant: "primary-dark", text: "dark" },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
