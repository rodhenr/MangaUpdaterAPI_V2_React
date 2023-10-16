import { ReactNode, useState } from "react";

import AuthContext from "./AuthContext";
import ThemeContext from "./ThemeContext";
import { ThemeMode, UserInfo } from "../interfaces/context";

interface Props {
  children: ReactNode;
}

const defaultUserInfo = {
  avatar: null,
  username: null,
  token: null,
};

const ContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

  const loginHandle = (loginInfo: UserInfo) => setUserInfo(loginInfo);
  const logoutHandle = () => setUserInfo(defaultUserInfo);

  return (
    <ThemeContext.Provider
      value={{ themeMode: theme, toggleThemeMode: setTheme }}
    >
      <AuthContext.Provider
        value={{ userInfo: userInfo, login: loginHandle, logout: logoutHandle }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
