const express = require("express");
const loadExpress = require("./loaders/express.loader");
const loadRoutes = require("./loaders/routes.loader");
const errorHandler = require("./middleware/error.middleware");
const env = require("./config/env");

const app = express();

loadExpress(app);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Production Ready CMS Backend Running",
    data: {
      version: "1.0.0",
      environment: env.nodeEnv,
      timestamp: new Date().toISOString(),
    },
  });
});

loadRoutes(app);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    errors: [],
  });
});

app.use(errorHandler);

module.exports = app;
