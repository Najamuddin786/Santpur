const express = require("express");
const {getDynamicISTTime}=require('../utility/getDynamicISTTime.js')

const timeRouter = express.Router();

// Route to get the current time in IST
timeRouter.get("/current-time", (req, res) => {
  try {
    // Get the current time in IST
    console.log("Current IST Time:", getDynamicISTTime()); // No argument, returns current time
console.log("IST Time after 10 minutes:", getDynamicISTTime(10)); // Adds 10 minutes
console.log("IST Time after 60 minutes:", getDynamicISTTime(60)); // Adds 60 minutes

    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "An error occurred while fetching the current time",
      error: error.message,
    });
  }
});

module.exports = timeRouter;
