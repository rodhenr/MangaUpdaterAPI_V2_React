import axios, { AxiosResponse } from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export type AuthResponseType = {
  userName: string;
  userAvatar: string;
  accessToken: string;
  refreshToken: string;
}

const AxiosClient = () => {
  const authContext = useContext(AuthContext);

  const AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  });

  AxiosInstance.interceptors.request.use((request) => {
    if (!request.headers?.Authorization && authContext.userInfo.token)
      request.headers.Authorization = `Bearer ${authContext.userInfo.token}`;

    return request;
  });

  AxiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (
        error.response?.status === 401 &&
        !error.config?.headers["NO_RETRY_HEADER"] &&
        authContext.userInfo.refreshToken
      ) {
        const config = error?.config;

        try {
          const result = await axios.post<AuthResponseType>(
            "http://localhost:8080/api/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${authContext.userInfo.refreshToken}`,
              },
            }
          );

          authContext.login({
            avatar: result.data.userAvatar,
            token: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            username: result.data.userName
          });

          config.headers.Authorization = `Bearer ${result.data.accessToken}`;
        } catch (err) {
          authContext.logout();
        }

        config.headers["NO_RETRY_HEADER"] = "true";
        return AxiosInstance(config);
      }
      
      return Promise.reject(error);
    }
  );

  return AxiosInstance;
};

export default AxiosClient;
