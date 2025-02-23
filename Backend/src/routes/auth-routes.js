const { Router } = require("express");
const AuthenticationController = require("../controllers/auth-controller");
const { AsyncTryCatch } = require("../utility");

const AuthRouter = Router();
const { login, loginWithAdmin, register, getUser } =
  new AuthenticationController();

AuthRouter.post("/login", AsyncTryCatch(login));
AuthRouter.post("/login/admin", AsyncTryCatch(loginWithAdmin));
AuthRouter.post("/register", AsyncTryCatch(register));

module.exports = AuthRouter;
