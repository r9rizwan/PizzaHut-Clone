const { Router } = require("express");
const { dealsData, bannerData } = require("../controllers/index");
const { meltsData } = require("../controllers/melts-controller");
const { sidesData } = require("../controllers/sides-controller");
const { dessertsData } = require("../controllers/desserts-controller");
const { drinksData } = require("../controllers/drinks-controller");
const { dipsData } = require("../controllers/dips-controller");

const CrustsRouter = require("./crusts-routes");
const SizesRouter = require("./sizes-routes");
const ProductsRouter = require("./products-routes");
const AuthRouter = require("./auth-routes");
const UsersRouter = require("./users-routes");

const router = Router();

router.get("/deals", (req, res) => {
  res.json(dealsData);
});
// Route to get a specific deal by ID
router.get("/deals/:id", (req, res) => {
  const dealId = req.params.id;
  const deal = dealsData.find((d) => d.id === dealId);

  if (deal) {
    res.json(deal);
  } else {
    res.status(404).json({ message: "Deal not found" });
  }
});

router.get("/melts", (req, res) => {
  res.json(meltsData);
});

router.get("/sides", (req, res) => {
  res.json(sidesData);
});

router.get("/desserts", (req, res) => {
  res.json(dessertsData);
});

router.get("/drinks", (req, res) => {
  res.json(drinksData);
});

router.get("/dips", (req, res) => {
  res.json(dipsData);
});

router.get("/banner", (req, res) => {
  res.json(bannerData);
});

router.use("/auth", AuthRouter);
router.use("/admin", [CrustsRouter, SizesRouter, ProductsRouter, UsersRouter]);

module.exports = router;
// export default router
