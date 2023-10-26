import { useContext } from "react";
import axios from "axios";

import AuthContext from "../shared/context/AuthContext";
import { IUserInfo } from "../shared/interfaces/context";

const AxiosClient = () => {
  const { login, logout, userInfo } = useContext(AuthContext);

  const AxiosClient = axios.create({
    baseURL: "http://localhost:5030",
    headers: {
      "Content-Type": "application/json",
    },
  });

  AxiosClient.interceptors.request.use((request) => {
    if (userInfo.token)
      request.headers.Authorization = `Bearer ${userInfo.token}`;

    return request;
  });

  AxiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        const response = await axios.post<IUserInfo>("/refresh-token", {
          refreshToken: userInfo.refreshToken,
        });

        login(response.data);

        return axios(error.request);
      }

      // Add logout

      return Promise.reject(error);
    }
  );

  return AxiosClient;
};

export default AxiosClient;
