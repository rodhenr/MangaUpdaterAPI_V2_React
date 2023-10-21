import { useContext } from "react";

import Avatar from "../../components/avatar/Avatar";
import Button from "../../components/button/Button";
import AuthContext from "../../shared/context/AuthContext";

interface Props {
  changeLoginModalState: () => void;
  changeRegisterModalState: () => void;
}

function AuthGroup({ changeLoginModalState, changeRegisterModalState }: Props) {
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext.userInfo.token ? (
        <Avatar
          color="text-secondary"
          imagePath={authContext.userInfo.avatar ?? ""}
          userName={authContext.userInfo.username ?? ""}
        />
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={changeLoginModalState}
            text="Login"
            useHover={true}
            variant="secondary-dark"
            width="100px"
          />
          <Button
            onClick={changeRegisterModalState}
            text="Register"
            variant="secondary-light"
            useHover={true}
            width="100px"
          />
        </div>
      )}
    </>
  );
}

export default AuthGroup;
