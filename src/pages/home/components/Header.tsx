import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import PageHeader from '../../../components/pageHeader/PageHeader';
import ThemeContext from '../../../context/ThemeContext';

type HeaderPropsType = {
  isCardView: boolean;
  setIsCardView: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderPropsType> = ({ isCardView, setIsCardView }) => {
  const { themeMode } = useContext(ThemeContext);

  return (
    <div className="w-100">
      <PageHeader>
        <div className="pageHeader-main flex w-100 align-end">
          <p className="fsize-5">Updates</p>
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon="bars"
              className={`fsize-5 ${
                isCardView
                  ? 'text-disabled'
                  : themeMode === 'light'
                  ? 'cursor-pointer text-secondary-dark'
                  : 'cursor-pointer text-secondary-light'
              }`}
              onClick={() => setIsCardView(true)}
            />
            <FontAwesomeIcon
              icon="list"
              className={`fsize-5 ${
                isCardView
                  ? themeMode === 'light'
                    ? 'cursor-pointer text-secondary-dark'
                    : 'cursor-pointer text-secondary-light'
                  : 'text-disabled'
              }`}
              onClick={() => setIsCardView(false)}
            />
          </div>
        </div>
      </PageHeader>
    </div>
  );
};

export default Header;
