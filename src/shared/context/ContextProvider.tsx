import { ReactNode, useState } from "react";

import AuthContext from "./AuthContext";
import { queryClient } from "../../lib/query-client";
import ThemeContext from "./ThemeContext";
import { IUserInfo, ThemeMode } from "../interfaces/context";
import { IDefaultUserInfo } from "../interfaces/auth";
import useLocalStorage from "../../hooks/useLocalStorage";

interface Props {
  children: ReactNode;
}

const defaultUserInfo: IDefaultUserInfo = {
  avatar: null,
  username: null,
  token: null,
};

const ContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  //const [isDarkMode, setIsDarkMode] = useLocalStorage("darkTheme", true);
  const [localStorageUserInfo, setLocalStorageUserInfo] = useLocalStorage(
    "userInfo",
    defaultUserInfo
  );

  const handleUserLogin = (loginInfo: IUserInfo) => {
    setLocalStorageUserInfo(loginInfo);
    window.location.reload();
  };

  const logoutHandle = () => {
    setLocalStorageUserInfo(defaultUserInfo);
    queryClient.invalidateQueries({ queryKey: ["homeData", "mangaData"] });
    window.location.reload();
  };

  return (
    <ThemeContext.Provider
      value={{ themeMode: theme, toggleThemeMode: setTheme }}
    >
      <AuthContext.Provider
        value={{
          userInfo: localStorageUserInfo,
          login: handleUserLogin,
          logout: logoutHandle,
        }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
