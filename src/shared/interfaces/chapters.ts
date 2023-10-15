export interface ChapterInfo {
  ChapterId: number;
  SourceId: number;
  SourceName: string;
  Date: Date;
  Number: string;
  Read: boolean;
}

export interface MangaDataList {
  Id: number;
  CoverUrl: string;
  Name: string;
  Chapters: ChapterInfo[];
}
