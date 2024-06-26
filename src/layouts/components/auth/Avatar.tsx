import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import ThemeContext from '../../../context/ThemeContext';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';

type AvatarPropsType = {
  color: 'text-primary' | 'text-secondary';
  imagePath?: string;
  changeProfileModalState: () => void;
  showUserName?: boolean;
  size?: number;
  userName: string;
};

const Avatar: React.FC<AvatarPropsType> = ({
  color,
  imagePath,
  changeProfileModalState,
  showUserName = true,
  size = 40,
  userName,
}) => {
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
              themeMode === 'light' ? 'text-hover-secondary-dark' : 'text-hover-secondary-light'
            }`}
            onClick={authContext.logout}
          >
            Logout
          </span>
        </div>
      )}
      {imagePath ? (
        <img src={imagePath ?? ''} alt="avatar" onClick={() => changeProfileModalState()} />
      ) : (
        <div
          className={`flex-center round primary-light cursor-pointer ${
            color == 'text-primary' ? 'bg-dark' : 'bg-light'
          }`}
          style={{ height: size, width: size }}
          onClick={() => changeProfileModalState()}
        >
          {userName.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
