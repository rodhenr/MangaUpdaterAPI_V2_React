import { useState } from "react";
import "./CheckboxGroup.scss";

interface Props {
  background?: "primary-light" | "primary-dark" | "success" | "danger";
  options: string[];
}

function CheckboxGroup({ background, options }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const backgroundColor = background ?? "primary-dark";

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions?.includes(option)) {
      setSelectedOptions(selectedOptions.filter((i) => i !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex column gap-2">
      {options.map((el) => (
        <div className="checkbox-container flex-center">
          <label className="flex roboto cursor-pointer">
            <input
              type="checkbox"
              value={el}
              checked={selectedOptions.includes(el)}
              onChange={() => handleCheckboxChange(el)}
            />
            <span className={`custom-checkbox flex-center ${backgroundColor}`}>
              {selectedOptions.includes(el) && (
                <span className="checkmark text-light"></span>
              )}
            </span>
            {el}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxGroup;
