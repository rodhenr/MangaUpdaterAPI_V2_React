import { useQuery } from '@tanstack/react-query';
import AxiosClient from '../../../lib/axios';
import { IMangasResponse } from '../../home/api/Queries';

export interface IFilters {
  orderById: string;
  sourceId: string;
  genreId: string;
}

export interface ILibraryQueryParams extends IFilters {
  input: string;
}

export interface IMangaGenre {
  id: number;
  name: string;
}

export const useGetMangasQuery = (page: number, params: ILibraryQueryParams) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['libraryData', page, params],
    queryFn: () =>
      axios
        .get<IMangasResponse>('/api/manga', {
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
    queryFn: () => axios.get<IMangaGenre[]>('/api/manga/genre').then((res) => res.data),
  });
};
