const axios = require("axios");

const deleteImage = async (deleteHash) => {
  const imgurResponse = await axios.delete(
    `https://api.imgur.com/3/image/${deleteHash}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    }
  );

  return imgurResponse;
};

module.exports = { deleteImage };
