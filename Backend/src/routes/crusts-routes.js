const { Router } = require("express");
const CrustsController = require("../controllers/crusts-controller");
const {
  getMulterDiskStorageUploads,
} = require("../middlewares/multer-middleware");

const { createCrust, getCrusts, getCrustById, updateCrust, deleteCrust } =
  new CrustsController();
const CrustsRouter = Router();
const multerUpload = getMulterDiskStorageUploads();

CrustsRouter.post("/crusts/create", multerUpload.single("image"), createCrust);
CrustsRouter.get("/crusts/get", getCrusts);
// Get Crust by ID
CrustsRouter.get("/crusts/:id", getCrustById);
CrustsRouter.put("/crusts/update/:id", multerUpload.single("image"), updateCrust);
CrustsRouter.delete("/crusts/delete/:id", deleteCrust);

module.exports = CrustsRouter;
