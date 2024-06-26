import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';

const ThemeButton = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      className={`flex-center ${
        themeContext.themeMode === 'light'
          ? 'secondary-dark secondary-dark-hover'
          : 'bg-light bg-light-hover'
      } color-primary p-1 border-box round cursor-pointer`}
      onClick={() =>
        themeContext.toggleThemeMode(themeContext.themeMode === 'light' ? 'dark' : 'light')
      }
      style={{ height: '22px', width: '22px' }}
    >
      <FontAwesomeIcon
        className="fsize-"
        icon={themeContext.themeMode === 'dark' ? ('moon' as IconProp) : ('sun' as IconProp)}
      />
    </div>
  );
};

export default ThemeButton;
