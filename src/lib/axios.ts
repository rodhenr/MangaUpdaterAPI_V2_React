import { useContext } from "react";
import axios, { AxiosResponse } from "axios";

import AuthContext from "../shared/context/AuthContext";
import { AuthResponse } from "../shared/interfaces/auth";

const AxiosClient = () => {
  const authContext = useContext(AuthContext);

  const AxiosInstance = axios.create({
    baseURL: "https://localhost:7120",
    headers: {
      "Content-Type": "application/json",
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
          const result = await axios.post<AuthResponse>(
            "https://localhost:7120/api/auth/refresh",
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
            username: result.data.userName,
            isAdmin: result.data.isAdmin,
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
