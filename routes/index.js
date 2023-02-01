const express = require("express");
const dataRouter = require("./data.router");
const runappRouter = require("./runapp.router");
const runappfileRouter = require("./runappfile.router");

const routerApi = (app) => {
  // master route
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/data", dataRouter);
  router.use("/runapp", runappRouter);
  router.use("/runappfile", runappfileRouter);
};

module.exports = routerApi;
