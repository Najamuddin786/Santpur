const express = require("express");
const Product = require("../models/Products.js");

const itemRouter = express.Router();

itemRouter.get("/item", async (req, res) => {
    try {
        let products = await Product.find(); // Use a clear variable name
        let final=products.map((e,i)=>{
           let  {_id,title,price,priceOriginal,rating,images,ratingAll}=e
            return {id:_id,title,price,priceOriginal,rating,img:images[0],ratingAll}
        })
        return res.status(200).send(final); // Send the data with proper status code
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send({ error: "Internal Server Error" }); // Send error response
    }
});



module.exports = itemRouter;
