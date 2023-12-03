const CategoriesModel = require("../models/categoryList");

const getAllCategories = async (req, res) => {
  try {
    const [data] = await CategoriesModel.getAllCategories();
    res.json({
      message: "get Categories success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllCategories,
};
