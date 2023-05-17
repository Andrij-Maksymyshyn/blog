const { Post } = require("../../models");
const { verifyToken } = require("../../services");

const deletePost = async ({ id, accessToken }) => {
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

module.exports = deletePost;
