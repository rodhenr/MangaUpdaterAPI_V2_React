import { useQuery } from "@tanstack/react-query";
import AxiosClient from "../../../lib/axios";

import { IUserProfile } from "../../../shared/interfaces/user";

export const useGetProfileData = () => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      axios.get<IUserProfile>(`/api/user/profile`).then((res) => res.data),
  });
};
