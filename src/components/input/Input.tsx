import { ChangeEvent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import {
  InputTypes,
  SizeProps,
  Variant,
} from "../../shared/interfaces/components";

import "./Input.scss";

interface Props extends SizeProps {
  disabled?: boolean;
  icon?: string;
  iconFn?: () => void;
  iconSide?: "left" | "right";
  iconText?: string;
  id: string;
  minLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: InputTypes;
  value: string | number | null;
  variant?: Variant;
}

function Input({
  disabled = false,
  height = "35px",
  icon,
  iconFn,
  iconText,
  iconSide = "left",
  id,
  minLength = 30,
  onChange,
  onKeyDown,
  placeholder,
  type = "text",
  value,
  variant = "primary-light",
  width = "100%",
}: Props) {
  return (
    <div
      className={`input-main flex align-center radius-1 ${
        disabled ? `bg-disabled-light` : variant
      } border-box p-2`}
      style={{ height: height, width: width }}
    >
      {icon && iconSide == "left" && (
        <FontAwesomeIcon
          icon={icon as IconProp}
          className="h-100 w-icon"
          onClick={iconFn}
          title={iconText}
          style={iconText ? { cursor: "pointer" } : {}}
        />
      )}
      <input
        className={`${
          disabled ? `bg-disabled-light` : variant
        } h-100 radius-1 w-100 p-2 border-box opacity-placeholder-1 border-box`}
        disabled={disabled}
        id={id}
        minLength={minLength}
        name={id}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        type={type}
        value={value ?? ""}
      />
      {icon && iconSide == "right" && (
        <FontAwesomeIcon
          icon={icon as IconProp}
          className="h-100 w-icon"
          onClick={iconFn}
          cursor="pointer"
        />
      )}
    </div>
  );
}

export default Input;
