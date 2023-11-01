export interface IMangasData {
  mangas: ICardData[];
  genres: IGenre[];
}

export interface ICardData {
  coverUrl: string;
  mangaId: number;
  mangaName: string;
}

export interface IFilters {
  orderById: string;
  sourceId: string;
  genreId: string;
}

export interface IGenre {
  id: number;
  name: string;
}
