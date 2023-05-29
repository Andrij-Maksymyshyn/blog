export interface IPostInput {
  title: string;
  text: string;
  tags?: string[];
  viewsCount?: number;
  imageUrl?: string;
  accessToken: string;
}
