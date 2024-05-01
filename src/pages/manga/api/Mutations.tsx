import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import AxiosClient from '../../../lib/axios';
import { queryClient } from '../../../lib/query-client';
import LoadingContext from '../../../shared/context/LoadingContext';

interface IFollowSourcesVariables {
  mangaId: number;
  sourcesToFollow: number[];
}

export interface IChapterMutationData {
  chapterId: number;
  mangaId: number;
  sourceId: number;
}

export const useFollowMangaMutation = () => {
  const axios = AxiosClient();
  const { changeLoadingState } = useContext(LoadingContext);

  return useMutation({
    mutationFn: (mangaId: number) => axios.post(`/api/user/mangas/${mangaId}`, []),
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
    mutationFn: (mangaId: number) => axios.delete(`/api/user/mangas/${mangaId}`),
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
    mutationFn: ({ mangaId, sourcesToFollow }: IFollowSourcesVariables) =>
      axios.post(`/api/user/mangas/${mangaId}`, sourcesToFollow),
    onSuccess: (_: AxiosResponse<void>, variables: IFollowSourcesVariables) => {
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
    mutationFn: ({ chapterId, mangaId, sourceId }: IChapterMutationData) =>
      axios.patch(`api/user/mangas/${mangaId}/sources/${sourceId}?chapterId=${chapterId}`),
    onMutate: () => changeLoadingState(),
    onSuccess: () => {
      changeLoadingState();
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
    },
    onError: () => changeLoadingState(),
  });
};
