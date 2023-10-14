import "./App.css";
import Checkbox from "./components/checkbox/CheckboxGroup";
import RadioButtonGroup from "./components/radio/RadioButtonGroup";

function App() {
  return (
    <div className="flex-center column gap-3" style={{ height: "100%" }}>
      <div>
        <Checkbox
          options={["Option1", "Option2", "Option3"]}
          background="primary-light"
        />
      </div>
      <div>
        <Checkbox
          options={["Option1", "Option2", "Option3"]}
          background="primary-dark"
        />
      </div>
      <div>
        <Checkbox
          options={["Option1", "Option2", "Option3"]}
          background="danger"
        />
      </div>
      <div>
        <Checkbox
          options={["Option1", "Option2", "Option3"]}
          background="success"
        />
      </div>
      <div>
        <RadioButtonGroup
          options={[
            { variant: "success", text: "success" },
            { variant: "danger", text: "danger" },
          ]}
        ></RadioButtonGroup>
      </div>
    </div>
  );
}

export default App;
