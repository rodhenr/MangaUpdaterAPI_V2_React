import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Button.scss";

interface Props {
  fontSize?: "fsize-1" | "fsize-2" | "fsize-3" | "fsize-4";
  onClick: () => void;
  height?: number;
  icon?: string;
  text: string;
  variant?: "primary-light" | "primary-dark" | "success" | "danger";
  width?: number;
}

function Button({
  fontSize = "fsize-4",
  height = 30,
  icon,
  onClick,
  text,
  variant = "primary-light",
  width = 70,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`button-main ${variant} radius-1 flex-center cursor-pointer roboto`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <p className={`flex-center w-100 h-100 ${fontSize}`}>{text}</p>
      {icon && (
        <div className="flex-center gap-2 h-100">
          <div
            className="bg-light h-100"
            style={{ opacity: 0.5, width: 1 }}
          ></div>
          <FontAwesomeIcon icon={icon} className="h-100 w-icon" />
        </div>
      )}
    </div>
  );
}

export default Button;
