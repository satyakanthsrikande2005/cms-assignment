const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    throw new AppError(
      "Validation failed",
      StatusCodes.BAD_REQUEST,
      formattedErrors
    );
  }

  next();
};

module.exports = validate;
