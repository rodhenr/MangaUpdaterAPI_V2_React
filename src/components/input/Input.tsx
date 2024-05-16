import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, KeyboardEvent } from 'react';
import { InputType, SizePropsType, VariantType } from '../Components.types';
import './Input.scss';

type Props = {
  disabled?: boolean;
  icon?: string;
  iconFn?: () => void;
  iconSide?: 'left' | 'right';
  iconText?: string;
  id: string;
  minLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: InputType;
  value: string | number | null;
  variant?: VariantType;
};

type InputPropsType = Props & SizePropsType;

const Input: React.FC<InputPropsType> = ({
  disabled = false,
  height = '35px',
  icon,
  iconFn,
  iconText,
  iconSide = 'left',
  id,
  minLength = 30,
  onChange,
  onKeyDown,
  placeholder,
  type = 'text',
  value,
  variant = 'primary-light',
  width = '100%',
}) => {
  return (
    <div
      className={`input-main flex align-center radius-1 ${
        disabled ? `bg-disabled-light` : variant
      } border-box p-2`}
      style={{ height: height, width: width }}
    >
      {icon && iconSide == 'left' && (
        <FontAwesomeIcon
          icon={icon as IconProp}
          className="h-100 w-icon"
          onClick={iconFn}
          title={iconText}
          style={iconText ? { cursor: 'pointer' } : {}}
        />
      )}
      <input
        className={`${
          disabled ? `bg-disabled-light` : variant
        } h-100 radius-1 w-100 p-2 border-box border-box`}
        disabled={disabled}
        id={id}
        minLength={minLength}
        name={id}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        type={type}
        value={value ?? ''}
      />
      {icon && iconSide == 'right' && (
        <FontAwesomeIcon
          icon={icon as IconProp}
          className="h-100 w-icon"
          onClick={iconFn}
          cursor="pointer"
        />
      )}
    </div>
  );
};

export default Input;
