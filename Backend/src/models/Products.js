const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  priceOriginal: {
    type: String,
    required: true,
  },
  buy: {
    type: String, // For the "ADD TO CART" action or similar
    required: true,
  },
  rating: {
    type: String, // Rating value (e.g., "4.3")
    required: true,
  },
  ratingAll: {
    type: String, // Total ratings and reviews (e.g., "13,003 Ratings & 813 Reviews")
    required: true,
  },
  warranty: {
    type: String, // Warranty description
    required: true,
  },
  highLight: {
    type: String, // Highlights of the product (e.g., features)
    required: true,
  },
  box: {
    type: String, // Items in the box (e.g., "Handset, 20W Charger, USB Cable")
    required: true,
  },
  imageCompany: {
    type: String, // URL of the company image
    required: true,
  },
  images: [{
    type: String, // Array of image URLs
    required: true,
  }],
  createTime: {
    type: String, // Custom creation time
    required: true,
  },
  exTime: {
    type: String, // Custom expiration time
    required: true,
  },
});

// Create a model
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
