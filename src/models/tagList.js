const dbPool = require("../config/database");

const getAllTags = () => {
  const sqlQuery = "select * from tag order by id";

  return dbPool.execute(sqlQuery);
};

module.exports = { getAllTags };
