import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Button.scss";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  height?: number;
  icon?: string;
  variant?: "primary-light" | "primary-dark" | "success" | "danger";
  width?: number;
}

function Button({
  children,
  height = 30,
  icon,
  onClick,
  variant = "primary-light",
  width = 70,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`button-main ${variant} radius-1 flex-center cursor-pointer roboto`}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div className={`flex-center w-100 h-100 `}>{children}</div>
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
