const createError = require("http-errors");

const errorHandler = (app) => {
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    return res.status(err.status).json({ message: err.message });
  });
};

module.exports = errorHandler;
