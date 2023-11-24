import { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import {
  InputTypes,
  SizeProps,
  Variant,
} from "../../shared/interfaces/components";

import "./Input.scss";

interface Props extends SizeProps {
  icon?: string;
  iconSide?: "left" | "right";
  id: string;
  minLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: InputTypes;
  value: string | number | null;
  variant?: Variant;
}

function Input({
  height = "35px",
  icon,
  iconSide = "left",
  id,
  minLength = 30,
  onChange,
  placeholder,
  type = "text",
  value,
  variant = "primary-light",
  width = "100%",
}: Props) {
  return (
    <div
      className={`input-main flex align-center radius-1 ${variant} border-box p-2`}
      style={{ height: height, width: width }}
    >
      {icon && iconSide == "left" && (
        <FontAwesomeIcon icon={icon as IconProp} className="h-100 w-icon" />
      )}
      <input
        className={`${variant} h-100 radius-1 w-100 p-2 border-box opacity-placeholder-1 border-box`}
        id={id}
        minLength={minLength}
        name={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value ?? ""}
      />
      {icon && iconSide == "right" && (
        <FontAwesomeIcon icon={icon as IconProp} className="h-100 w-icon" />
      )}
    </div>
  );
}

export default Input;
