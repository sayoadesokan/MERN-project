const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB);

    console.log(`MongoDb connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`MongoDb connection error: ${error.message}`.cyan.underline);
    process.exit(1);
  }
};

module.exports = connectDB;
