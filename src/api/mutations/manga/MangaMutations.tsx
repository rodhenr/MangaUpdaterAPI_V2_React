import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import AxiosClient from "../../../lib/axios";
import { queryClient } from "../../../lib/query-client";

import { IMutationData } from "../../../shared/interfaces/chapters";

interface IFollowSourcesVariables {
  mangaId: number;
  sourcesToFollow: number[];
}

export const useFollowMangaMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: (mangaId: number) =>
      axios.post(`/api/user/mangas/${mangaId}`, []),
    onSuccess: (_: AxiosResponse<void>, mangaId: number) => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({
        queryKey: ["sourceData", mangaId],
      });
    },
  });
};

export const useUnfollowMangaMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: (mangaId: number) =>
      axios.delete(`/api/user/mangas/${mangaId}`),
    onSuccess: (_: AxiosResponse<void>, mangaId: number) => {
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({ queryKey: ["sourceData", mangaId] });
    },
  });
};

export const useChapterReadStateMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: ({ chapterId, mangaId, sourceId }: IMutationData) =>
      axios.patch(
        `api/user/mangas/${mangaId}/sources/${sourceId}?chapterId=${chapterId}`
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mangaData"] }),
  });
};

export const useFollowSourcesMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: ({ mangaId, sourcesToFollow }: IFollowSourcesVariables) =>
      axios.post(`/api/user/mangas/${mangaId}`, sourcesToFollow),
    onSuccess: (_: AxiosResponse<void>, variables: IFollowSourcesVariables) => {
      queryClient.invalidateQueries({
        queryKey: ["sourceData", variables.mangaId],
      });
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
    },
  });
};

export const useAddMangaMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: (malId: string) => axios.post(`/api/manga/?malId=${malId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryData"] });
    },
  });
};
