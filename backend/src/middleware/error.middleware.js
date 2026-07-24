const { StatusCodes } = require("http-status-codes");
const { sendFailure } = require("../utils/apiResponse.util");
const AppError = require("../utils/AppError.util");

const errorHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    return sendFailure(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return sendFailure(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Validation failed",
      errors,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return sendFailure(res, {
      statusCode: StatusCodes.CONFLICT,
      message: `${field} already exists`,
      errors: [{ field, message: "Duplicate value" }],
    });
  }

  if (err.name === "MulterError") {
    return sendFailure(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      message: err.message,
    });
  }

  console.error("[Error]", err);

  return sendFailure(res, {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

function multerError(err) {
  return err.name === "MulterError" ? err : null;
}

module.exports = errorHandler;
