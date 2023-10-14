import { useState } from "react";
import "./RadioButtonGroup.scss";

interface Option {
  text: string;
  variant: "primary-light" | "primary-dark" | "success" | "danger";
}

interface Props {
  options: Option[];
}

function RadioButtonGroup({ options }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<string>("");

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(option);
  };

  return (
    <div className="flex column gap-2">
      {options.map((el) => (
        <div>
          <label className="cursor-pointer roboto">
            <input
              type="radio"
              value={el.text}
              checked={selectedOptions === el.text}
              onChange={() => handleCheckboxChange(el.text)}
              className={`round ${el.variant}`}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
