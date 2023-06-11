import { IQueryIn } from "../interfaces/filterInput";

interface IQueryOut {
  isDeleted: boolean;
  user?: string[];
  tags?: { $in: string[] };
  date?: { $gte: string; $lte: string };
}

const buildFilterQuery = (query: IQueryIn = {}): IQueryOut => {
  const filterQuery = <IQueryOut>{ isDeleted: false };
  const dateFilter = <any>{};

  if (query.dateGte) {
    dateFilter.$gte = query.dateGte;
  }

  if (query.dateLte) {
    dateFilter.$lte = query.dateLte;
  }

  if (query.tag) {
    filterQuery.tags = {
      $in: query.tag.split(",")
    };
  }

  if (query.authorId) {
    Object.assign(filterQuery, {
      user: query.authorId.split(",")
    });
  }

  if (Object.keys(dateFilter).length) {
    filterQuery.date = dateFilter;
  }

  return filterQuery;
};

export { buildFilterQuery, IQueryIn };
