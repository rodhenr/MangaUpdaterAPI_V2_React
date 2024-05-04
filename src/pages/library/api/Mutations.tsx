import { useMutation } from '@tanstack/react-query';
import AxiosClient from '../../../api/axios';
import { queryClient } from '../../../api/query-client';
import { AddMangaSourceMutationType } from '../Library.types';

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
    mutationFn: ({ mangaId, sourceId, url }: AddMangaSourceMutationType) =>
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
