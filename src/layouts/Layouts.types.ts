export type ApiErrorType = {
  errors: Error;
  status: number;
  title: string;
  traceId: string;
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