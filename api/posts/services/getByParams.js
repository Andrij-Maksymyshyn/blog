const { Post } = require("../../../models");

const getByParams = async (searchData = {}) => {
  const allPosts = await Post.find(searchData);

  return allPosts;
};

module.exports = getByParams;
