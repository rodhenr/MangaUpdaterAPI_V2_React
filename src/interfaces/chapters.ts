import { IMangasResponse } from "./library";

export interface ChapterInfo {
  chapterId: number;
  sourceId: number;
  sourceName: string;
  date: Date;
  number: string;
  read: boolean;
}

export interface MangaDataList {
  id: number;
  coverUrl: string;
  name: string;
  chapters: ChapterInfo[];
}

export interface IMangaDataInfiniteQuery {
  pages: IMangasResponse[][];
  pageParams: number[];
}


