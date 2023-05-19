const { Post } = require("../../models");
const { buildFilterQuery } = require("../../helpers/buildFilterQuery");
const { buildSortQuery } = require("../../helpers/buildSortQuery");

const posts = async ({ skip, limit, sortBy, filterInput }) => {
  const filterQuery = buildFilterQuery(filterInput);
  const sortQuery = buildSortQuery(sortBy);

  const postsArray = await Post.find(filterQuery, "", {
    sort: sortQuery,
    skip,
    limit
  });

  if (!postsArray) {
    return null;
  }

  return postsArray;
};

module.exports = posts;
