import { IMangaChapter } from "./manga";

export interface IMangasResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  mangas: IMangasData[];
}

export interface IMangasData {
  mangaId: number;
  coverUrl: string;
  mangaName: string;
  recentChapters: IMangaChapter[]
}

export interface IFilters {
  orderById: string;
  sourceId: string;
  genreId: string;
}
