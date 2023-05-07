const { Post } = require("../../../models");
const { buildFilterQuery } = require("../../../helpers/buildFilterQuery");
const { buildSortQuery } = require("../../../helpers/buildSortQuery");

const getAllPosts = async (query = {}) => {
  const { sortBy = "asc(_id)", page = 1, perPage = 3, ...findedParams } = query;
  const filterQuery = buildFilterQuery(findedParams);
  const sortQuery = buildSortQuery(sortBy);
  const skip = (page - 1) * perPage;

  const posts = await Post.find(filterQuery, "", {
    sort: sortQuery,
    skip,
    limit: Number(perPage)
  });

  const total = await Post.count(filterQuery);

  return {
    data: posts,
    page,
    perPage: perPage,
    total
  };
};

module.exports = getAllPosts;
