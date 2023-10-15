import { useState } from "react";

import { Variant } from "../../shared/interfaces/components";

import "./CheckboxGroup.scss";

interface Props {
  background?: Variant;
  options: string[];
}

function CheckboxGroup({ background = "primary-dark", options }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
            <span className={`custom-checkbox flex-center ${background}`}>
              {selectedOptions.includes(el) && (
                <span className="checkmark bg-light"></span>
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
