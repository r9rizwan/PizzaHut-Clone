const { Schema, model } = require("mongoose");

// Define the Products schema
const productsSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
      trim: true, // Automatically trim whitespace from the title
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    sizes: [
      {
        price: {
          type: Number,
          required: [true, "Price is required."],
        },
        sizeId: {
          type: Schema.Types.ObjectId,
          ref: "sizes", // Referencing the size model
          required: [true, "Size ID is required."],
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Products model
const Products = model("products", productsSchema); // Changed to singular for model name

module.exports = Products;
