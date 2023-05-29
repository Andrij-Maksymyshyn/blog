import { IPostInput } from "../../interfaces/postInput";
import { IPost } from "../../interfaces/postInterface";
import { Post } from "../../models";
import { verifyToken } from "../../services";

const createPost = async ({
  postInput
}: {
  postInput: IPostInput;
}): Promise<IPost> => {
  const { accessToken } = postInput;

  verifyToken(accessToken, "accessToken");

  if (!verifyToken) {
    throw new Error("Please, sign in!");
  }

  const post = new Post({
    title: postInput.title,
    text: postInput.text,
    tags: postInput.tags,
    viewsCount: postInput.viewsCount,
    imageUrl: postInput.imageUrl
  });

  const createdPost = await post.save();

  return createdPost;
};

export { createPost };

// const { Post } = require("../../models");
// const { verifyToken } = require("../../services");

// const createPost = async ({ postInput }) => {
//   const { accessToken } = postInput;

//   verifyToken(accessToken, "accessToken");

//   if (!verifyToken) {
//     throw new Error("Please, sign in!");
//   }

//   const post = new Post({
//     title: postInput.title,
//     text: postInput.text,
//     tags: postInput.tags,
//     viewsCount: postInput.viewsCount,
//     imageUrl: postInput.imageUrl,
//     user: postInput.user
//   });

//   const createdPost = await post.save();

//   return createdPost;
// };

// module.exports = createPost;
