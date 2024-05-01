import { useContext } from 'react';
import ThemeButton from '../../../components/theme/ThemeButton';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';
import ThemeContext from '../../../shared/context/ThemeContext';
import AuthGroup from '../auth/Index';
import PageGroup from '../pages/Index';

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
