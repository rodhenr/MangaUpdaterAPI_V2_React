import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import AxiosClient from "../../../lib/axios";
import { queryClient } from "../../../lib/query-client";

import { IMutationData } from "../../../shared/interfaces/chapters";
import { useContext } from "react";
import LoadingContext from "../../../shared/context/LoadingContext";

interface IFollowSourcesVariables {
  mangaId: number;
  sourcesToFollow: number[];
}

interface IAddMangaSource {
  mangaId: number;
  sourceId: number;
  url: string;
}

export const useFollowMangaMutation = () => {
  const axios = AxiosClient();
  const { changeLoadingState } = useContext(LoadingContext);

  return useMutation({
    mutationFn: (mangaId: number) =>
      axios.post(`/api/user/mangas/${mangaId}`, []),
    onMutate: () => changeLoadingState(),
    onSuccess: (_: AxiosResponse<void>, mangaId: number) => {
      changeLoadingState();
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({
        queryKey: ["sourceData", mangaId],
      });
      queryClient.invalidateQueries({ queryKey: ["usersFollowing"] });
    },
    onError: () => changeLoadingState(),
  });
};

export const useUnfollowMangaMutation = () => {
  const axios = AxiosClient();
  const { changeLoadingState } = useContext(LoadingContext);

  return useMutation({
    mutationFn: (mangaId: number) =>
      axios.delete(`/api/user/mangas/${mangaId}`),
    onMutate: () => changeLoadingState(),
    onSuccess: (_: AxiosResponse<void>, mangaId: number) => {
      changeLoadingState();
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({ queryKey: ["sourceData", mangaId] });
      queryClient.invalidateQueries({ queryKey: ["usersFollowing"] });
    },
    onError: () => changeLoadingState(),
  });
};

export const useChapterReadStateMutation = () => {
  const axios = AxiosClient();
  const { changeLoadingState } = useContext(LoadingContext);

  return useMutation({
    mutationFn: ({ chapterId, mangaId, sourceId }: IMutationData) =>
      axios.patch(
        `api/user/mangas/${mangaId}/sources/${sourceId}?chapterId=${chapterId}`
      ),
    onMutate: () => changeLoadingState(),
    onSuccess: () => {
      changeLoadingState();
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({ queryKey: ["usersFollowing"] });
    },
    onError: () => changeLoadingState(),
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
      queryClient.invalidateQueries({ queryKey: ["usersFollowing"] });
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

export const useAddMangaSourceMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: ({ mangaId, sourceId, url }: IAddMangaSource) =>
      axios.post(`/api/manga/${mangaId}/source/${sourceId}?mangaUrl=${url}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryData"] });
      queryClient.invalidateQueries({ queryKey: ["mangaData"] });
      queryClient.invalidateQueries({ queryKey: ["usersFollowing"] });
    },
  });
};
