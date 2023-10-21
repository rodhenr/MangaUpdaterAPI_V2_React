export interface IMangaData {
  coverUrl: string;
  name: string;
  alternativeName: string;
  author: string;
  synopsis: string;
  type: string;
  myAnimeListId: number;
  isUserFollowing: boolean;
  sources: IMangaSource[];
  genres: string[];
  chapters: IMangaChapter[];
}

export interface IMangaChapter {
  chapterId: number;
  sourceId: number;
  sourceName: string;
  date: string;
  number: string;
  read: boolean;
}

export interface IMangaSource {
  id: number;
  name: string;
  baseUrl: string;
}
