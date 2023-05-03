const mongoose = require("mongoose");
const User = require("../model/userModel");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter description of the product"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "price can't exceed more than 8 charcters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: Number,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "product category is required"],
  },
  stock: {
    type: Number,
    maxLength: [4, "stock can't exceed more than 4 digit"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
exports.Product = new mongoose.model("Product", productSchema);
