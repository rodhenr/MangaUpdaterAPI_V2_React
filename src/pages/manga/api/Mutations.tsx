import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import AxiosClient from '../../../api/axios';
import { queryClient } from '../../../api/query-client';
import LoadingContext from '../../../context/LoadingContext';
import { ChapterMutationDataType, FollowSourcesVariablesType } from '../Manga.types';

export const useFollowMangaMutation = () => {
  const axios = AxiosClient();
  const { changeLoadingState } = useContext(LoadingContext);

  return useMutation({
    mutationFn: (mangaId: number) => axios.post(`/api/user/manga/${mangaId}`, []),
    onMutate: () => changeLoadingState(),
    onSuccess: (_: AxiosResponse<void>, mangaId: number) => {
      changeLoadingState();
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({
        queryKey: ['sourceData', mangaId],
      });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
    },
    onError: () => changeLoadingState(),
  });
};

export const useUnfollowMangaMutation = () => {
  const axios = AxiosClient();
  const { changeLoadingState } = useContext(LoadingContext);

  return useMutation({
    mutationFn: (mangaId: number) => axios.delete(`/api/user/manga/${mangaId}`),
    onMutate: () => changeLoadingState(),
    onSuccess: (_: AxiosResponse<void>, mangaId: number) => {
      changeLoadingState();
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['sourceData', mangaId] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
    },
    onError: () => changeLoadingState(),
  });
};

export const useFollowSourcesMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: ({ mangaId, sourcesToFollow }: FollowSourcesVariablesType) =>
      axios.post(`/api/user/manga/${mangaId}/source`, sourcesToFollow),
    onSuccess: (_: AxiosResponse<void>, variables: FollowSourcesVariablesType) => {
      queryClient.invalidateQueries({
        queryKey: ['sourceData', variables.mangaId],
      });
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
    },
  });
};

export const useChapterReadStateMutation = () => {
  const axios = AxiosClient();
  const { changeLoadingState } = useContext(LoadingContext);

  return useMutation({
    mutationFn: ({ chapterId, mangaId, sourceId }: ChapterMutationDataType) =>
      axios.patch(`api/user/manga/${mangaId}/source/${sourceId}`, { chapterId }),
    onMutate: () => changeLoadingState(),
    onSuccess: () => {
      changeLoadingState();
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
    },
    onError: () => changeLoadingState(),
  });
};
