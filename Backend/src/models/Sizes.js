const { Schema, model } = require("mongoose");

const sizesSchema = new Schema({
  name: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,
  },
  // price: {
  //   type: Number,
  //   required: true,
  // },
});

const Sizes = model("sizes", sizesSchema);

module.exports = Sizes;
// export default Sizes;
