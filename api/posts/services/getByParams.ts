import { Post } from "../../../models";

const getByParams = async (searchData = {}) => {
  const allPosts = await Post.find(searchData);

  return allPosts;
};

export { getByParams };
