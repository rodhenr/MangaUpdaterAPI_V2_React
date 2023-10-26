export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  themeMode: ThemeMode;
  toggleThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

export interface IUserInfo {
  avatar: string | null;
  username: string | null;
  token: string | null;
  refreshToken: string | null;
}

export interface AuthContextType {
  userInfo: IUserInfo;
  login: (loginInfo: IUserInfo) => void;
  logout: () => void;
}
