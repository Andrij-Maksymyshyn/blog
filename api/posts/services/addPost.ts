import { Post } from "../../../models";
import { IUser } from "../../../interfaces/userInterface";
import { IPost } from "../../../interfaces/postInterface";

const addPost = async (
  postObject: IPost,
  signedInUser: IUser
): Promise<IPost> => {
  const newPost = await Post.create({
    ...postObject,
    user: signedInUser?._id
  });

  return newPost;
};

export { addPost };
