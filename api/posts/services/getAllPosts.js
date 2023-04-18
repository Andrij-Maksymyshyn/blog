const { Post } = require("../../../models");
const { BadRequest } = require("../../../errors/ApiError");
const { buildSortQuery } = require("../../../helpers/buildSortQuery");

const getAllPosts = async (query = {}) => {
  const { sortBy = "_id", order = "ASC", page = 1, perPage = 3 } = query;
  const sortQuery = buildSortQuery(sortBy, order);
  const skip = (page - 1) * perPage;

  const posts = await Post.find({ isDeleted: false })
    .sort(sortQuery)
    .limit(perPage)
    .skip(skip);

  const total = await Post.count();

  if (posts.length === 0) {
    throw new BadRequest(
      `There isn't data with page: ${page} and perPage: ${perPage}`
    );
  }

  return {
    data: posts,
    page,
    perPage: Number(perPage),
    total
  };
};

module.exports = getAllPosts;
