export type FollowSourcesVariablesType = {
    mangaId: number;
    sourcesToFollow: number[];
}
  
export type ChapterMutationDataType = {
    chapterId: number;
    mangaId: number;
    sourceId: number;
}

export type MangaResponseType = {
    id: number;
    coverUrl: string;
    synopsis: string;
    type: string;
    myAnimeListId: number;
    isUserFollowing: boolean;
    chapters: MangaChapterType[];
    genres: MangaSubInfoType[];
    sources: MangaSubInfoType[];
    authors: MangaSubInfoType[];
    titles: MangaTitleType[];
}

export type MangaChapterType = {
    id: number;
    sourceId: number;
    sourceName: string;
    date: string;
    number: string;
    isUserAllowedToRead: boolean;
    isRead: boolean;
}

export type MangaSubInfoType = {
    id: number;
    name: string;
}

type MangaTitle = {
    isMainTitle: boolean;
}

export type MangaTitleType = MangaTitle & MangaSubInfoType;

export type MangaFollowsResponseType = {
    mangaId: number;
    followers: number;
}

export type MangaSourcesResponseType = {
    id: number;
    name: string;
    isUserFollowing: boolean;
}