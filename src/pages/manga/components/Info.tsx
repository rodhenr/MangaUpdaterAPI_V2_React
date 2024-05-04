import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import '../styles/Info.scss';

type InfoPropsType = {
  description: string;
  header: string;
  icon: IconProp;
};

const Info: React.FC<InfoPropsType> = ({ description, icon, header }) => {
  const { themeMode } = useContext(ThemeContext);
  const windowWidth = useGetWindowWidth();

  return (
    <div
      className={`info-main flex align-center gap-4 radius-2 border-box roboto ${
        themeMode === 'light' ? 'primary-light' : 'primary-dark'
      } ${windowWidth > 800 ? 'w-100' : 'flex-1'}`}
    >
      <div
        className="flex-center bg-light radius-2"
        style={{
          height: windowWidth > 800 ? 40 : 30,
          width: windowWidth > 800 ? 40 : 30,
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          className={windowWidth > 800 ? 'fsize-5' : 'fsize-4'}
          style={{ color: '#454444' }}
        />
      </div>
      <div className="flex column flex-1">
        {windowWidth > 800 && <p className="fsize-4">{header}</p>}
        <p className={`bold ${windowWidth > 800 ? 'fsize-5' : 'fsize-4'}`}>{description}</p>
      </div>
    </div>
  );
};

export default Info;
