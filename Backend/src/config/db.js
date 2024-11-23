const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// Connect to MongoDB
const connectDB = mongoose.connect(process.env.MONGO_URI);

module.exports = connectDB;
