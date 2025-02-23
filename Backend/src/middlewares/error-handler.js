const NODE_MODE = "dev";
const ErrorHandler = (err, _, res, __) => {
  res
    .status(envMode === "dev" ? err.status || 500 : 500)
    .send(
      NODE_MODE === "dev"
        ? { message: err.message, stack: err.stack }
        : { message: "Internal Server Error!.", error: {} }
    );
};

module.exports = { ErrorHandler };
