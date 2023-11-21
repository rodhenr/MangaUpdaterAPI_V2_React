export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  themeMode: ThemeMode;
  toggleThemeMode: (theme: ThemeMode) => void;
}

export interface IUserInfo {
  avatar: string | null;
  username: string | null;
  token: string | null;
  refreshToken: string | null;
  isAdmin: boolean | null;
}

export interface AuthContextType {
  userInfo: IUserInfo;
  login: (loginInfo: IUserInfo) => void;
  logout: () => void;
}

export interface LoadingContextType {
  isLoading: boolean;
  changeLoadingState: () => void;
}
