import { ChangeEvent, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SelectStateType, VariantType } from '../../../components/Components.types';
import ThemeContext from '../../../context/ThemeContext';
import '../styles/SelectGroup.scss';

type SelectGroupPropsType = {
  height?: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectStateType[];
  placeholder: string;
  value: string;
  width?: string;
  lightVariant?: VariantType;
};

const SelectGroup: React.FC<SelectGroupPropsType> = ({
  height = '30px',
  name,
  onChange,
  options,
  placeholder,
  value,
  width = '100%',
  lightVariant,
}) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="flex column flex-1 roboto gap-1">
      <p className="fsize-4">{placeholder}</p>
      <select
        name={name}
        className={`select-main radius-2 roboto border-box ${
          themeMode === 'light' ? lightVariant ?? 'primary-light' : 'bg-light'
        }`}
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
