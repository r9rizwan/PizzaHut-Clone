const { Router } = require("express");
const { AsyncTryCatch } = require("../utility");
const { UsersController } = require("../controllers/users-controller");
const { checkAuth } = require("../middlewares");

const UsersRouter = Router();
const { getCurrentUser } = new UsersController();

UsersRouter.get(
  "/users/get-current",
  checkAuth,
  AsyncTryCatch(getCurrentUser)
);

module.exports = UsersRouter;
