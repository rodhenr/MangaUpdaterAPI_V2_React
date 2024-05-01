import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AxiosClient from '../../../lib/axios';
import AuthContext from '../../../shared/context/AuthContext';
import { IUserSource } from '../../../shared/interfaces/source';

export interface IMangaResponse {
  id: number;
  coverUrl: string;
  synopsis: string;
  type: string;
  myAnimeListId: number;
  isUserFollowing: boolean;
  chapters: IMangaChapter[];
  genres: IMangaSubInfo[];
  sources: IMangaSubInfo[];
  authors: IMangaSubInfo[];
  titles: IMangaTitle[];
}

export interface IMangaChapter {
  id: number;
  sourceId: number;
  sourceName: string;
  date: string;
  number: string;
  isUserAllowedToRead: boolean;
  isRead: boolean;
}

export interface IMangaSubInfo {
  id: number;
  name: string;
}

export interface IMangaTitle extends IMangaSubInfo {
  isMainTitle: boolean;
}

export interface IMangaFollowsResponse {
  mangaId: number;
  followers: number;
}

export const useGetMangaQuery = (mangaId: string | undefined) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['mangaData'],
    queryFn: () => axios.get<IMangaResponse>(`/api/manga/${mangaId}`).then((res) => res.data),
    enabled: !!mangaId,
  });
};

export const useGetSourcesQuery = (mangaId: number) => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useQuery({
    queryKey: ['sourceData', mangaId],
    queryFn: () => axios.get<IUserSource[]>(`/api/manga/${mangaId}/source`).then((res) => res.data),
    enabled: !!userInfo.token,
  });
};

export const useGetUsersFollowing = (mangaId: string | number | undefined) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['usersFollowing'],
    queryFn: () =>
      axios.get<IMangaFollowsResponse>(`/api/manga/${mangaId}/follows`).then((res) => res.data),
    enabled: !!mangaId,
  });
};
