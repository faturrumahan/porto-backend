const ImgurModel = require("../models/imgur");

const deleteImage = async (req, res) => {
  const { deleteHash } = req.params;
  try {
    await ImgurModel.deleteProject(deleteHash);
    res.json({
      message: "delete Image success",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

module.exports = { deleteImage };
