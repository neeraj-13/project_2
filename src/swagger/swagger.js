const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const serviceBasePath = `/rest/api`;

module.exports = function (app) {
  let swaggerDefinition = {
    swagger: "2.0",
    info: {
      title: "ONLY PROPERTY ADMIN service  API's",
      description: "RESTful API for ONLY PROPERTY ADMIN services",
      version: "1.0",
    },
    servers: [
      {
        url: `http://${process.env.REMOTE_HOST}:${process.env.PORT}`,
      },
    ],
    produces: ["application/json"],
    host: process.env.HOST_NAME,
    basePath: serviceBasePath,
  };
  // options for the swagger docs
  let options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    explorer: true,
    // path to the API docs
    apis: [
      path.join(__dirname, "../controllers/*.js"),
      path.join(__dirname, "../routers/*.js"),
    ],
  };
  let extraOptions = {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null,
    },
    customSiteTitle: "Swagger - ONLY PROPERTY ADMIN",
  };
  // initialize swagger-jsdoc
  swaggerSpec = swaggerJSDoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, extraOptions)
  );
};
