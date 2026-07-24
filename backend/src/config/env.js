require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,

  mongodbUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/cms_assignment",

  jwtSecret:
    process.env.JWT_SECRET || "change_this_to_a_long_random_secret_key",

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

module.exports = env;