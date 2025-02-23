const Sizes = require("../models/Sizes");
const mongoose = require("mongoose");
const { createResponseObject } = require("../utility");

class SizesController {
  // Create size
  createSizes = async (req, res) => {
    const { name, description } = req.body;

    // Check if the name already exists
    const isNameExists = await Sizes.findOne({ name });
    if (isNameExists)
      return res
        .status(400)
        .json(createResponseObject(false, "Name is already taken!", null));

    // Create the size
    const createdSize = await Sizes.create({
      name,
      description,
    });

    // Error handling if creation fails
    if (!createdSize)
      return res
        .status(400)
        .json(createResponseObject(false, "Unable to create size!", null));

    // Return success response
    return res
      .status(201)
      .json(
        createResponseObject(true, "Size created successfully!", createdSize)
      );
  };

  // Get all sizes
  getSizes = async (req, res) => {
    const allSizes = await Sizes.find().sort({ name: 1 }); // Sorted alphabetically by name
    return res
      .status(200)
      .json(
        createResponseObject(true, "Sizes retrieved successfully!", allSizes)
      );
  };

  // Get a size by ID
  getSizesByID = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json(createResponseObject(false, "Invalid ID!", null));

    // Find size by ID
    const size = await Sizes.findById(id);
    if (!size)
      return res
        .status(404)
        .json(createResponseObject(false, "Size not found!", null));

    return res
      .status(200)
      .json(createResponseObject(true, "Size found successfully!", size));
  };

  // Update a size
  updateSize = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate the ID
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json(createResponseObject(false, "Invalid ID!", null));

    // Check if size exists
    const existingSize = await Sizes.findById(id);
    if (!existingSize)
      return res
        .status(404)
        .json(createResponseObject(false, "Size not found!", null));

    // Check if name is unique and different from the current name
    const isNameExists = await Sizes.findOne({ name });
    if (isNameExists && existingSize.name !== name)
      return res
        .status(400)
        .json(createResponseObject(false, "Name is already taken!", null));

    // Update the size
    const updatedSize = await Sizes.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    return res
      .status(200)
      .json(
        createResponseObject(true, "Size updated successfully!", updatedSize)
      );
  };

  // Delete a size
  deleteSizesApi = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json(createResponseObject(false, "Invalid ID!", null));

    // Delete the size
    const deletedSize = await Sizes.findByIdAndDelete(id);
    if (!deletedSize)
      return res
        .status(400)
        .json(createResponseObject(false, "Unable to delete size!", null));

    return res
      .status(204)
      .json(
        createResponseObject(true, "Size deleted successfully!", deletedSize)
      );
  };

  getSizesOptions = async (req, res) => {
    const sizes = await Sizes.find().lean();
    const options = sizes.map((size) => ({
      value: size._id,
      label: size.name,
    }));
    return res
      .status(200)
      .json(createResponseObject(true, "Options found", options));
  };
}

module.exports = SizesController;
