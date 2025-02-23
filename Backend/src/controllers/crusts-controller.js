const Crusts = require("../models/Crusts");
const Sizes = require("../models/Sizes");
const mongoose = require("mongoose");
const { createResponseObject, checkObjectId } = require("../utility");

class CrustsController {
  createCrust = async (req, res) => {
    try {
      let {
        name,
        nutritionFacts,
        description,
        sizes = [],
        addonPrice,
      } = req.body; // Default sizes to an empty array
      const image = req.file?.filename ?? null; // Adjust to handle image upload correctly
      sizes = sizes === "" ? [] : JSON.parse(sizes);

      // Check if name exists
      const isNameExists = await Crusts.findOne({ name });
      if (isNameExists)
        return res
          .status(400)
          .json(createResponseObject(false, "Name already exists!", null));

      // Check if the sizes are valid
      const sizesIds = sizes.map((size) => size.value);
      const foundSizes = await Sizes.find({ _id: { $in: sizesIds } });
      if (foundSizes.length !== sizesIds.length) {
        return res
          .status(400)
          .json(createResponseObject(false, "Invalid sizes provided!", null));
      }

      // Create new crust
      const createdCrust = await Crusts.create({
        image: image,
        name,
        nutritionFacts,
        description,
        sizes: sizesIds,
        addonPrice: addonPrice ?? null,
      });

      if (!createdCrust)
        return res
          .status(400)
          .json(createResponseObject(false, "Unable to create crust!", null));

      // Return successful response
      return res
        .status(201)
        .json(
          createResponseObject(
            true,
            "Crust created successfully!",
            createdCrust
          )
        );
    } catch (error) {
      return res
        .status(500)
        .json(createResponseObject(false, "Internal Server Error!", error));
    }
  };

  getCrusts = async (req, res) => {
    const { sizeId } = req.query
    try {
      const filters = {};
      if (sizeId && checkObjectId(sizeId)) {
        filters.sizes = { $in: [sizeId] }
      }
      const allCrusts = await Crusts.find(filters).populate("sizes");
      return res
        .status(200)
        .json(
          createResponseObject(true, "Crusts found successfully!", allCrusts)
        );
    } catch (error) {
      return res
        .status(500)
        .json(createResponseObject(false, "Internal Server Error!", error));
    }
  };

  getCrustById = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from request parameters

      // Validate ID
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json(createResponseObject(false, "Invalid ID!", null));
      }

      try {
        // Find the crust by ID
        const crust = await Crusts.findById(id).populate("sizes").lean();
        if (!crust) {
          return res
            .status(404)
            .json(createResponseObject(false, "Crust not found!", null));
        }

        crust.sizes = crust.sizes.map((size) => ({
          value: size._id,
          label: size.name,
        }));

        // Return the found crust
        return res
          .status(200)
          .json(createResponseObject(true, "Crust found successfully!", crust));
      } catch (error) {
        return res
          .status(500)
          .json(
            createResponseObject(
              false,
              "An error occurred while fetching the crust.",
              error.message
            )
          );
      }
    } catch (error) {
      return res
        .status(500)
        .json(createResponseObject(false, "Internal Server Error!", error));
    }
  };

  updateCrust = async (req, res) => {
    try {
      let { name, nutritionFacts, description, sizes, addonPrice } = req.body;

      sizes = sizes === "" ? [] : JSON.parse(sizes);

      const { id } = req.params;
      const image = req.file ? req.file.filename : null;

      // Validate id
      if (!id || !mongoose.Types.ObjectId.isValid(id))
        return res
          .status(400)
          .json(createResponseObject(false, "Please send a valid id!", null));

      // Check if crust exists
      const isFound = await Crusts.findById(id);
      if (!isFound)
        return res
          .status(404)
          .json(createResponseObject(false, "Crust not found!", null));

      // Check if name is unique
      const isNameExists = await Crusts.findOne({ name });
      if (isNameExists && isFound.name !== name)
        return res
          .status(400)
          .json(createResponseObject(false, "Name already exists!", null));

      console.log(sizes);

      // Validate sizes
      const sizesIds = sizes?.map((size) => size.value) ?? [];

      const foundSizes = await Sizes.find({ _id: { $in: sizesIds } });
      if (foundSizes.length !== sizesIds.length)
        return res
          .status(400)
          .json(createResponseObject(false, "Invalid sizes provided!", null));

      const valuesToUpdate = {
        name,
        nutritionFacts,
        description,
        sizes: sizesIds,
        addonPrice: addonPrice ?? null,
      };

      if (image) valuesToUpdate.image = image;

      const updatedCrust = await Crusts.findByIdAndUpdate(
        id,

        valuesToUpdate,

        { new: true } // Return the updated document
      );

      return res
        .status(200)
        .json(
          createResponseObject(
            true,
            "Crust updated successfully!",
            updatedCrust
          )
        );
    } catch (error) {
      return res
        .status(500)
        .json(createResponseObject(false, "Internal Server Error!", error));
    }
  };

  deleteCrust = async (req, res) => {
    try {
      const { id } = req.params;

      // Validate id
      if (!id || !mongoose.Types.ObjectId.isValid(id))
        return res
          .status(400)
          .json(createResponseObject(false, "Please send a valid id!", null));

      // Delete crust
      const deletedCrust = await Crusts.findByIdAndDelete(id);
      if (!deletedCrust)
        return res
          .status(400)
          .json(createResponseObject(false, "Unable to delete crust!", null));

      return res
        .status(204)
        .json(createResponseObject(true, "Crust deleted successfully!", null));
    } catch (error) {
      return res
        .status(500)
        .json(createResponseObject(false, "Internal Server Error", error));
    }
  };
}

module.exports = CrustsController;
