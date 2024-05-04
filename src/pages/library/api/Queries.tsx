import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AxiosClient from '../../../api/axios';
import AuthContext from '../../../context/AuthContext';
import {
  LibraryQueryParamsType,
  MangaGenreType,
  MangasResponseType,
  SourceType,
} from '../Library.types';

export const useGetMangasQuery = (page: number, params: LibraryQueryParamsType) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['libraryData', page, params],
    queryFn: () =>
      axios
        .get<MangasResponseType>('/api/manga', {
          params: {
            input: params.input === '' ? null : params.input,
            page,
            pageSize: 18,
            orderBy: params.orderById === '' ? null : params.orderById,
            sourceIds: params.sourceId === '' ? null : params.sourceId,
            genreIds: params.genreId === '' ? null : params.genreId,
          },
        })
        .then((res) => res.data),
  });
};

export const useGetMangasGenresQuery = () => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['genres'],
    queryFn: () => axios.get<MangaGenreType[]>('/api/manga/genre').then((res) => res.data),
  });
};

export const useGetAllSourcesQuery = () => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useQuery({
    queryKey: ['sources'],
    queryFn: () => axios.get<SourceType[]>(`/api/source`).then((res) => res.data),
    enabled: !!userInfo.token,
  });
};
