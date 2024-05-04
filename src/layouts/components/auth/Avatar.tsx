import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import ThemeContext from '../../../context/ThemeContext';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';

type AvatarPropsType = {
  color: 'text-primary' | 'text-secondary';
  imagePath?: string;
  onClick: () => void;
  showUserName?: boolean;
  size?: number;
  userName: string;
};

const Avatar: React.FC<AvatarPropsType> = (props) => {
  const authContext = useContext(AuthContext);
  const { themeMode } = useContext(ThemeContext);
  const windowWidth = useGetWindowWidth();

  return (
    <div className="avatar-main flex-center gap-3 roboto border-box roboto">
      {windowWidth > 900 && (
        <div className="flex column align-end">
          {props.showUserName && <p className={props.color}>{props.userName}</p>}
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
      {props.imagePath ? (
        <img src={props.imagePath ?? ''} alt="avatar" onClick={() => props.onClick()} />
      ) : (
        <div
          className={`flex-center round primary-light cursor-pointer ${
            props.color == 'text-primary' ? 'bg-dark' : 'bg-light'
          }`}
          style={{ height: props.size, width: props.size }}
          onClick={() => props.onClick()}
        >
          {props.userName.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
