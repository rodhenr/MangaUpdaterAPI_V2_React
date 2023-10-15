import "./Avatar.scss";

interface Props {
  color: "text-primary" | "text-secondary";
  imagePath?: string;
  showUserName?: boolean;
  size?: number;
  userName: string;
}

function Avatar({
  color,
  imagePath,
  showUserName = true,
  size = 40,
  userName,
}: Props) {
  return (
    <div className="avatar-main flex-center gap-3 roboto border-box">
      {showUserName && <p className={color}>{userName}</p>}
      {imagePath ? (
        <img src={imagePath ?? ""} alt="avatar" />
      ) : (
        <div
          className={`flex-center round primary-light cursor-pointer ${
            color == "text-primary" ? "bg-dark" : "bg-light"
          }`}
          style={{ height: size, width: size }}
        >
          {userName.charAt(0)}
        </div>
      )}
    </div>
  );
}

export default Avatar;
