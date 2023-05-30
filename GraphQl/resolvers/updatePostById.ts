import { IPostInput } from "../../interfaces/postInput";
import { IPost } from "../../interfaces/postInterface";
import { Post } from "../../models";
import { verifyToken } from "../../services";

const updatePost = async ({
  id,
  postInput
}: {
  id: string;
  postInput: IPostInput;
}): Promise<IPost> => {
  const { accessToken } = postInput;

  verifyToken(accessToken, "accessToken");

  if (!verifyToken) {
    throw new Error("Please, sign in!");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new Error("Post Not found!");
  }

  post.title = postInput.title;
  post.text = postInput.text;
  post.tags = postInput.tags;
  post.viewsCount = postInput.viewsCount;
  post.imageUrl = postInput.imageUrl;

  const updatedPost = await post.save();

  return updatedPost;
};

export { updatePost };
