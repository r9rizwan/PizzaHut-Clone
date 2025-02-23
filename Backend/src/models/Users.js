const { model, Schema } = require("mongoose");

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  address: {
    line1: {
      type: String,
      default: null,
    },
    line2: {
      type: String,
      default: null,
    },
    postCode: {
      type: String,
      default: null,
    },
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  // user, admin
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user"],
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Users = model("users", usersSchema, "users");

module.exports = Users;
// export default Users;
