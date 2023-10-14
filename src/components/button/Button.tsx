enum ButtonVariant {
  PrimaryLight = "primary-light",
  PrimaryDark = "primary-dark",
  Success = "success",
  Danger = "danger",
}

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
}

function Button({ children, onClick, variant }: Props) {
  const buttonClassName = `btn btn-${variant || ButtonVariant.PrimaryLight}`;

  return (
    <div onClick={onClick} className={buttonClassName}>
      {children}
    </div>
  );
}

export default Button;
