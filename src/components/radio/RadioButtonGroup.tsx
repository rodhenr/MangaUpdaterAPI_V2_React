import { useState } from "react";
import "./RadioButtonGroup.scss";

interface Option {
  text: string;
  variant: "primary-light" | "primary-dark" | "success" | "danger";
}

interface Props {
  showLabel?: boolean;
  options: Option[];
}

function RadioButtonGroup({ showLabel = true, options }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<string>("");

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions(option);
  };

  return (
    <div className="flex column gap-2">
      {options.map((el) => (
        <label className="radio-butto flex align-center gap-1 cursor-pointer roboto">
          <input
            type="radio"
            value={el.text}
            checked={selectedOptions === el.text}
            onChange={() => handleCheckboxChange(el.text)}
            className={`round ${el.variant}`}
          />
          {showLabel && el.text}
        </label>
      ))}
    </div>
  );
}

export default RadioButtonGroup;
