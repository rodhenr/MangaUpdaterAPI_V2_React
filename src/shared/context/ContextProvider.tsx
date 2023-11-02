import { ReactNode, useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import { queryClient } from "../../lib/query-client";
import ThemeContext from "./ThemeContext";
import { IUserInfo, ThemeMode } from "../interfaces/context";
import useLocalStorage from "../../hooks/useLocalStorage";
import useReadFromLocalStorage from "../../hooks/useReadFromLocalStorage";

interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const defaultUserInfo = useReadFromLocalStorage<IUserInfo>("userInfo") ?? {
    avatar: null,
    username: null,
    token: null,
    refreshToken: null,
  };

  const [theme, setTheme] = useState<ThemeMode>("dark");
  //const [isDarkMode, setIsDarkMode] = useLocalStorage("darkTheme", true);
  const [localStorageUserInfo, setLocalStorageUserInfo] = useLocalStorage(
    "userInfo",
    defaultUserInfo
  );

  useEffect(() => {}, [localStorageUserInfo]);

  const handleUserLogin = (loginInfo: IUserInfo) => {
    setLocalStorageUserInfo(loginInfo);
  };

  const logoutHandle = () => {
    setLocalStorageUserInfo({
      avatar: null,
      username: null,
      token: null,
      refreshToken: null,
    });

    queryClient.invalidateQueries();

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
