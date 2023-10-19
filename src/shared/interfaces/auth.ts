export interface AuthResponse {
  userName: string;
  userAvatar: string;
  accessToken: string;
  refreshToken: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IDefaultUserInfo {
  avatar: string | null;
  username: string | null;
  token: string | null;
}