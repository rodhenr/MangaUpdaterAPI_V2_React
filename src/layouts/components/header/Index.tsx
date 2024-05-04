import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import AuthGroup from '../auth/Index';
import PageGroup from '../pages/Index';
import ThemeButton from './ThemeButton';

type Props = {
  changeLoginModalState: () => void;
  changeProfileModalState: () => void;
  changeRegisterModalState: () => void;
};

const Header = ({
  changeLoginModalState,
  changeProfileModalState,
  changeRegisterModalState,
}: Props) => {
  const { themeMode } = useContext(ThemeContext);
  const windowWidth = useGetWindowWidth();

  return (
    <div className={`roboto ${themeMode === 'light' ? 'primary-light' : 'bg-menu-dark'}`}>
      <div className="root-main flex align-center">
        <h2>MANGA UPDATER</h2>
        <PageGroup />
        <div className="flex-center gap-4">
          {windowWidth > 900 && <ThemeButton />}
          <AuthGroup
            changeLoginModalState={changeLoginModalState}
            changeRegisterModalState={changeRegisterModalState}
            changeProfileModalState={changeProfileModalState}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
