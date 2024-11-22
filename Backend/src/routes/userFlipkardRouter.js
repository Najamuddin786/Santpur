const express = require("express");
const { scrapeFlipkartSinglePage } = require("../utility/scrapeUtility1.js");
const { getDynamicISTTime } = require('../utility/getDynamicISTTime.js');
const { checkTime } = require('../utility/checkTime.js');
const Product = require("../models/Products.js");
const mongoose = require("mongoose");

const useFlipkartRouter = express.Router();

useFlipkartRouter.post("/userFlipkardRouter", async (req, res) => {
    let { id } = req.body; // Product id from request body
    if (!id) {
        return res.status(400).send("Product id is required.");
    }

    try {
        // Use 'new' to create an ObjectId from the id string
        let productId = new mongoose.Types.ObjectId(id);  // Use 'new' here

        // Check if product exists in the database based on the MongoDB _id
        let timeProduct = await Product.findOne({ _id: productId });

        if (timeProduct) {
            console.log("Item found in MongoDB.");

            // Get expiration time for comparison
            let exTime = timeProduct.exTime;
            let base = checkTime(exTime);
            console.log(base);

            if (base) {
                console.log("Time Expired - Scraping again");
                // Continue with scraping if the expiration time has passed
            } else {
                console.log("Product already updated and valid.");
                return res.send("Product is already updated.");
            }
        } else {
            console.log("Item not found in MongoDB.");
            return res.send("Item not found in MongoDB");
        }

        // Perform scraping
        const scrapedProducts = await scrapeFlipkartSinglePage(timeProduct.url);

        if (scrapedProducts) {
            // Add time of scraping and expiration time (1 hour later)
            scrapedProducts.createTime = getDynamicISTTime();
            scrapedProducts.url = timeProduct.url;
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

module.exports = useFlipkartRouter;
