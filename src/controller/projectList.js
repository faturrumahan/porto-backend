const ProjectsModel = require("../models/projectList");

const getAllProjects = async (req, res) => {
  try {
    const [data] = await ProjectsModel.getAllProjects();
    res.json({
      message: "get Project success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const getSpecificProject = async (req, res) => {
  try {
    const { idProject } = req.params;
    const [data] = await ProjectsModel.getSpecificProject(idProject);
    res.json({
      message: "get specific Project success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const createNewProject = async (req, res) => {
  const { body, files } = req;
  try {
    await ProjectsModel.createNewProject(body, files);
    res.json({
      message: "add new Project success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const updateProject = async (req, res) => {
  const { idProject } = req.params;
  const { body, files } = req;
  try {
    await ProjectsModel.updateProject(body, files, idProject);
    res.json({
      message: "update Project success",
      data: {
        id: idProject,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

const deleteProject = async (req, res) => {
  const { idProject } = req.params;
  try {
    await ProjectsModel.deleteProject(idProject);
    res.json({
      message: "delete Project success",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllProjects,
  getSpecificProject,
  createNewProject,
  updateProject,
  deleteProject,
};
