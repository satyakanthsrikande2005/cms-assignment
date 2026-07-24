const mongoose = require("mongoose");
const env = require("./env");

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongodbUri);

    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;