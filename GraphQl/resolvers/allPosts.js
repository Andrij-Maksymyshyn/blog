const { Post } = require("../../models");

const posts = async ({ skip, limit }) => {
  const postsArray = await Post.find({ isDeleted: false }, "", {
    skip,
    limit
  });

  if (!postsArray) {
    return null;
  }

  return postsArray;
};

module.exports = posts;
