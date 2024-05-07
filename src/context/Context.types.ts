export type ThemeModeType = "light" | "dark";

export type ThemeContextType = {
  themeMode: ThemeModeType;
  toggleThemeMode: (theme: ThemeModeType) => void;
}

export type UserInfoType = {
  avatar: string | null;
  username: string | null;
  token: string | null;
  refreshToken: string | null
}

export type AuthContextType = {
  userInfo: UserInfoType;
  login: (loginInfo: UserInfoType) => void;
  logout: () => void;
}

export type LoadingContextType = {
  isLoading: boolean;
  changeLoadingState: () => void;
}
