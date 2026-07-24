const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const env = require("../config/env");

function loadExpress(app) {
  app.use(helmet());

  app.use(
    cors({
      origin: [env.clientUrl, env.publicUrl].filter(Boolean),
      credentials: true,
    })
  );

  app.use(compression());

  app.use(morgan("dev"));

  app.use(express.json({ limit: "10mb" }));

  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
}

module.exports = loadExpress;