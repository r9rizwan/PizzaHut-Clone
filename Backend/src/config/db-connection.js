

const { default: mongoose } = require("mongoose");
const { DB_URL } = require(".");

const connectDb = async () => {
  try {
    await mongoose.connect(
      DB_URL
    );
    console.log("DB Connected!");
  } catch (error) {
    console.log("Error while connecting db: ", error);
  }
};

module.exports = { connectDb };
