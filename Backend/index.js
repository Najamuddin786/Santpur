const express = require('express');
const cron = require('node-cron');
const flipkartRouter = require('./src/routes/flipkardRouter.js'); // Import the router
const timeRouter = require('./src/routes/timeRouter.js'); // Import the router
const itemRouter = require('./src/routes/itemRouter.js'); // Import the router
const connectDB = require('./src/config/db.js')
const useFlipkartRouter=require('./src/routes/userFlipkardRouter.js')
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());

// Use the flipkartRouter for Flipkart-related routes
app.use('/api', flipkartRouter);
app.use('/api', timeRouter);
app.use('/api', useFlipkartRouter);
app.use('/api', itemRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, async() => {
    try {
      let res=await connectDB
      console.log(`MongoDB and Server are running on port ${PORT}`);
    } catch (error) {
      console.log(`MongoDB is Not connected ${error}`);
      
    }
    console.log(`Server is running on port ${PORT}`);
});
