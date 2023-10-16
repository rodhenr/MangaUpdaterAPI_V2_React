export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  themeMode: ThemeMode;
  toggleThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

export interface UserInfo {
  avatar: string | null;
  username: string | null;
  token: string | null;
}

export interface AuthContextType {
  userInfo: UserInfo;
  login: (loginInfo: UserInfo) => void;
  logout: () => void;
}
