const { Router } = require("express");
const multer = require("multer");
const ProductsController = require("../controllers/products-controller");
const {
  getMulterDiskStorageUploads,
} = require("../middlewares/multer-middleware");
const { createResponseObject } = require("../utility");

const productsRouter = Router();
const productsController = new ProductsController(); // Initialize the controller

const multerUpload = getMulterDiskStorageUploads();

// Route to create a product (with file upload)
productsRouter.post(
  "/products/create",
  multerUpload.single("image"),
  productsController.createProduct
);

// Route to get all products
productsRouter.get(
  "/products",
  productsController.getProduct
);
productsRouter.get("/products/:id", productsController.getProductById);

// Route to update a specific product by ID (with file upload)
productsRouter.put(
  "/products/update/:id",
  multerUpload.single("image"),
  productsController.updateProduct
);

// Route to delete a specific product by ID
productsRouter.delete("/products/delete/:id", productsController.deleteProduct);

module.exports = productsRouter;
