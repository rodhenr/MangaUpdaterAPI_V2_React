export type UserMangasResponseType = {
    id: number;
    coverUrl: string;
    name: string;
    recentChapters: ChapterInfoType[];
  };
  
  export type ChapterInfoType = {
    id: number;
    sourceId: number;
    sourceName: string;
    date: string;
    number: string;
    isUserAllowedToRead: boolean;
    isRead: boolean;
  };
  
  export type UserMangasInfiniteQueryResponseType = {
    pages: UserMangasResponseType[][];
    pageParams: number[];
  };