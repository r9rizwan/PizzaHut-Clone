const mongoose = require("mongoose");
const Products = require("../models/Products");
const { createResponseObject } = require("../utility");
const Sizes = require("../models/Sizes");

class ProductsController {
  constructor() {
    this.createProduct = this.createProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async createProduct(req, res) {
    let { title, description, sizesAndPrices } = req.body;
    const image = req.file;

    // Parse sizesAndPrices if it's in string format
    sizesAndPrices = JSON.parse(sizesAndPrices);

    // Check if title should be unique.
    const isTitleExists = await Products.findOne({ title });
    if (isTitleExists)
      return res
        .status(400)
        .json(createResponseObject(false, "Title is already taken!", null));

    // Check if the sizes are valid
    const sizesIds = [];
    const sizesAndPricesToSave = sizesAndPrices.map((item) => {
      sizesIds.push(item.size.value);
      return {
        price: item.price,
        sizeId: item.size.value,
      };
    }); // Assuming sizes is an array of objects with sizeId
    const foundSizes = await Sizes.find({ _id: { $in: sizesIds } });
    if (foundSizes.length !== sizesIds.length) {
      return res
        .status(400)
        .json(createResponseObject(false, "Invalid sizes provided!", null));
    }

    // Create product
    const createdProduct = await Products.create({
      image: image.filename,
      title,
      description,
      sizes: sizesAndPricesToSave, // Map to include price
    });

    // Handle error case
    if (!createdProduct)
      return res
        .status(400)
        .json(createResponseObject(false, "Unable to create product!", null));

    // Return successful response
    return res
      .status(201)
      .json(
        createResponseObject(
          true,
          "Product created successfully!",
          createdProduct
        )
      );
  }

  async getProduct(req, res) {
    let { sizes, all = false, excludes = null } = req.query;

    const productsFilter = {};

    if (sizes && !all && !excludes) {
      sizes = sizes.includes(",") ? sizes.split(",") : sizes;
      const filters = {};
      if (typeof sizes === "string") filters.name = new RegExp(sizes, "i");
      else if (Array.isArray(sizes)) {
        filters.$or = sizes.map((size) => ({
          name: new RegExp(size, "i"),
        }));
      }
      const foundSizes = await Sizes.find(filters).lean();
      productsFilter.$or = foundSizes.map((size) => ({
        "sizes.sizeId": size._id,
      }));
    }

    if (excludes && !all && !sizes) {
      excludes = excludes.includes(",") ? excludes.split(",") : excludes;
      const filters = {};
      if (typeof excludes === "string")
        filters.name = {
          $not: new RegExp(excludes, "i"),
        };
      else if (Array.isArray(sizes)) {
        filters.$and = excludes.map((exclude) => ({
          name: { $ne: new RegExp(exclude, "i") },
        }));
      }
      const foundSizes = await Sizes.find(filters).lean();
      productsFilter.$or = foundSizes.map((size) => ({
        "sizes.sizeId": size._id,
      }));
    }

    const allProducts = await Products.find(productsFilter).populate(
      "sizes.sizeId"
    ); // Populate sizeId in sizes
    return res
      .status(200)
      .json(
        createResponseObject(true, "Products found successfully!", allProducts)
      );
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const { sizes, excludes, fromDetailsPage } = req.query;
    const product = await Products.findById(id).populate("sizes.sizeId");

    if (fromDetailsPage && sizes && !excludes) {
      if (typeof sizes == "string") {
        product.sizes = product.sizes.filter((item) =>
          new RegExp(item.sizeId.name, "i").test(sizes)
        );
      }
      if (Array.isArray(sizes)) {
        const sizesArr = sizes.split(",");
        product.sizes = product.sizes.filter((item) => {
          sizesArr.some((size) => new RegExp(size, "i").test(item.sizeId.size));
        });
      }
    }

    // ascending order is a.price - b.price
    product.sizes = product.sizes.sort((a, b) => a.price - b.price);
    // descending would be b.price - a.price
    // if (fromDetailsPage && excludes && !sizes) {
    // }

    return res
      .status(200)
      .json(createResponseObject(true, "Product found successfully!", product));
  }

  async updateProduct(req, res) {
    const { id } = req.params; // Get id from request parameters
    let { title, description, sizesAndPrices } = req.body;
    const image = req.file ? req.file.filename : null; // Assuming the filename is stored

    // Check whether id is valid or not
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json(createResponseObject(false, "Please send a valid id!", null));

    // Check if product exists for this id
    const isFound = await Products.findById(id);
    if (!isFound)
      return res
        .status(404)
        .json(
          createResponseObject(
            false,
            "Unable to find product for this id!",
            null
          )
        );

    // Check if title is unique and not equal to the previous title
    const isTitleExists = await Products.findOne({ title });
    if (isTitleExists && isFound.title !== title)
      return res
        .status(400)
        .json(createResponseObject(false, "Title is already taken!", null));

    // Parse sizesAndPrices if it's in string format
    sizesAndPrices = JSON.parse(sizesAndPrices);

    const sizesIds = [];
    const sizesAndPricesToSave = sizesAndPrices.map((item) => {
      sizesIds.push(item.size.value);
      return {
        price: item.price,
        sizeId: item.size.value,
      };
    });

    const foundSizes = await Sizes.find({ _id: { $in: sizesIds } });
    if (foundSizes.length !== sizesIds.length) {
      return res
        .status(400)
        .json(createResponseObject(false, "Invalid sizes provided!", null));
    }

    const valuesToUpdate = {
      title,
      description,
      sizes: sizesAndPricesToSave,
    };

    if (image) valuesToUpdate.image = image;

    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      valuesToUpdate,
      { new: true } // Return the updated document
    );

    return res
      .status(200)
      .json(
        createResponseObject(
          true,
          "Product updated successfully!",
          updatedProduct
        )
      );
  }

  async deleteProduct(req, res) {
    const { id } = req.params;

    // Check whether id is valid or not
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json(createResponseObject(false, "Please send a valid id!", null));

    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct)
      return res
        .status(400)
        .json(createResponseObject(false, "Unable to delete product!", null));

    return res
      .status(204)
      .json(
        createResponseObject(
          true,
          "Product deleted successfully!",
          deletedProduct
        )
      );
  }
}

module.exports = ProductsController;
