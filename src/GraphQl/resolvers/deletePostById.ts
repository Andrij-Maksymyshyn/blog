import { Post } from "../../models";
import { IPost } from "../../interfaces/postInterface";
import { verifyToken } from "../../services";

const deletePost = async ({
  id,
  accessToken
}: {
  id: string;
  accessToken: string;
}): Promise<IPost> => {
  verifyToken(accessToken, "accessToken");

  if (!verifyToken) {
    throw new Error("Please, sign in!");
  }
  const removedPost = await Post.findById(id);

  if (!removedPost) {
    throw new Error("Post Not found!");
  }

  removedPost.isDeleted = true;
  await removedPost.save();

  return removedPost;
};

export { deletePost };
