// src/app.js
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/projects", require("./routes/project.routes"));
app.use("/", require("./routes/task.routes"));

module.exports = app;
