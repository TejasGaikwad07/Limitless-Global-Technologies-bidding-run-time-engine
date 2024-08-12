const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("url", process.env.MONGO_URI);
    console.log("secret", process.env.JWT_SECRET);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("url", process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
    console.log("url", process.env.MONGO_URI);
  }
};

module.exports = connectDB;
