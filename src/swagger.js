// src/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "Collaborative Task Management API",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);
