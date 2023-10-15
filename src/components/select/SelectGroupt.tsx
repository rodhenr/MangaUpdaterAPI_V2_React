import { ChangeEvent, useState } from "react";

import "./SelectGroup.scss";

interface Props {
  height?: number;
  options: string[];
  placeholder: string;
  width?: number;
}

function SelectGroup({
  height = 30,
  options,
  placeholder,
  width = 150,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <select
      name={placeholder}
      className="select-main text-primary radius-2 roboto border-box"
      style={{ height: height, width: width }}
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option value="" selected hidden>
        {placeholder}
      </option>
      {options.map((el) => (
        <option value={el}>{el}</option>
      ))}
    </select>
  );
}

export default SelectGroup;
