import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import AxiosClient from "../../../lib/axios";
import { queryClient } from "../../../lib/query-client";

import { AuthResponse, ILogin } from "../../../shared/interfaces/auth";
import AuthContext from "../../../shared/context/AuthContext";

export const useLoginMutation = () => {
  const authContext = useContext(AuthContext);
  const axios = AxiosClient();
  const params = useParams();

  const mutation = useMutation({
    mutationFn: async (loginData: ILogin) =>
      await axios.post<AuthResponse>("/api/auth/login", loginData),
    onSuccess: (response) => {
      authContext.login({
        avatar: response.data.userAvatar,
        username: response.data.userName,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isAdmin: response.data.isAdmin,
      });

      queryClient.invalidateQueries({ queryKey: ["homeData"] });
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      params?.mangaId &&
        queryClient.invalidateQueries({
          queryKey: ["sourceData", params.mangaId],
        });
      queryClient.invalidateQueries({ queryKey: ["libraryData"] });
    },
  });

  return mutation;
};
