const { Post } = require("../../../models");

const getByParams = (searchData = {}) => {
  return Post.find(searchData);
};

module.exports = getByParams;
