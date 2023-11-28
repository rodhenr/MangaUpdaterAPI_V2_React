import { useMutation } from "@tanstack/react-query";

import AxiosClient from "../../../lib/axios";
import { queryClient } from "../../../lib/query-client";

import { IChangeEmailResponse } from "../../../shared/interfaces/user";

export const useChangeEmailMutation = () => {
  const axios = AxiosClient();

  const mutation = useMutation({
    mutationFn: async (data: {
      newEmail: string;
      password: string;
      confirmationPassword: string;
    }) =>
      await axios.post<IChangeEmailResponse>("/api/user/profile/email", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      return response;
    },
    onError: (error) => error,
  });

  return mutation;
};
