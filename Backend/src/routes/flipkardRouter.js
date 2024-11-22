const express = require("express");
const { scrapeFlipkartSinglePage } = require("../utility/scrapeUtility1.js");
const { getDynamicISTTime } = require('../utility/getDynamicISTTime.js');
const { checkTime } = require('../utility/checkTime.js');
const Product = require("../models/Products.js");

const flipkartRouter = express.Router();

flipkartRouter.post("/scrape", async (req, res) => {
    let {productURL}=req.body;
  if (!productURL) {
    return res.status(400).send("Product URL is required.");
  }

  try {
    // Check if product exists in the database based on the URL
    let timeProduct = await Product.findOne({ url: productURL });

    if (timeProduct) {
      console.log("Item found in MongoDB.");

      // Get expiration time for comparison
      let exTime = timeProduct.exTime;
      let base = checkTime(exTime);
      console.log(base)

      if (base) {
        console.log("Time Expired - Scraping again");
        // Continue with scraping if the expiration time has passed
      } else {
        console.log("Product already updated and valid.");
        return res.send("Product is already updated.");
      }
    } else {
      console.log("Item not found in MongoDB.");
    }

    // Perform scraping
    const scrapedProducts = await scrapeFlipkartSinglePage(productURL);

    if (scrapedProducts) {
      // Add time of scraping and expiration time (1 hour later)
      scrapedProducts.createTime = getDynamicISTTime();
      scrapedProducts.url = productURL;
      scrapedProducts.exTime = getDynamicISTTime(60); // Expires after 60 minutes

      // Check if a product with the same title exists and update or create
      const updatedProduct = await Product.findOneAndUpdate(
        { title: scrapedProducts.title }, // Query condition (find by title)
        { $set: scrapedProducts }, // Update the fields with new values
        { new: true, upsert: true } // Options: create a new document if not found
      );

      if (updatedProduct) {
        console.log("Product updated or added:", updatedProduct);
        res.send(updatedProduct);
      } else {
        console.error("Error updating or adding product.");
        res.status(500).send("Error updating or adding product.");
      }
    } else {
      res.send("No product data found during scraping.");
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("An error occurred.");
  }
});

module.exports = flipkartRouter;
