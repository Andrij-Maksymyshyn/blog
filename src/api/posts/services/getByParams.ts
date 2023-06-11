import { Post } from "../../../models";
import { IPost } from "../../../interfaces/postInterface";

type TSearchPost = {
  user?: string;
};

const getByParams = async (searchData: TSearchPost = {}): Promise<IPost[]> => {
  const allPosts = await Post.find(searchData);

  return allPosts;
};

export { getByParams };
