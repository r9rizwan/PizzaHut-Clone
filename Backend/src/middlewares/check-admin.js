const jwt = require("jsonwebtoken");
const { createResponseObject } = require("../utility");
const { JWT_TOKEN } = require("../config");
const Users = require("../models/Users");

const checkAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res
      .status(401)
      .json(createResponseObject(false, "Unauthorized", null));

  const token = authorization.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json(createResponseObject(false, "Unauthorized", null));

  try {
    const payload = jwt.verify(token, JWT_TOKEN);
    const isUserExist = await Users.findById(payload.id);
    if (!isUserExist || !isUserExist.active)
      return res.status(401).json(createResponseObject(false, "Unauthorized"));
    if (isUserExist.role !== "admin")
      return res
        .status(403)
        .json(createResponseObject(false, "Unable to request resources!"));

    req.user = { email: payload.email, id: payload.id, role: payload.role };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json(createResponseObject(false, "Unauthorized"));
    next(error);
  }
};

module.exports = { checkAdmin };
