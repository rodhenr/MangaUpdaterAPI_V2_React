import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import {
  FontSize,
  SizeProps,
  Variant,
} from "../../shared/interfaces/components";

import "./Button.scss";

interface Props extends SizeProps {
  disabled?: boolean;
  fontSize?: FontSize;
  icon?: string | null;
  iconWidth?: string;
  onClick?: () => void;
  onClickIcon?: () => void;
  text: string;
  useHover?: boolean;
  variant?: Variant;
}

function Button({
  disabled = false,
  fontSize = "fsize-4",
  height = "30px",
  icon = null,
  iconWidth = "20px",
  onClick = () => null,
  onClickIcon = () => null,
  text,
  useHover = false,
  variant = "primary-light",
  width = "100%",
}: Props) {
  return (
    <div
      className={`${variant} ${
        useHover ? `${variant}-hover` : ""
      } radius-1 flex-center roboto border-box text-center ${
        !disabled && "cursor-pointer"
      }`}
      style={{ height: height, width: width }}
    >
      <p
        className={`flex-center w-100 h-100 ${fontSize} p-2`}
        onClick={onClick}
      >
        {text}
      </p>
      {icon && (
        <div className="flex-center gap-2 h-100 p-2" onClick={onClickIcon}>
          <div className="bg-light h-100 opacity-2" style={{ width: 1 }}></div>
          <FontAwesomeIcon
            icon={icon as IconProp}
            className="h-100 p-1"
            style={{ width: iconWidth }}
          />
        </div>
      )}
    </div>
  );
}

export default Button;
