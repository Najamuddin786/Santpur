const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = mongoose.connect("mongodb://localhost:27017/");

module.exports = connectDB;
