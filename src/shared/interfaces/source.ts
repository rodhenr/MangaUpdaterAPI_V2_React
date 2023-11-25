export interface IUserSource {
  sourceId: number;
  sourceName: string;
  isFollowing: boolean;
}

export interface ISource {
  id: number;
  name: string;
  baseUrl: string;
}
