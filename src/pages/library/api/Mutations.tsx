import { useMutation } from '@tanstack/react-query';
import AxiosClient from '../../../api/axios';
import { queryClient } from '../../../api/query-client';

interface IAddMangaSourceMutation {
  mangaId: number;
  sourceId: number;
  url: string;
}

export const useAddMangaMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: (malId: string) =>
      axios.post(`/api/manga`, {
        malId: malId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraryData'] });
    },
  });
};

export const useAddMangaSourceMutation = () => {
  const axios = AxiosClient();

  return useMutation({
    mutationFn: ({ mangaId, sourceId, url }: IAddMangaSourceMutation) =>
      axios.post(`/api/manga/${mangaId}/source`, {
        sourceId: sourceId,
        mangaUrl: url,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraryData'] });
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
    },
  });
};
