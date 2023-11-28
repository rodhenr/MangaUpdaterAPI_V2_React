import { useContext } from "react";

import AuthContext from "../../shared/context/AuthContext";

import Avatar from "../../components/avatar/Avatar";
import Button from "../../components/button/Button";
import useGetWindowWidth from "../../hooks/useGetWindowWidth";

interface Props {
  changeLoginModalState: () => void;
  changeProfileModalState: () => void;
  changeRegisterModalState: () => void;
}

function AuthGroup({
  changeLoginModalState,
  changeProfileModalState,
  changeRegisterModalState,
}: Props) {
  const authContext = useContext(AuthContext);
  const windowWidth = useGetWindowWidth();

  return (
    <>
      {authContext.userInfo.token ? (
        <Avatar
          color="text-secondary"
          imagePath={authContext.userInfo.avatar ?? ""}
          onClick={changeProfileModalState}
          userName={authContext.userInfo.username ?? ""}
        />
      ) : (
        <div className={`flex gap-2 ${windowWidth > 600 ? "row" : "column"}`}>
          <Button
            height={windowWidth > 600 ? "30px" : "25px"}
            onClick={changeLoginModalState}
            text="Login"
            useHover={true}
            variant="secondary-light"
            width={windowWidth > 600 ? "100px" : "70px"}
          />
          <Button
            height={windowWidth > 600 ? "30px" : "25px"}
            onClick={changeRegisterModalState}
            text="Register"
            variant="primary-light"
            useHover={true}
            width={windowWidth > 600 ? "100px" : "70px"}
          />
        </div>
      )}
    </>
  );
}

export default AuthGroup;
