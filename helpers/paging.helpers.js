const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { currentPage, totalItems, totalPages, items };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 20;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

module.exports = {
  getPagingData,
  getPagination,
};
