const app = require("./app");
const env = require("./config/env");
const loadDatabase = require("./loaders/database.loader");

const startServer = async () => {
  await loadDatabase();

  app.listen(env.port, () => {
    console.log(`
=========================================
🚀 Production Ready CMS Backend
=========================================
Environment : ${env.nodeEnv}
Server      : http://localhost:${env.port}
Health API  : http://localhost:${env.port}/api/health
Database    : MongoDB Connected
=========================================
`);
  });
};

startServer();