import { Post } from "../../../models";
import { IPost } from "../../../interfaces/postInterface";

const renovateById = async (id: string, data: IPost): Promise<IPost | null> => {
  const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });

  if (!updatedPost) {
    return null;
  }

  return updatedPost;
};

export { renovateById };
