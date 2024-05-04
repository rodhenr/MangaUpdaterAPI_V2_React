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
