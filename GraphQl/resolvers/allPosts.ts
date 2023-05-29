import { Post } from "../../models";
import { IQueryIn } from "../../interfaces/filterInput";
import { IPost } from "../../interfaces/postInterface";
import { buildFilterQuery } from "../../helpers/buildFilterQuery";
import { buildSortQuery } from "../../helpers/buildSortQuery";

const posts = async ({
  skip,
  limit,
  sortBy,
  filterInput
}: {
  skip: number;
  limit: number;
  sortBy: string;
  filterInput: IQueryIn;
}): Promise<IPost[] | null> => {
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

export { posts };

// const { Post } = require("../../models");
// const { buildFilterQuery } = require("../../helpers/buildFilterQuery");
// const { buildSortQuery } = require("../../helpers/buildSortQuery");

// const posts = async ({ skip, limit, sortBy, filterInput }) => {
//   const filterQuery = buildFilterQuery(filterInput);
//   const sortQuery = buildSortQuery(sortBy);

//   const postsArray = await Post.find(filterQuery, "", {
//     sort: sortQuery,
//     skip,
//     limit
//   });

//   if (!postsArray) {
//     return null;
//   }

//   return postsArray;
// };

// module.exports = posts;
