import "./Button.scss";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary-light" | "primary-dark" | "success" | "danger";
  width?: number;
}

function Button({ children, onClick, variant, width }: Props) {
  const buttonClassName = `${
    variant || "primary-light"
  } button-main cursor-pointer roboto radius-1`;

  return (
    <div
      onClick={onClick}
      className={buttonClassName}
      style={{ width: `${width || 70}px` }}
    >
      {children}
    </div>
  );
}

export default Button;
