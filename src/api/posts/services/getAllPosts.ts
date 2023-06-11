import { Post } from "../../../models";
import { buildFilterQuery } from "../../../helpers/buildFilterQuery";
import { buildSortQuery } from "../../../helpers/buildSortQuery";
import { IPost } from "../../../interfaces/postInterface";

type TQueryPosts = {
  [key: string]: string;
};

const getAllPosts = async (
  query: TQueryPosts = {}
): Promise<{
  data: IPost[];
  page: number | string;
  perPage: number | string;
  total: number;
}> => {
  const { sortBy = "asc(_id)", page = 1, perPage = 3, ...findedParams } = query;
  const filterQuery = buildFilterQuery(findedParams);
  const sortQuery = buildSortQuery(sortBy);
  const skip = (Number(page) - 1) * Number(perPage);

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

export { getAllPosts };
