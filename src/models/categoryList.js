const dbPool = require("../config/database");

const getAllCategories = () => {
  const sqlQuery = "select * from category order by id";

  return dbPool.execute(sqlQuery);
};

module.exports = { getAllCategories };
