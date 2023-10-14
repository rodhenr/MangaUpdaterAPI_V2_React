import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Input.scss";
import { ChangeEvent, useState } from "react";

interface Props {
  height?: number;
  icon?: string;
  iconSide: "left" | "right";
  onSubmit: () => void;
  placeholder: string;
  variant?:
    | "primary-light"
    | "primary-dark"
    | "success"
    | "danger"
    | "bg-light"
    | "bg-dark";
  width?: number;
}

function Input({
  height = 40,
  icon,
  iconSide,
  onSubmit,
  placeholder,
  variant = "primary-light",
  width = 200,
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div
      className={`input-main flex align-center radius-2 ${variant}`}
      style={{ height: height, width: width }}
    >
      {icon && iconSide == "left" && (
        <FontAwesomeIcon icon={icon} className="h-100 w-icon" />
      )}
      <input
        className={`${variant} h-100 radius-2 w-100`}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {icon && iconSide == "right" && (
        <FontAwesomeIcon icon={icon} className="h-100 w-icon" />
      )}
    </div>
  );
}

export default Input;
