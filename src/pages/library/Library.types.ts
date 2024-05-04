export type FiltersType = {
  orderById: string;
  sourceId: string;
  genreId: string;
}

type LibraryQueryParams = {
  input: string;
}

export type LibraryQueryParamsType = LibraryQueryParams & FiltersType;

export type MangaGenreType = {
  id: number;
  name: string;
}

export type MangasResponseType = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  mangas: MangaInfoType[];
}

export type MangaInfoType = {
  mangaId: number;
  coverUrl: string;
  mangaName: string;
}

export type SourceType = {
  id: number;
  name: string;
  baseUrl: string;
}

export type AddMangaSourceMutationType = {
  mangaId: number;
  sourceId: number;
  url: string;
}