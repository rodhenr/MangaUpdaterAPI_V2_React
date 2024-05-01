import { useMutation } from '@tanstack/react-query';

import AxiosClient from '../../../lib/axios';
import { queryClient } from '../../../lib/query-client';

interface IAddMangaSource {
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
    mutationFn: ({ mangaId, sourceId, url }: IAddMangaSource) =>
      axios.post(`/api/manga/${mangaId}/source/${sourceId}?mangaUrl=${url}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraryData'] });
      queryClient.invalidateQueries({ queryKey: ['mangaData'] });
      queryClient.invalidateQueries({ queryKey: ['usersFollowing'] });
    },
  });
};
