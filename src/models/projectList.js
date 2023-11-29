const axios = require("axios");
const dbPool = require("../config/database");

const getAllProjects = () => {
  const sqlQuery = "select * from project_list order by title asc";

  return dbPool.execute(sqlQuery);
};

const getSpecificProject = (idProject) => {
  const sqlQuery = `select * from project_list where id =${idProject}`;

  return dbPool.execute(sqlQuery);
};

const createNewProject = async (body, files) => {
  var dataName = [];
  var dataValue = [];
  const imgurLinks = [];
  const imgurDeleteHash = [];

  for (const key in body) {
    dataName.push(key);
    dataValue.push(body[key]);
  }

  for (const image of files) {
    const imgurResponse = await axios.post(
      "https://api.imgur.com/3/image",
      {
        image: image.buffer.toString("base64"),
        type: "base64",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      }
    );

    const imgurLink = imgurResponse.data.data.link;
    const deleteHash = imgurResponse.data.data.deletehash;
    imgurLinks.push(imgurLink);
    imgurDeleteHash.push(deleteHash);
  }

  dataName.push("image");
  dataValue.push(imgurLinks);
  dataName.push("delete_id");
  dataValue.push(imgurDeleteHash);

  const stringDataValue = dataValue.map((str) => `"${str}"`);
  const sqlQuery = `INSERT INTO project_list (${dataName}) VALUES (${stringDataValue})`;

  return dbPool.execute(sqlQuery);
};

const updateProject = (body, files, idProject) => {
  const values = {};
  let imageList;
  for (const key in body) {
    const name = key;
    const value = body[key];
    values[name] = value;
  }

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      if (!imageList) {
        imageList = files[i].path;
      } else {
        imageList += "," + files[i].path;
      }
    }
  }

  let sqlQuery = "UPDATE project_list SET ";
  for (const [name, value] of Object.entries(values)) {
    sqlQuery += `${name} = '${value}', `;
  }
  sqlQuery = sqlQuery.slice(0, -1); // Remove the trailing comma and space
  if (files.length > 0) {
    sqlQuery += ` image = '${imageList.replace(/\\/g, "/")}'`;
  }
  sqlQuery += ` WHERE id = ${idProject}`; // Assuming you have a record_id variable

  return dbPool.execute(sqlQuery);
};

const deleteProject = (idProject) => {
  const sqlQuery = `delete from project_list where id=${idProject}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllProjects,
  getSpecificProject,
  createNewProject,
  updateProject,
  deleteProject,
};
