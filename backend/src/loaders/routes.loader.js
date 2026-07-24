const path = require("path");
const express = require("express");
const env = require("../config/env");
const apiRoutes = require("../routes");

function loadRoutes(app) {
  app.use(
    "/uploads",
    express.static(path.resolve(process.cwd(), env.uploadDir))
  );

  app.use("/api", apiRoutes);
}

module.exports = loadRoutes;
