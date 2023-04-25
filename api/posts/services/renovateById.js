const { Post } = require("../../../models");

const renovateById = async (id, data) => {
  const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });

  if (!updatedPost) {
    return null;
  }

  return updatedPost;
};

module.exports = renovateById;
