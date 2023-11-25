import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import AxiosClient from "../../../lib/axios";
import AuthContext from "../../../shared/context/AuthContext";

import { ISource } from "../../../shared/interfaces/source";

export const useGetAllSourcesQuery = () => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useQuery({
    queryKey: ["sources"],
    queryFn: () => axios.get<ISource[]>(`/api/source`).then((res) => res.data),
    enabled: !!userInfo.token,
  });
};
