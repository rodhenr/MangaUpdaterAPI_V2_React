import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import {
  FontSize,
  SizeProps,
  Variant,
} from "../../shared/interfaces/components";

import "./Button.scss";

interface Props extends SizeProps {
  fontSize?: FontSize;
  icon?: string;
  iconWidth?: string;
  onClick?: () => void;
  text: string;
  useHover?: boolean;
  variant?: Variant;
}

function Button({
  fontSize = "fsize-4",
  height = "30px",
  icon,
  iconWidth = "20px",
  onClick = () => null,
  text,
  useHover = false,
  variant = "primary-light",
  width = "100%",
}: Props) {
  return (
    <div
      className={`button-main ${variant} ${
        useHover ? `${variant}-hover` : ""
      } radius-1 flex-center cursor-pointer roboto border-box text-center`}
      onClick={onClick}
      style={{ height: height, width: width }}
    >
      <p className={`flex-center w-100 h-100 ${fontSize}`}>{text}</p>
      {icon && (
        <div className="flex-center gap-2 h-100">
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
