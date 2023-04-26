const { Post } = require("../../../models");

const getSinglePost = async id => {
  const findedPost = await Post.findOne({
    _id: id,
    isDeleted: false
  });

  if (!findedPost) {
    return null;
  }

  return findedPost;
};

module.exports = getSinglePost;
