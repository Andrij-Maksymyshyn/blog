const buildFilterQuery = (query = {}) => {
  const filterQuery = { isDeleted: false };
  const titleFilter = {};
  const dateFilter = {};
  const tagFilter = {};

  if (query.titleEq) {
    titleFilter.$eq = query.titleEq;
  }

  if (query.dateGte) {
    dateFilter.$gte = query.dateGte;
  }

  if (query.dateLte) {
    dateFilter.$lte = query.dateLte;
  }

  if (query.tagEq) {
    tagFilter.$in = query.tagEq;
  }

  if (query.authorId) {
    Object.assign(filterQuery, {
      user: query.authorId
    });
  }

  if (Object.keys(titleFilter).length) {
    filterQuery.title = titleFilter;
  }

  if (Object.keys(dateFilter).length) {
    filterQuery.date = dateFilter;
  }

  if (Object.keys(tagFilter).length) {
    filterQuery.tags = tagFilter;
  }

  return filterQuery;
};

module.exports = {
  buildFilterQuery
};
