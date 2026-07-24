const connectDatabase = require("../config/database");

const loadDatabase = async () => {
  await connectDatabase();
};

module.exports = loadDatabase;