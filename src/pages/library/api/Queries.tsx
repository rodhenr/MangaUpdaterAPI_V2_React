import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AxiosClient from '../../../api/axios';
import AuthContext from '../../../context/AuthContext';

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
}

export interface ISource {
  id: number;
  name: string;
  baseUrl: string;
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

export const useGetAllSourcesQuery = () => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useQuery({
    queryKey: ['sources'],
    queryFn: () => axios.get<ISource[]>(`/api/source`).then((res) => res.data),
    enabled: !!userInfo.token,
  });
};
