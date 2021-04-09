module.exports = function (query, objectA) {
  var paginate = {};

  const page = parseInt(query) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = Math.ceil(objectA.length / limit);

  const result = objectA.slice(startIndex, endIndex);
  const totalRecords = objectA.length;
  const nextPage = page >= totalPages ? null : page + 1;
  const previousPage =
    page - 1 == 0 || page - 1 >= totalPages ? null : page - 1;

  paginate = {
    totalRecords: totalRecords,
    totalPages: totalPages,
    page: page,
    nextPage: nextPage,
    previousPage: previousPage,
  };
  return { paginate: paginate, result: result };
};
