import { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SelectStateType } from '../../../components/Components.types';
import '../styles/SelectGroup.scss';

type SelectGroupPropsType = {
  height?: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectStateType[];
  placeholder: string;
  value: string;
  width?: string;
};

const SelectGroup: React.FC<SelectGroupPropsType> = ({
  height = '30px',
  name,
  onChange,
  options,
  placeholder,
  value,
  width = '100%',
}) => {
  return (
    <div className="flex column flex-1">
      <p className="fsize-3">{placeholder}</p>
      <select
        name={name}
        className="select-main text-primary radius-2 roboto border-box"
        style={{ height: height, width: width, border: 'none' }}
        value={value}
        onChange={onChange}
      >
        {options.map((el) => (
          <option key={uuidv4()} value={el.value} hidden={el.isHidden}>
            {el.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroup;
