import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AxiosClient from '../../../api/axios';
import AuthContext from '../../../context/AuthContext';
import {
  MangaFollowsResponseType,
  MangaResponseType,
  MangaSourcesResponseType,
} from '../Manga.types';

export const useGetMangaQuery = (mangaId: string | undefined) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['mangaData'],
    queryFn: () => axios.get<MangaResponseType>(`/api/manga/${mangaId}`).then((res) => res.data),
    enabled: !!mangaId,
  });
};

export const useGetSourcesQuery = (mangaId: number) => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useQuery({
    queryKey: ['sourceData', mangaId],
    queryFn: () =>
      axios.get<MangaSourcesResponseType[]>(`/api/manga/${mangaId}/source`).then((res) => res.data),
    enabled: !!userInfo.token,
  });
};

export const useGetUsersFollowing = (mangaId: string | number | undefined) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['usersFollowing'],
    queryFn: () =>
      axios.get<MangaFollowsResponseType>(`/api/manga/${mangaId}/follows`).then((res) => res.data),
    enabled: !!mangaId,
  });
};
