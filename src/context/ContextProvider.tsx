import { ReactNode, useEffect, useState } from 'react';
import { queryClient } from '../api/query-client';
import useLocalStorage from '../hooks/useLocalStorage';
import useReadFromLocalStorage from '../hooks/useReadFromLocalStorage';
import AuthContext from './AuthContext';
import { ThemeModeType, UserInfoType } from './Context.types';
import LoadingContext from './LoadingContext';
import ThemeContext from './ThemeContext';

type ContextProviderPropsType = {
  children: ReactNode;
};

const ContextProvider: React.FC<ContextProviderPropsType> = ({ children }) => {
  const defaultUserInfo = useReadFromLocalStorage<UserInfoType>('userInfo') ?? {
    avatar: null,
    username: null,
    token: null,
    refreshToken: null,
  };
  const defaultTheme = useReadFromLocalStorage<ThemeModeType>('theme') ?? 'light';

  const [theme, setTheme] = useLocalStorage<ThemeModeType>('theme', defaultTheme);
  const [localStorageUserInfo, setLocalStorageUserInfo] = useLocalStorage(
    'userInfo',
    defaultUserInfo
  );

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, [defaultTheme]);
  useEffect(() => {}, [localStorageUserInfo]);

  const handleUserLogin = (loginInfo: UserInfoType) => {
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

  const toggleThemeMode = (theme: ThemeModeType) => {
    setTheme(theme);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading: loading,
        changeLoadingState: handleLoadingStateChange,
      }}
    >
      <ThemeContext.Provider value={{ themeMode: theme, toggleThemeMode: toggleThemeMode }}>
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
