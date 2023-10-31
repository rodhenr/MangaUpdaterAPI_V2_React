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

export interface IMutationData {
  chapterId: number;
  mangaId: number;
  sourceId: number;
}
