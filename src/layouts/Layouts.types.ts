export type ApiErrorType = {
  errors: Error;
  status: number;
  title: string;
  traceId: string;
  detail?: string;
  type: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type UserProfileType = {
  avatar: string;
  email: string;
  id: string;
  name: string
}

export type ProblemDetailsType = {
  type: string;
  title: string;
  status: number;
  errors?: {
    [key: string]: string[]
  },
  detail?: string,
  traceId?: string
}

export type ProfileDataType = {
  profileEmail: string;
  profilePassword: string;
  profileConfirmPassword: string;
}

export type RegisterDataType = {
  username: string;
  registerEmail: string;
  registerPassword: string;
  confirmationPassword: string;
};