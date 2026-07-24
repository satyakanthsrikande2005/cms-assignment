const express = require("express");
const loadExpress = require("./loaders/express.loader");

const app = express();

loadExpress(app);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Production Ready CMS Backend Running 🚀",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;