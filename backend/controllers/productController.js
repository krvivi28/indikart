const chalk = require("chalk");
const { Product } = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const productCount = await Product.countDocuments();
  const resultPerPage = 5;
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({ success: true, productCount, products });
});
// create a product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, msg: product });
});
// update a product
exports.updateProduct = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({ _id });
    if (!product) {
      return next(new ErrorHandler("product doesn't exist", 404));
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ status: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
};
// delete a product
exports.deleteProduct = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({ _id });
    if (!product) {
      return next(new ErrorHandler("product doesn't exist", 404));
    } else {
      const deletedProduct = await Product.deleteOne({ _id });
      res.status(201).json({ status: true, product: deletedProduct });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
};
// get a single product
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const _id = req.params.id;
  const product = await Product.findOne({ _id });
  if (!product) {
    return next(new ErrorHandler("product doesn't exist", 404));
  } else {
    res.status(201).json({ status: true, product: product });
  }
});
