require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");

const projectListRoutes = require("./routes/projectList");
const categoryListRoutes = require("./routes/categoryList");
const tagListRoutes = require("./routes/tagList");
const imgurRoutes = require("./routes/imgur");

const middlewareLogRequest = require("./middleware/logs");

const app = express();

app.use(cors());
app.use(middlewareLogRequest);
app.use(express.json());

app.use("/project", projectListRoutes);
app.use("/category", categoryListRoutes);
app.use("/tag", tagListRoutes);
app.use("/image", imgurRoutes);
app.use("/src/assets/uploads", express.static("src/assets/uploads"));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
