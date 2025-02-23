const { Router } = require("express");
const SizesController = require("../controllers/sizes-controller");
const { checkAdmin } = require("../middlewares");

const {
  getSizes,
  createSizes,
  updateSize,
  deleteSizesApi,
  getSizesByID,
  getSizesOptions,
} = new SizesController();

const SizesRouter = Router();

SizesRouter.post("/sizes/create", checkAdmin, createSizes);
SizesRouter.get("/sizes/get", checkAdmin, getSizes);
SizesRouter.get("/sizes/get/options", getSizesOptions);
SizesRouter.get("/sizes/:id", getSizesByID);
SizesRouter.put("/sizes/update/:id", checkAdmin, updateSize);
SizesRouter.delete("/sizes/delete/:id", checkAdmin, deleteSizesApi);

module.exports = SizesRouter;
