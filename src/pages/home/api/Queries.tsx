import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import AxiosClient from '../../../lib/axios';
import AuthContext from '../../../shared/context/AuthContext';

export interface IMangasResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  mangas: IMangaInfo[];
}

export interface IMangaInfo {
  mangaId: number;
  coverUrl: string;
  mangaName: string;
  recentChapters: IChapterInfo[];
}

export interface IChapterInfo {
  id: number;
  sourceId: number;
  sourceName: string;
  date: string;
  number: string;
  isUserAllowedToRead: boolean;
  isRead: boolean;
}

export interface IMangaResponseInfiniteQuery {
  pages: IMangasResponse[];
  pageParams: number[];
}

export const useGetMangasInfiniteQuery = (limit: number) => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useInfiniteQuery<IMangasResponse, AxiosError, IMangaResponseInfiniteQuery>({
    queryKey: ['homeData'],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<IMangasResponse>(`/api/manga?page=${pageParam}&limit=${limit}`)
        .then((res) => res.data),
    getNextPageParam: (prevPage, allPages) =>
      prevPage.mangas.length > 0 && allPages.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: !!userInfo?.token,
  });
};
