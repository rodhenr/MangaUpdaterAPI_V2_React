export interface AuthResponse {
  userName: string;
  userAvatar: string;
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  username: string;
  registerEmail: string;
  registerPassword: string;
  confirmationPassword: string;
}

export interface IDefaultUserInfo {
  avatar: string | null;
  username: string | null;
  token: string | null;
  refreshToken: string | null;
  isAdmin: boolean;
}

type Error = {
  [key: string]: string[];
};

export interface IApiError {
  errors: Error;
  status: number;
  title: string;
  traceId: string;
  type: string;
}
