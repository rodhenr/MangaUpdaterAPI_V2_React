import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import Avatar from './Avatar';
import Buttons from './Buttons';

type AuthGroupPropsType = {
  changeLoginModalState: () => void;
  changeProfileModalState: () => void;
  changeRegisterModalState: () => void;
};

const AuthGroup: React.FC<AuthGroupPropsType> = ({
  changeLoginModalState,
  changeProfileModalState,
  changeRegisterModalState,
}) => {
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext.userInfo.token ? (
        <Avatar
          color="text-secondary"
          imagePath={authContext.userInfo.avatar ?? ''}
          onClick={changeProfileModalState}
          userName={authContext.userInfo.username ?? ''}
        />
      ) : (
        <Buttons
          changeLoginModalState={changeLoginModalState}
          changeRegisterModalState={changeRegisterModalState}
        />
      )}
    </>
  );
};

export default AuthGroup;
