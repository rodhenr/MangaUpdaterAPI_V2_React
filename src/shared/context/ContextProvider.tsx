import { ReactNode, useState } from "react";
import { AxiosResponse } from "axios";

import { axios } from "../../lib/axios";
import AuthContext from "./AuthContext";
import ThemeContext from "./ThemeContext";
import { ThemeMode } from "../interfaces/context";
import { AuthResponse, IDefaultUserInfo, ILogin } from "../interfaces/auth";
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

  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkTheme", true);
  const [localStorageUserInfo, setLocalStorageUserInfo] = useLocalStorage(
    "userInfo",
    defaultUserInfo
  );

  const loginHandle = async (loginData: ILogin) => {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      "/api/auth/login",
      loginData
    );

    const responseInfo = {
      avatar: response.data.userAvatar,
      username: response.data.userName,
      token: response.data.accessToken,
    };

    setLocalStorageUserInfo(responseInfo);
  };

  const logoutHandle = () => {
    setLocalStorageUserInfo(defaultUserInfo);
  };

  return (
    <ThemeContext.Provider
      value={{ themeMode: theme, toggleThemeMode: setTheme }}
    >
      <AuthContext.Provider
        value={{
          userInfo: localStorageUserInfo,
          login: loginHandle,
          logout: logoutHandle,
        }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
