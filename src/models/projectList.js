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

const updateProject = async (body, files, idProject) => {
  const values = {};
  const imgurLinks = [];
  const imgurDeleteHash = [];
  console.log(body);

  for (const key in body) {
    if (key != "images") {
      const name = key;
      const value = body[key];
      values[name] = value;
    }
  }

  if (files.length > 0) {
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
    values["image"] = imgurLinks;
    values["delete_id"] = imgurDeleteHash;
  }

  // if (files.length > 0) {
  //   for (let i = 0; i < files.length; i++) {
  //     if (!imageList) {
  //       imageList = files[i].path;
  //     } else {
  //       imageList += "," + files[i].path;
  //     }
  //   }
  // }

  let sqlQuery = "UPDATE project_list SET ";
  for (const [name, value] of Object.entries(values)) {
    sqlQuery += `${name} = '${value}', `;
  }
  sqlQuery = sqlQuery.slice(0, -2); // Remove the trailing comma and space
  // if (files.length > 0) {
  //   sqlQuery += ` image = '${imageList.replace(/\\/g, "/")}'`;
  // }
  sqlQuery += ` WHERE id = ${idProject}`; // Assuming you have a record_id variable
  console.log(sqlQuery);

  return dbPool.execute(sqlQuery);
};

const deleteProject = async (idProject) => {
  const [data] = await getSpecificProject(idProject);
  const deleteId = data[0].delete_id.split(",");
  console.log(deleteId);
  for (deleteHash of deleteId) {
    const imgurResponse = await axios.delete(
      `https://api.imgur.com/3/image/${deleteHash}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
      }
    );
  }
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
