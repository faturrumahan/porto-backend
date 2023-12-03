const TagsModel = require("../models/tagList");

const getAllTags = async (req, res) => {
  try {
    const [data] = await TagsModel.getAllTags();
    res.json({
      message: "get Tags success",
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
  getAllTags,
};
