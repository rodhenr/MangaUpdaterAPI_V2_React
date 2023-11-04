import { ReactNode, useEffect, useState } from "react";

import { queryClient } from "../../lib/query-client";

import AuthContext from "./AuthContext";
import ThemeContext from "./ThemeContext";

import { IUserInfo, ThemeMode } from "../interfaces/context";

import useLocalStorage from "../../hooks/useLocalStorage";
import useReadFromLocalStorage from "../../hooks/useReadFromLocalStorage";
import LoadingContext from "./LoadingContext";

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

  const [loading, setLoading] = useState<boolean>(false);

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

  const handleLoadingStateChange = () => {
    setLoading((prev) => !prev);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading: loading,
        changeLoadingState: handleLoadingStateChange,
      }}
    >
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
    </LoadingContext.Provider>
  );
};

export default ContextProvider;
