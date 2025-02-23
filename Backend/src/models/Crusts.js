const { Schema, model } = require("mongoose");

const crustsSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nutritionFacts: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: [
    {
      type: Schema.Types.ObjectId,
      ref: "sizes",
      required: [true, "Size ID is required."],
    },
  ],
  addonPrice: {
    type: Number,
    default: 0.00, // Can be null or a number
  },
});

const Crusts = model("crusts", crustsSchema);
module.exports = Crusts;

// References in mongodb
// References is basically a relation between two collections it can one to one, one to many, many to many just like sql.
// In mongoose references are created by the object id as reference key of both collections (_id automatically added to each document in mongodb collection).
// Reference can be to two way or one depends on the requirements.
// id should reference in the collection which have to pull the data from source collection.
