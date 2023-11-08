import { useContext } from "react";

import AuthContext from "../../shared/context/AuthContext";
import ThemeContext from "../../shared/context/ThemeContext";
import useGetWindowWidth from "../../hooks/useGetWindowWidth";

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
  const authContext = useContext(AuthContext);
  const { themeMode } = useContext(ThemeContext);
  const windowWidth = useGetWindowWidth();

  return (
    <div className="avatar-main flex-center gap-3 roboto border-box roboto">
      {windowWidth > 900 && (
        <div className="flex column align-end">
          {showUserName && <p className={color}>{userName}</p>}
          <span
            className={`fsize-3 cursor-pointer ${
              themeMode === "light"
                ? "text-hover-secondary-dark"
                : "text-hover-secondary-light"
            }`}
            onClick={authContext.logout}
          >
            Logout
          </span>
        </div>
      )}
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
