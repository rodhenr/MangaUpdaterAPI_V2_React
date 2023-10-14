import "./Avatar.scss";

interface Props {
  color: "text-primary" | "text-secondary";
  height?: number;
  imagePath?: string;
  showUserName?: boolean;
  userName: string;
  width?: number;
}

function Avatar({
  color,
  height = 40,
  imagePath,
  showUserName = true,
  userName,
  width = 40,
}: Props) {
  return (
    <div className="avatar-main flex-center gap-3 roboto">
      {showUserName && <p className={color}>{userName}</p>}
      {imagePath ? (
        <img src={imagePath ?? ""} alt="avatar" />
      ) : (
        <div
          className="flex-center round primary-light cursor-pointer"
          style={{ height: height, width: width }}
        >
          {userName.charAt(0)}
        </div>
      )}
    </div>
  );
}

export default Avatar;
