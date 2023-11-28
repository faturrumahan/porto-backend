const dbPool = require("../config/database");

const getAllProjects = () => {
  const sqlQuery = "select * from project_list order by title asc";

  return dbPool.execute(sqlQuery);
};

const getSpecificProject = (idProject) => {
  const sqlQuery = `select * from project_list where id =${idProject}`;

  return dbPool.execute(sqlQuery);
};

const createNewProject = (body, files) => {
  var dataName = [];
  var dataValue = [];
  // console.log(body);
  // for (let i = 0; i < body.length; i++) {
  //   const name = body[i]["name"];
  //   const value = body[i]["value"];
  //   dataName.push(name);
  //   dataValue.push(value);
  // }
  for (const key in body) {
    dataName.push(key);
    dataValue.push(body[key]);
  }
  var imageList;
  for (let i = 0; i < files.length; i++) {
    if (!imageList) {
      imageList = files[i].path;
    } else {
      imageList += "," + files[i].path;
    }
  }
  dataName.push("image");
  dataValue.push(imageList.replace(/\\/g, "/"));

  const stringDataValue = dataValue.map((str) => `"${str}"`);
  // console.log(stringDataValue);
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
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      if (!imageList) {
        imageList = files[i].path;
      } else {
        imageList += "," + files[i].path;
      }
    }
  }
  console.log(imageList);

  let sqlQuery = "UPDATE project_list SET ";
  for (const [name, value] of Object.entries(values)) {
    sqlQuery += `${name} = '${value}', `;
  }
  sqlQuery = sqlQuery.slice(0, -1); // Remove the trailing comma and space
  if (files.length > 0) {
    sqlQuery += ` image = '${imageList.replace(/\\/g, "/")}'`;
  }
  sqlQuery += ` WHERE id = ${idProject}`; // Assuming you have a record_id variable
  console.log(sqlQuery);

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
