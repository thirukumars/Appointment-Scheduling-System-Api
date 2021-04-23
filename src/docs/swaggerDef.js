/*
   docs Name : swaggerDef
*/

const { version } = require("../../package.json");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Appointment Scheduling System",
    description: "20/04/2021",
    version,
    license: {
      name: "MIT",
      url:
        "https://github.com/hagopj13/node-express-mongoose-boilerplate/blob/master/LICENSE",
    },
  },
  servers: [
    {
      url: `http://localhost:3002/v1`, // change url based on (local/production)
    },
  ],
};

module.exports = swaggerDef;
