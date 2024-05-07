import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import notFoundSvg from '../../assets/not-found.svg';
import Button from '../../components/button/Button';
import ThemeContext from '../../context/ThemeContext';

const PageNotFound = () => {
  const { themeMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/`);
  };

  return (
    <div
      className={`flex column flex-1 h-100 w-100 justify-center align-center roboto gap-4 ${
        themeMode === 'light' ? 'primary-light' : 'bg-menu-dark'
      }`}
    >
      <img
        src={notFoundSvg}
        alt="Page not found"
        style={{
          maxHeight: 400,
          borderRadius: '50%',
          backgroundColor: 'white',
        }}
      />
      <div className="flex column gap-5 align-center">
        <div className="flex column align-center gap-1">
          <p className="font-bold" style={{ fontSize: '3rem' }}>
            PAGE NOT FOUND
          </p>
          <p>We couldn't find the page you were looking for.</p>
        </div>
        <Button
          text="Go Back Home"
          useHover={true}
          width="175px"
          padding={'p-4'}
          onClick={handleNavigate}
          variant="secondary-light"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
