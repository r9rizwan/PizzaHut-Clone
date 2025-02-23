// Entry point for an Express.js app/server
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { connectDb } = require("./config/db-connection");
const router = require("./routes/index");
const path = require("path");
const { ErrorHandler } = require("./middlewares");
const userSeeds = require("./seeds/userSeeds");
const seedProducts = require("./seeds/productSeeds");
const seedCrusts = require("./seeds/seedCrusts"); // Add this import
const request = require("request");

const app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const imageMap = {
//   "margherita.jpg": "https://i.imgur.com/UX4JyMA.jpeg",
//   "pepperoni-pizza.jpg": "https://i.imgur.com/Km6IOtB.jpeg",
//   "veggie-pizza.jpg": "https://i.imgur.com/0ky1jFL.jpeg",
//   "bbq-chicken-pizza.jpg": "https://i.imgur.com/R0XBphz.jpeg",
//   "hawaiian-pizza.jpg": "https://i.imgur.com/HjN41XI.jpeg",
//   // For Crusts
//   "hand-crafted.jpg": "https://i.imgur.com/QVttSzv.jpeg",
//   "handcrafted-garlic.jpg": "https://i.imgur.com/QVttSzv.jpeg",
//   "pan-crust.jpg": "https://i.imgur.com/NzTi0dI.jpeg",
//   "stuffed-crust.jpg": "https://i.imgur.com/oAsPSSv.jpeg",
//   "cheesy-bites.jpg": "https://i.imgur.com/dRzxy16.jpeg",
// };

// app.get("/uploads/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const remoteUrl = imageMap[filename];
//   if (remoteUrl) {
//     request(remoteUrl).pipe(res);
//   } else {
//     res.status(404).send("Image not found");
//   }
// });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api", router);

app.use(ErrorHandler);

(async () => {
  try {
    await connectDb();
    console.log("Database connected!");
    await userSeeds();
    console.log("Users seeded!");
    await seedProducts();
    console.log("Products and sizes seeded!");
    await seedCrusts();
    console.log("Crusts seeded!");
    console.log("Database connected and seeded successfully!");
  } catch (error) {
    console.error("Failed to connect to database or seed data:", error);
  }
})();

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});