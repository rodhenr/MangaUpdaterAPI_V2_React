import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import AxiosClient from "../../../lib/axios";

import { IUserSource } from "../../../shared/interfaces/source";
import { useContext } from "react";
import AuthContext from "../../../shared/context/AuthContext";
import {
  IMangaFollowsResponse,
  IMangaResponse,
} from "../../../shared/interfaces/manga";
import {
  ILibraryQueryParams,
  IMangasResponse,
} from "../../../shared/interfaces/library";
import {
  IMangaDataInfiniteQuery,
  MangaDataList,
} from "../../../shared/interfaces/chapters";
import { AxiosError } from "axios";

export const useGetSourcesQuery = (mangaId: number) => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useQuery({
    queryKey: ["sourceData", mangaId],
    queryFn: () =>
      axios
        .get<IUserSource[]>(`/api/manga/${mangaId}/sources`)
        .then((res) => res.data),
    enabled: !!userInfo.token,
  });
};

export const useGetMangaQuery = (mangaId: string | undefined) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ["mangaData"],
    queryFn: () =>
      axios
        .get<IMangaResponse>(`/api/manga/${mangaId}`)
        .then((res) => res.data),
    enabled: !!mangaId,
  });
};

export const useGetMangasQuery = (
  page: number,
  params: ILibraryQueryParams
) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ["libraryData", page, params],
    queryFn: () =>
      axios
        .get<IMangasResponse>("/api/manga", {
          params: {
            page,
            orderBy: params.orderById === "" ? null : params.orderById,
            sourceId: params.sourceId === "" ? null : params.sourceId,
            genreId: params.genreId === "" ? null : params.genreId,
            pageSize: 18,
            input: params.input === "" ? null : params.input,
          },
        })
        .then((res) => res.data),
  });
};

export const useGetHomeMangasQuery = (limit: number) => {
  const axios = AxiosClient();
  const { userInfo } = useContext(AuthContext);

  return useInfiniteQuery<MangaDataList[], AxiosError, IMangaDataInfiniteQuery>(
    {
      queryKey: ["homeData"],
      queryFn: ({ pageParam = 1 }) =>
        axios
          .get<MangaDataList[]>(
            `/api/user/mangas?page=${pageParam}&limit=${limit}`
          )
          .then((res) => res.data),
      getNextPageParam: (prevPage, allPages) =>
        prevPage.length > 0 && allPages.length > 0
          ? allPages.length + 1
          : undefined,
      initialPageParam: 1,
      enabled: !!userInfo?.token,
    }
  );
};

export const useGetUsersFollowing = (mangaId: string | number | undefined) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ["usersFollowing"],
    queryFn: () =>
      axios
        .get<IMangaFollowsResponse>(`/api/manga/${mangaId}/follows`)
        .then((res) => res.data),
    enabled: !!mangaId,
  });
};
