import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import AxiosClient from '../../../api/axios';
import AuthContext from '../../../context/AuthContext';

export interface IUserMangasResponse {
  id: number;
  coverUrl: string;
  name: string;
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

export interface IUserMangasResponseInfiniteQuery {
  pages: IUserMangasResponse[][];
  pageParams: number[];
}

export const useGetUserMangasInfiniteQuery = (limit: number) => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useInfiniteQuery<IUserMangasResponse[], AxiosError, IUserMangasResponseInfiniteQuery>({
    queryKey: ['homeData'],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<IUserMangasResponse[]>(`/api/user/manga?page=${pageParam}&limit=${limit}`)
        .then((res) => res.data),
    getNextPageParam: (prevPage, allPages) =>
      prevPage.length > 0 && allPages.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: !!userInfo?.token,
  });
};
