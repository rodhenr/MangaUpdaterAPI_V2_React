import { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { ISelectState } from "../../shared/interfaces/components";

import "./SelectGroup.scss";

interface Props {
  height?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: ISelectState[];
  placeholder: string;
  value: string;
  width?: string;
}

function SelectGroup({
  height = "30px",
  onChange,
  options,
  placeholder,
  value,
  width = "100%",
}: Props) {
  return (
    <select
      name={placeholder}
      className="select-main text-primary radius-2 roboto border-box"
      style={{ height: height, width: width }}
      value={value}
      onChange={onChange}
    >
      {options.map((el) => (
        <option key={uuidv4()} value={el.value} hidden={el.isHidden}>
          {el.description}
        </option>
      ))}
    </select>
  );
}

export default SelectGroup;
