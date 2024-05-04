import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import Avatar from './Avatar';
import Buttons from './Buttons';

type Props = {
  changeLoginModalState: () => void;
  changeProfileModalState: () => void;
  changeRegisterModalState: () => void;
};

const AuthGroup = ({
  changeLoginModalState,
  changeProfileModalState,
  changeRegisterModalState,
}: Props) => {
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
