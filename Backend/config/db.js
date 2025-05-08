const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDb");
  } catch (e) {
    console.log("Error connecting to MongoDB", e.message);
    process.exit(1);
  }
};

module.exports = connectDb;
