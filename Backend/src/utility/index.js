const { Types } = require("mongoose");

const createResponseObject = (status, message, data) => ({
  status: status,
  message: message,
  data: data,
});

const checkObjectId = (id) => Types.ObjectId.isValid(String(id));

// Global Try Catch handler
const AsyncTryCatch = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch((err) => next(err));
};

module.exports = { AsyncTryCatch, createResponseObject, checkObjectId };
