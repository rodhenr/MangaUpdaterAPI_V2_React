import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Variant } from "../../shared/interfaces/components";

interface Props {
  height?: string;
  message: string;
  onClose: () => void;
  width?: string;
  variant?: Variant;
}

function Alert({
  height = "20px",
  message,
  onClose,
  width = "fit-content",
  variant = "primary-light",
}: Props) {
  return (
    <div
      className={`flex-center space-between absolute p-4 radius-2 ${variant}`}
      style={{
        height: height,
        left: "50%",
        opacity: 0.9,
        transform: "translate(-50%, 0%)",
        width: width,
      }}
    >
      <p>{message}</p>
      <FontAwesomeIcon
        className="fsize-5 cursor-pointer hover-opacity-1"
        icon="circle-xmark"
        onClick={onClose}
      />
    </div>
  );
}

export default Alert;
