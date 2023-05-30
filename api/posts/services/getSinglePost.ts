import { Post } from "../../../models";
import { IPost } from "../../../interfaces/postInterface";

const getSinglePost = async (id: string): Promise<IPost | null> => {
  const findedPost = await Post.findOne({
    _id: id,
    isDeleted: false
  });

  if (!findedPost) {
    return null;
  }

  return findedPost;
};

export { getSinglePost };
