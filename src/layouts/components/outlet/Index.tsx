import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeContext from '../../../context/ThemeContext';

const LayoutOutlet = () => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className={`flex-1 w-100 roboto ${themeMode === 'light' ? 'bg-light' : 'bg-dark'}`}>
      <div className="outlet-main flex-1 roboto">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutOutlet;
