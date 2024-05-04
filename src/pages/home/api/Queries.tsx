import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import AxiosClient from '../../../api/axios';
import AuthContext from '../../../context/AuthContext';
import { UserMangasInfiniteQueryResponseType, UserMangasResponseType } from '../Home.types';

export const useGetUserMangasInfiniteQuery = (limit: number) => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useInfiniteQuery<
    UserMangasResponseType[],
    AxiosError,
    UserMangasInfiniteQueryResponseType
  >({
    queryKey: ['homeData'],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<UserMangasResponseType[]>(`/api/user/manga?page=${pageParam}&limit=${limit}`)
        .then((res) => res.data),
    getNextPageParam: (prevPage, allPages) =>
      prevPage.length > 0 && allPages.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: !!userInfo?.token,
  });
};
