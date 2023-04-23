const { Post } = require("../../../models");
const { BadRequest } = require("../../../errors/ApiError");
const { buildFilterQuery } = require("../../../helpers/buildFilterQuery");
const { buildSortQuery } = require("../../../helpers/buildSortQuery");

const getAllPosts = async (query = {}) => {
  const { sortBy = "asc(_id)", page = 1, perPage = 3, ...findedParams } = query;
  const filterQuery = buildFilterQuery(findedParams);
  const sortQuery = buildSortQuery(sortBy);
  const skip = (page - 1) * perPage;

  const posts = await Post.find(filterQuery)
    .sort(sortQuery)
    .limit(perPage)
    .skip(skip);

  const total = await Post.count(filterQuery);

  if (posts.length === 0) {
    throw new BadRequest(
      `There isn't data with findedParams, page: ${page} and perPage: ${perPage}`
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
